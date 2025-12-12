import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/usermodel";
import connectToDB from "@/config/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        connectToDB();
        const body = await request.json();
        const { Email, Password } = body;

        if (!Email || !Password) {
            return NextResponse.json({
                message: "All fields are required",
                status: 400
            })
        }
        const userexists = await UserModel.findOne({ Email })

        if (!Email.includes("@")) {
            return NextResponse.json({
                message: "Please use a valid email",
                status: 400
            })
        }
        if (!userexists) {
            return NextResponse.json({
                message: "User does not exists",
                status: 400
            })
        }
        const isPasswordValid = await bcrypt.compare(Password, userexists.Password);
        if (!isPasswordValid) {
            return NextResponse.json({
                message: "Invalid Password",
                status: 400
            })
        }
        return NextResponse.json({
            message: "User logged in successfully",
            status: 200,
            user: userexists
        })

    } catch (error: any) {
        return NextResponse.json({
            message: "Internal Server Error",
            status: 500
        })
    }

}


