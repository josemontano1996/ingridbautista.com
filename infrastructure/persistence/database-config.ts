import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URL!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

export async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
