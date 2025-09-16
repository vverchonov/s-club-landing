import mongoose from 'mongoose';

const tableReservationSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 20  // Tables 1-12, Chairs 13-20
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Compound index to ensure no overlapping reservations for the same table on the same date
tableReservationSchema.index({ tableNumber: 1, date: 1, startTime: 1, endTime: 1 });

export default mongoose.models.TableReservation || mongoose.model('TableReservation', tableReservationSchema); 