import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/usermodel";
import connectToDB from "@/config/db";

export async function GET(request: NextRequest) {
    try {
        await connectToDB();
        const token = request.cookies.get("token")?.value || "";

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await UserModel.findById(decodedToken._id).select("-Password");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectToDB();
        const token = request.cookies.get("token")?.value || "";

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
        const body = await request.json();
        const { Fullname } = body;

        const updatedUser = await UserModel.findByIdAndUpdate(
            decodedToken._id,
            { Fullname },
            { new: true }
        ).select("-Password");

        return NextResponse.json({
            message: "Profile updated successfully",
            data: updatedUser
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
