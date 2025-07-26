import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

const connectDB = async () => {
    try { 
        console.log("Attempting to connect to database...");
        await mongoose.connect(DATABASE_URL, {
            dbName: "event-sale"
        });
        
        return Promise.resolve("Database connected");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        console.log("💡 Make sure MongoDB is running or check your DATABASE_URL");
        return Promise.reject(error);
    }
}

export default connectDB;