import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
    try {
        const mongoUri = process.env.MONGO_URL

        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB: ", mongoose.connection.host);

    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}

export default connectDB;