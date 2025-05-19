import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_DB) {
  throw new Error("Please provide MONGO_DB in the .env file");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB);

    console.log("MongoDB is connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);   
  }
}

export default connectDB;