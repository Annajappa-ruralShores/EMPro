import { NextRequest, NextResponse } from "next/server";
import FormModel from "@/models/formmodel";
import connectToDB from "@/config/db";
import UserModel from "@/models/usermodel"; // Ensure UserModel is registered

export async function GET(request: NextRequest) {
    try {
        await connectToDB();

        // Fetch all forms and populate user details
        // Note: Populate requires UserModel to be created/imported at least once
        const forms = await FormModel.find({})
            .sort({ createdAt: -1 })
            .populate("userId", "Fullname Email");

        return NextResponse.json({
            message: "Forms fetched successfully",
            data: forms
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
