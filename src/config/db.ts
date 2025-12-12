import mongoose from 'mongoose';

let isconnected = false;

export default async function connectToDB() {
    if (isconnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    const url: string = process.env.MONGO_URI!;

    if (!url) {
        console.log("Please provide MONGO_URI in the environment variables");
        return;
    }
    try {
        const db = await mongoose.connect(url);
        isconnected = db.connection.readyState === 1;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}