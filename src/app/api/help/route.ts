import { NextRequest, NextResponse } from "next/server";
import HelpModel from "@/models/helpmodel";
import connectToDB from "@/config/db";
import jwt from "jsonwebtoken";

// GET: Fetch all help requests (Admin Only - ideally)
export async function GET(request: NextRequest) {
    try {
        await connectToDB();

        // Optional: Verify admin token here for extra API security
        // For simplicity relying on middleware for page access, but good practice here too.

        const requests = await HelpModel.find().sort({ createdAt: -1 });

        return NextResponse.json({
            message: "Help requests fetched successfully",
            data: requests
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Submit a help request
export async function POST(request: NextRequest) {
    try {
        await connectToDB();
        const body = await request.json();
        const { username, email, subject, message } = body;

        if (!username || !email || !subject || !message) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const newRequest = await HelpModel.create({
            username,
            email,
            subject,
            message
        });

        return NextResponse.json({
            message: "Help request submitted successfully",
            data: newRequest
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
