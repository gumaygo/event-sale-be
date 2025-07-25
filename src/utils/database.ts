import mongoose from "mongoose";
import { DATABASE_URL } from "./env.ts";

const connectDB = async () => {
    try { 
        await mongoose.connect(DATABASE_URL, {
            dbName: "event-sale"
        });
        return Promise.resolve("Database connected");
    } catch (error) {
        return Promise.reject(error);
    }
}

export default connectDB;