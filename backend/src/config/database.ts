import mongoose from "mongoose";


const connectDB = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    console.log("Attempting to connect to MongoDB with URI:", MONGO_URI);
    if (!MONGO_URI) {
      throw new Error("MONGO_URI missing in environment variables");
    }

    await mongoose.connect(MONGO_URI)
    console.log("MongoDB connected"); 
  } catch (error) {
    console.log("Database connection failed. Please check the following:");
    console.log("1. Your MongoDB server is running.");
    console.log("2. The MONGO_URI in your .env file is correct.");
    console.error("Error details:", error);


    // Stop the app if database connection fails
    process.exit(1);
  }
};

export default connectDB;
