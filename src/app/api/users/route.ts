import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/usermodel";
import connectToDB from "@/config/db";

export async function GET(request: NextRequest) {
    try {
        await connectToDB();

        // Fetch all users but exclude passwords
        const users = await UserModel.find().select("-Password").sort({ createdAt: -1 });

        return NextResponse.json({
            message: "Users fetched successfully",
            data: users
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
