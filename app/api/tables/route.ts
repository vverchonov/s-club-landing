import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TableReservation from '@/lib/models/TableReservation';

// Club operating hours (20:30 - 02:00) - used in generateTimeOptions
// const CLUB_OPEN_HOUR = 20;
// const CLUB_OPEN_MINUTE = 30;
// const CLUB_CLOSE_HOUR = 2;
// const CLUB_CLOSE_MINUTE = 0;

// Generate valid time options for club hours
const generateTimeOptions = () => {
    const options = [];

    // From 20:30 to 23:59
    for (let hour = 20; hour <= 23; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            if (hour === 20 && minute < 30) continue; // Skip before 20:30
            if (hour === 23 && minute > 59) continue; // Skip after 23:59

            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            options.push(timeString);
        }
    }

    // From 00:00 to 02:00
    for (let hour = 0; hour <= 2; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            if (hour === 2 && minute > 0) continue; // Skip after 02:00

            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            options.push(timeString);
        }
    }

    return options;
};

const validTimeOptions = generateTimeOptions();

// Helper function to check if two time ranges overlap
const isTimeOverlap = (start1: string, end1: string, start2: string, end2: string) => {
    const [start1Hour, start1Min] = start1.split(':').map(Number);
    const [end1Hour, end1Min] = end1.split(':').map(Number);
    const [start2Hour, start2Min] = start2.split(':').map(Number);
    const [end2Hour, end2Min] = end2.split(':').map(Number);

    // Convert to minutes for easier comparison
    const start1Minutes = start1Hour * 60 + start1Min;
    const end1Minutes = end1Hour * 60 + end1Min;
    const start2Minutes = start2Hour * 60 + start2Min;
    const end2Minutes = end2Hour * 60 + end2Min;

    // Handle midnight crossover
    const adjustedEnd1Minutes = end1Minutes < start1Minutes ? end1Minutes + 24 * 60 : end1Minutes;
    const adjustedEnd2Minutes = end2Minutes < start2Minutes ? end2Minutes + 24 * 60 : end2Minutes;
    const adjustedStart2Minutes = start2Minutes < start1Minutes ? start2Minutes + 24 * 60 : start2Minutes;

    return start1Minutes < adjustedEnd2Minutes && adjustedStart2Minutes < adjustedEnd1Minutes;
};

// Helper function to generate description
const generateDescription = (name: string, date: string, startTime: string, endTime: string) => {
    return `Бронювання столика для ${name} на ${date} з ${startTime} до ${endTime}`;
};

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');

        if (!date) {
            return NextResponse.json(
                { error: 'Date parameter is required' },
                { status: 400 }
            );
        }

        // Fetch confirmed reservations or reservations created within last 30 minutes for the given date
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

        const reservations = await TableReservation.find({
            date,
            $or: [
                { isConfirmed: true },
                {
                    isConfirmed: false,
                    createdAt: { $gte: thirtyMinutesAgo }
                }
            ]
        }).sort({ startTime: 1 });

        // Process availability for each table (1-12)
        const tableAvailability: { [key: number]: { available: boolean; availableHours: string[]; reservations: Array<{ id: string; startTime: string; endTime: string; isConfirmed: boolean }> } } = {};

        for (let tableNumber = 1; tableNumber <= 12; tableNumber++) {
            const tableReservations = reservations.filter(res => res.tableNumber === tableNumber);

            if (tableReservations.length === 0) {
                // No reservations for this table - all hours available
                tableAvailability[tableNumber] = {
                    available: true,
                    availableHours: validTimeOptions,
                    reservations: []
                };
            } else {
                // Process existing reservations to find available hours
                const unavailableHours = new Set();

                tableReservations.forEach(reservation => {
                    // Mark all hours in the reservation period as unavailable
                    const startIndex = validTimeOptions.indexOf(reservation.startTime);
                    const endIndex = validTimeOptions.indexOf(reservation.endTime);

                    if (startIndex !== -1 && endIndex !== -1) {
                        for (let i = startIndex; i <= endIndex; i++) {
                            if (i < validTimeOptions.length) {
                                unavailableHours.add(validTimeOptions[i]);
                            }
                        }
                    }
                });

                const availableHours = validTimeOptions.filter(time => !unavailableHours.has(time));

                tableAvailability[tableNumber] = {
                    available: availableHours.length > 0,
                    availableHours,
                    reservations: tableReservations.map(res => ({
                        id: res._id,
                        startTime: res.startTime,
                        endTime: res.endTime,
                        isConfirmed: res.isConfirmed
                    }))
                };
            }
        }

        return NextResponse.json({
            date,
            tableAvailability,
            validTimeOptions,
            status: 'success'
        });

    } catch (error) {
        console.error('Tables GET API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { tableNumber, name, phone, date, startTime, endTime, description } = body;

        // Validate required fields
        if (!tableNumber || !name || !phone || !date || !startTime || !endTime) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate table number
        if (tableNumber < 1 || tableNumber > 12) {
            return NextResponse.json(
                { error: 'Invalid table number' },
                { status: 400 }
            );
        }

        // Check for overlapping confirmed reservations or reservations created within last 30 minutes
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

        const existingReservations = await TableReservation.find({
            tableNumber,
            date,
            $or: [
                { isConfirmed: true },
                {
                    isConfirmed: false,
                    createdAt: { $gte: thirtyMinutesAgo }
                }
            ]
        });

        const hasOverlap = existingReservations.some(reservation =>
            isTimeOverlap(startTime, endTime, reservation.startTime, reservation.endTime)
        );

        if (hasOverlap) {
            return NextResponse.json(
                { error: 'Table is not available for the selected time period' },
                { status: 409 }
            );
        }

        // Create new reservation
        const reservation = new TableReservation({
            tableNumber,
            name,
            phone,
            date,
            startTime,
            endTime,
            description: description || generateDescription(name, date, startTime, endTime),
            isConfirmed: false
        });

        await reservation.save();

        return NextResponse.json({
            message: 'Table reservation created successfully',
            reservation: {
                id: reservation._id,
                tableNumber: reservation.tableNumber,
                name: reservation.name,
                date: reservation.date,
                startTime: reservation.startTime,
                endTime: reservation.endTime,
                description: reservation.description,
                isConfirmed: reservation.isConfirmed
            },
            status: 'success'
        });

    } catch (error) {
        console.error('Tables POST API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 