import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DATABASE_URL as string;
    await mongoose.connect(dbUrl);
    console.log('Database is Connect');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', (error as Error).message);
    console.error('Full error:', error);
    throw error; 
  }
};