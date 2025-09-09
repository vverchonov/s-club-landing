'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from '../../lib/context/TranslationContext';

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

// Add a helper function to compare times considering day transition
const compareTime = (time1: string, time2: string): number => {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    // Convert to minutes from club opening (20:30)
    // Times from 20:30-23:59 are same day, 00:00-02:00 are next day
    const getMinutesFromClubOpen = (hours: number, minutes: number) => {
        if (hours >= 20 || hours <= 2) {
            // Same day: 20:30-23:59, Next day: 00:00-02:00
            if (hours >= 20) {
                return (hours - 20) * 60 + (minutes - 30);
            } else {
                // Next day (00:00-02:00), add 24 hours minus club opening time
                return (24 - 20) * 60 - 30 + hours * 60 + minutes;
            }
        }
        return -1; // Invalid time for club hours
    };

    const minutes1FromOpen = getMinutesFromClubOpen(hours1, minutes1);
    const minutes2FromOpen = getMinutesFromClubOpen(hours2, minutes2);

    return minutes1FromOpen - minutes2FromOpen;
};

// Helper function to check if time1 is before time2
const isTimeBefore = (time1: string, time2: string): boolean => {
    return compareTime(time1, time2) < 0;
};

// Helper function to check if time1 is after time2
const isTimeAfter = (time1: string, time2: string): boolean => {
    return compareTime(time1, time2) > 0;
};

// Update the getAvailableEndTimeOptions function




