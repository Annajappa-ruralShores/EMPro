import { NextRequest, NextResponse } from "next/server";
import FormModel from "@/models/formmodel";
import connectToDB from "@/config/db";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        await connectToDB();

        // 1. Get User ID from Token
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ message: "Unauthorized: Please login first" }, { status: 401 });
        }

        // Decode token to get user ID
        // Note: verifying with secret is safer than just decoding
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
        const userId = decodedToken._id;

        // 2. Get Form Data from Request
        const body = await request.json();

        // 3. Save to Database
        const newForm = await FormModel.create({
            ...body,
            userId: userId
        });

        return NextResponse.json({
            message: "Form submitted successfully",
            data: newForm
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            message: "Failed to submit form",
            error: error.message
        }, { status: 500 });
    }
}
