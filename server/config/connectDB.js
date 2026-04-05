import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_DB) {
  throw new Error("Please provide MONGO_DB in the .env file");
}

const connectDB = async () => {
  try {
    // We create the 'conn' variable here by assigning it the result of the connect call
    const conn = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4, // Keeps the connection stable for your ISP
    });

    // Now 'conn' exists and we can log the host
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;