export default function BookPage() {
    const { t, isInitialized } = useTranslation();
    const [hasMounted, setHasMounted] = useState(false);
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '20:30',
        endTime: '22:30'
    });
    const [tableAvailability, setTableAvailability] = useState<{ [key: number]: { available: boolean; availableHours: string[]; reservations: Array<{ id: string; startTime: string; endTime: string; isConfirmed: boolean }> } } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [reservationData, setReservationData] = useState<{ tableNumber: number; name: string; phone: string; date: string; startTime: string; endTime: string; reservationId: string; createdAt: string } | null>(null);
    // Add a new state for form submission loading
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Function to validate date format
    const isValidDate = useCallback((dateString: string): boolean => {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date.getTime());
    }, []);

    // Function to fetch table availability
    const fetchTableAvailability = useCallback(async (date: string) => {
        if (!isValidDate(date)) {
            setError('Invalid date format');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/tables?date=${date}`);
            const data = await response.json();

            if (response.ok) {
                setTableAvailability(data.tableAvailability);
            } else {
                setError(data.error || 'Failed to fetch table availability');
            }
        } catch (err) {
            setError('Network error while fetching table availability');
            console.error('Error fetching table availability:', err);
        } finally {
            setLoading(false);
        }
    }, [isValidDate]);

    // Fetch table availability on initial load
    useEffect(() => {
        fetchTableAvailability(formData.date);
    }, [formData.date, fetchTableAvailability]);

    // Update the getAvailableTimeOptions function to handle start/end time filtering
    const getAvailableStartTimeOptions = () => {
        if (!selectedTable || !tableAvailability?.[selectedTable]) {
            return validTimeOptions;
        }
        return tableAvailability[selectedTable].availableHours || validTimeOptions;
    };

    // Function to get available end time options based on selected start time
    const getAvailableEndTimeOptions = (startTime: string) => {
        if (!selectedTable || !tableAvailability?.[selectedTable]) {
            return validTimeOptions.filter(time => isTimeAfter(time, startTime));
        }

        const availableHours = tableAvailability[selectedTable].availableHours || validTimeOptions;

        // Find the next booked time after the selected start time
        const startIndex = validTimeOptions.indexOf(startTime);
        let nextBookedIndex = validTimeOptions.length;

        for (let i = startIndex + 1; i < validTimeOptions.length; i++) {
            if (!availableHours.includes(validTimeOptions[i])) {
                nextBookedIndex = i;
                break;
            }
        }

        // Return only times that are after start time and before next booked slot
        return validTimeOptions.filter((time, index) => {
            return isTimeAfter(time, startTime) && index < nextBookedIndex && availableHours.includes(time);
        });
    };

    // Function to handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'date') {
            // Deselect table when date changes
            setSelectedTable(null);
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));

            // Fetch table availability for the new date
            fetchTableAvailability(value);
        } else if (name === 'startTime') {
            // Get available end time options based on selected start time
            const availableEndTimes = getAvailableEndTimeOptions(value);

            // Auto-adjust end time to be 2 hours after start time
            const [hours, minutes] = value.split(':').map(Number);
            let endHours = hours + 2;
            const endMinutes = minutes;

            // Handle overflow to next day (after midnight)
            if (endHours >= 24) {
                endHours = endHours - 24;
            }

            const calculatedEndTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;

            // Find the best available end time
            let bestEndTime;

            if (availableEndTimes.length > 0) {
                // If calculated end time (2 hours later) is available, use it
                if (availableEndTimes.includes(calculatedEndTime)) {
                    bestEndTime = calculatedEndTime;
                } else {
                    // Find the closest available time that's >= calculated end time
                    const timeAfterCalculated = availableEndTimes.find(time =>
                        compareTime(time, calculatedEndTime) >= 0
                    );
                    if (timeAfterCalculated) {
                        bestEndTime = timeAfterCalculated;
                    } else {
                        // If no time >= calculated time, use the first available time after start
                        bestEndTime = availableEndTimes[0];
                    }
                }
            } else {
                // Fallback - find any time after start time
                const timesAfterStart = validTimeOptions.filter(time => isTimeAfter(time, value));
                bestEndTime = timesAfterStart[0] || value;
            }

            setFormData(prev => ({
                ...prev,
                startTime: value,
                endTime: bestEndTime
            }));
        } else if (name === 'endTime') {
            // Only update if the selected end time is valid
            const availableEndTimes = getAvailableEndTimeOptions(formData.startTime);
            if (availableEndTimes.includes(value) && isTimeAfter(value, formData.startTime)) {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Function to get available time options for selected table
    const handleTableClick = (tableNumber: number) => {
        if (selectedTable === tableNumber) {
            // Deselect table
            setSelectedTable(null);
            // Reset to default times
            setFormData(prev => ({
                ...prev,
                startTime: '20:30',
                endTime: '22:30'
            }));
        } else {
            // Select new table
            setSelectedTable(tableNumber);

            // Get available hours for the selected table
            const availableHours = tableAvailability?.[tableNumber]?.availableHours || validTimeOptions;

            // Find the first available start time
            const firstAvailableStart = availableHours[0] || '20:30';

            // Calculate end time (2 hours after start)
            const [hours, minutes] = firstAvailableStart.split(':').map(Number);
            let endHours = hours + 2;
            const endMinutes = minutes;

            // Handle overflow to next day (after midnight)
            if (endHours >= 24) {
                endHours = endHours - 24;
            }

            const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;

            // Check if calculated end time is available, if not, find the closest available time
            const calculatedEndTime = availableHours.includes(endTime) ? endTime :
                availableHours.find((time: string) => {
                    const [timeHours, timeMinutes] = time.split(':').map(Number);
                    return timeHours > hours || (timeHours === hours && timeMinutes > minutes);
                }) || availableHours[availableHours.length - 1] || '22:30';

            setFormData(prev => ({
                ...prev,
                startTime: firstAvailableStart,
                endTime: calculatedEndTime
            }));
        }
    };

    // Update the form validation
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation check
        const hasPhone = formData.phone.trim().length > 0;
        const hasTableSelected = selectedTable !== null;
        const isTableAvailable = selectedTable ? tableAvailability?.[selectedTable]?.available : false;
        const isStartBeforeEnd = isTimeBefore(formData.startTime, formData.endTime);

        if (!hasPhone || !hasTableSelected || !isTableAvailable || !isStartBeforeEnd) {
            // Show specific error for time validation
            if (!isStartBeforeEnd) {
                toast.error(t.booking.errors.timeValidation, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            return;
        }

        setIsSubmitting(true); // Start loading

        try {
            const response = await fetch('/api/tables', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tableNumber: selectedTable,
                    name: formData.name,
                    phone: formData.phone,
                    date: formData.date,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    description: `Table ${selectedTable} booking for ${formData.name} (${formData.phone}) on ${formData.date} from ${formData.startTime} to ${formData.endTime}`
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Set reservation data for modal
                setReservationData({
                    tableNumber: selectedTable!,
                    name: formData.name,
                    phone: formData.phone,
                    date: formData.date,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    reservationId: data.reservationId || 'N/A',
                    createdAt: new Date().toLocaleString('uk-UA')
                });

                // Show success modal
                setShowSuccessModal(true);

                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    date: new Date().toISOString().split('T')[0],
                    startTime: '20:30',
                    endTime: '22:30'
                });
                setSelectedTable(null);

                // Refetch table availability data
                await fetchTableAvailability(formData.date);

            } else {
                toast.error(data.error || t.booking.errors.bookingError, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error(t.booking.errors.networkError, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setIsSubmitting(false); // Stop loading
        }
    };

    // Show loading screen until component has mounted and translations are loaded
    if (!hasMounted || !isInitialized) {
        return (
            <section className="relative bg-black text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-white/20 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-white text-lg">Cherry Lips</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative bg-black text-white py-24 pt-2 overflow-hidden">
            <ToastContainer />
            {/* Red glow effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4">
                <h2 className="text-red-500 text-xl mb-4 text-center uppercase">{t.booking.title}</h2>
                <h3 className="text-4xl md:text-5xl font-serif mb-16 text-center">
                    {t.booking.subtitle}
                </h3>

                <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm shadow-xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Table Selection */}
                        <div>
                            <h4 className="text-2xl font-serif mb-6">{t.booking.selectTable}</h4>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    {/* Loading Animation */}
                                    <div className="relative w-16 h-16 mb-4">
                                        <div className="absolute top-0 left-0 w-full h-full border-4 border-white/20 rounded-full"></div>
                                        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
                                    </div>
                                    <p className="text-gray-400 text-center">{t.booking.loading}</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-8">
                                    <p className="text-red-400 text-sm mb-2">{error}</p>
                                    <button
                                        onClick={() => fetchTableAvailability(formData.date)}
                                        className="text-red-500 hover:text-red-400 text-sm underline"
                                    >
                                        {t.booking.tryAgain}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        {[1, 2, 3, 4, 5, 6].map((tableNumber) => {
                                            const tableData = tableAvailability?.[tableNumber];
                                            const isAvailable = tableData?.available;
                                            const isSelected = selectedTable === tableNumber;
                                            const hasAvailableHours = tableData?.availableHours && tableData.availableHours.length > 0;
                                            const isFullyBooked = isAvailable === false || !hasAvailableHours;

                                            return (
                                                <div
                                                    key={tableNumber}
                                                    onClick={() => !isFullyBooked && handleTableClick(tableNumber)}
                                                    className={`
                                                        w-20 h-20 border-2 rounded-lg transition-all duration-200 flex items-center justify-center relative group
                                                        ${isSelected
                                                            ? 'border-red-500 bg-red-500/20 shadow-lg shadow-red-500/30 cursor-pointer'
                                                            : isFullyBooked
                                                                ? 'border-gray-600 bg-gray-800/50 cursor-not-allowed opacity-50'
                                                                : 'border-white/20 bg-white/10 hover:border-red-500 hover:bg-white/20 cursor-pointer'
                                                        }
                                                    `}
                                                    title={isFullyBooked ? t.booking.fullyBooked.replace('{number}', tableNumber.toString()) : `${t.booking.selectTable} ${tableNumber}`}
                                                >
                                                    <span className={`font-semibold ${isSelected ? 'text-red-500' : 'text-white'}`}>
                                                        {tableNumber}
                                                    </span>

                                                    {isFullyBooked && (
                                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                                                    )}

                                                    {/* Hover tooltip for fully booked tables */}
                                                    {isFullyBooked && (
                                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                                            {t.booking.fullyBookedShort}
                                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {selectedTable ? (
                                        <p className="text-red-500 font-medium text-center">
                                            {t.booking.tableSelected.replace('{number}', selectedTable.toString())}
                                        </p>
                                    ) : (
                                        <p className="text-gray-400 text-center text-sm">
                                            {t.booking.selectTablePrompt}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Booking Form */}
                        <div>
                            <h4 className="text-2xl font-serif mb-6">{t.booking.bookingDetails}</h4>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        {t.booking.form.name}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                                        placeholder={t.booking.form.namePlaceholder}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                        {t.booking.form.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                                        placeholder={t.booking.form.phonePlaceholder}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium mb-2">
                                        {t.booking.form.date}
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                                        required
                                    />
                                </div>

                                {/* Update the start time selector */}
                                <div>
                                    <label htmlFor="startTime" className="block text-sm font-medium mb-2">
                                        {t.booking.form.startTime}
                                    </label>
                                    <select
                                        id="startTime"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                                        required
                                    >
                                        {validTimeOptions.map((time: string) => {
                                            const availableStartTimes = getAvailableStartTimeOptions();
                                            const isAvailable = availableStartTimes.includes(time);

                                            return (
                                                <option
                                                    key={time}
                                                    value={time}
                                                    disabled={!isAvailable}
                                                    className={`${isAvailable ? 'bg-gray-900 text-white' : 'bg-gray-700 text-gray-400'}`}
                                                >
                                                    {time} {!isAvailable ? ` ${t.booking.form.booked}` : ''}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <p className="text-xs text-gray-400 mt-1">{t.booking.form.workingHours}</p>
                                </div>

                                {/* Update the end time selector */}
                                <div>
                                    <label htmlFor="endTime" className="block text-sm font-medium mb-2">
                                        {t.booking.form.endTime}
                                    </label>
                                    <select
                                        id="endTime"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                                        required
                                    >
                                        {validTimeOptions
                                            .filter(time => isTimeAfter(time, formData.startTime)) // Use proper time comparison
                                            .map((time: string) => {
                                                const availableEndTimes = getAvailableEndTimeOptions(formData.startTime);
                                                const isAvailable = availableEndTimes.includes(time);

                                                return (
                                                    <option
                                                        key={time}
                                                        value={time}
                                                        disabled={!isAvailable}
                                                        className={`${isAvailable ? 'bg-gray-900 text-white' : 'bg-gray-700 text-gray-400'}`}
                                                    >
                                                        {time} {!isAvailable ? ` ${t.booking.form.booked}` : ''}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    <p className="text-xs text-gray-400 mt-1">{t.booking.form.availableUntilNext}</p>
                                </div>

                                <div className="text-center">
                                    {(() => {
                                        // Validation logic
                                        const hasPhone = formData.phone.trim().length > 0;
                                        const hasTableSelected = selectedTable !== null;
                                        const isTableAvailable = selectedTable ? tableAvailability?.[selectedTable]?.available : false;
                                        const isStartBeforeEnd = isTimeBefore(formData.startTime, formData.endTime);

                                        const isDisabled = !hasPhone || !hasTableSelected || !isTableAvailable || !isStartBeforeEnd || isSubmitting;

                                        // Generate validation message
                                        let validationMessage = '';
                                        if (!hasPhone) {
                                            validationMessage = t.booking.form.validation.enterPhone;
                                        } else if (!hasTableSelected) {
                                            validationMessage = t.booking.form.validation.selectTable;
                                        } else if (!isTableAvailable) {
                                            validationMessage = t.booking.form.validation.tableUnavailable;
                                        } else if (!isStartBeforeEnd) {
                                            validationMessage = t.booking.form.validation.timeError;
                                        }

                                        return (
                                            <>
                                                <button
                                                    type="submit"
                                                    disabled={isDisabled}
                                                    className={`px-8 py-3 rounded-full text-lg font-medium tracking-wider shadow-lg transition-colors duration-300 flex items-center justify-center mx-auto space-x-2 ${isDisabled
                                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                        : 'bg-[#8B0000] hover:bg-[#660000] text-white'
                                                        }`}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            {/* Loading Spinner */}
                                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                            <span>{t.booking.form.creating}</span>
                                                        </>
                                                    ) : (
                                                        <span>{t.booking.form.book}</span>
                                                    )}
                                                </button>

                                                {isDisabled && validationMessage && !isSubmitting && (
                                                    <p className="text-red-400 text-sm mt-2">
                                                        {validationMessage}
                                                    </p>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && reservationData && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    {/* Red glow effects */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
                    </div>

                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-8 max-w-md w-full shadow-xl">
                        {/* Success Icon */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/30">
                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-serif text-white mb-3 tracking-wider">{t.booking.modal.title}</h3>
                            <p className="text-gray-300 text-lg">{t.booking.modal.subtitle}</p>
                        </div>

                        {/* Reservation Details */}
                        <div className="bg-white/10 border border-white/20 rounded-lg p-6 mb-6">
                            <h4 className="text-xl font-serif text-white mb-6 text-center">{t.booking.modal.details}</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-300">{t.booking.modal.table}</span>
                                    <span className="text-white font-medium text-lg">№{reservationData.tableNumber}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-300">{t.booking.modal.name}</span>
                                    <span className="text-white font-medium">{reservationData.name}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-300">{t.booking.modal.phone}</span>
                                    <span className="text-white font-medium">{reservationData.phone}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-300">{t.booking.modal.date}</span>
                                    <span className="text-white font-medium">{reservationData.date}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-300">{t.booking.modal.time}</span>
                                    <span className="text-white font-medium">{reservationData.startTime} - {reservationData.endTime}</span>
                                </div>
                                {reservationData.reservationId !== 'N/A' && (
                                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                                        <span className="text-gray-300">{t.booking.modal.reservationId}</span>
                                        <span className="text-white font-medium text-sm">{reservationData.reservationId}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-300">{t.booking.modal.created}</span>
                                    <span className="text-white font-medium text-sm">{reservationData.createdAt}</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-medium text-lg">+38 (099) 011 1999</p>
                                    <p className="text-gray-300 text-sm">{t.booking.modal.contactForChanges}</p>
                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="text-center">
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="px-8 py-3 bg-[#8B0000] hover:bg-[#660000] text-white rounded-full text-lg font-medium tracking-wider shadow-lg transition-colors duration-300"
                            >
                                {t.booking.modal.close}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
} 