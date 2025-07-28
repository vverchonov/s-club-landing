import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cherry-lips';

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is not defined');
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let isConnected = false;

async function connectDB() {
    if (isConnected) {
        console.log('✅ MongoDB already connected');
        return;
    }

    try {
        console.log('🔄 Attempting to connect to MongoDB...');
        console.log('📍 Connection string:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials

        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:');
        console.error('🔍 Error details:', error);
        console.error('🔧 Troubleshooting tips:');
        console.error('   - Check if MongoDB is running');
        console.error('   - Verify connection string format');
        console.error('   - Ensure network connectivity');
        console.error('   - Check authentication credentials');
        throw error;
    }
}

export default connectDB; 