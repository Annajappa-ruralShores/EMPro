import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/usermodel";
import connectToDB from "@/config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        await connectToDB();
        const body = await request.json();
        const { Email, Password } = body;

        if (!Email || !Password) {
            return NextResponse.json({
                message: "All fields are required",
            }, { status: 400 })
        }
        // 1. Check for Env-based Super Admin
        if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD &&
            Email === process.env.ADMIN_EMAIL && Password === process.env.ADMIN_PASSWORD) {

            // Create a special Admin token not linked to DB user
            const tokenData = {
                _id: "admin_env_id", // Special ID
                Fullname: "Super Admin",
                Email: Email,
                isAdmin: true
            }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

            const response = NextResponse.json({
                message: "Admin logged in successfully",
                isAdmin: true
            }, { status: 200 })
            response.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
            return response;
        }

        const userexists = await UserModel.findOne({ Email })

        if (!Email.includes("@")) {
            return NextResponse.json({
                message: "Please use a valid email",
            }, { status: 400 })
        }
        if (!userexists) {
            return NextResponse.json({
                message: "User does not exists",
            }, { status: 400 })
        }
        const isPasswordValid = await bcrypt.compare(Password, userexists.Password);
        if (!isPasswordValid) {
            return NextResponse.json({
                message: "Invalid Password",
            }, { status: 400 })
        }

        const tokenData = {
            _id: userexists._id,
            Fullname: userexists.Fullname,
            Email: userexists.Email,
            isAdmin: userexists.isAdmin
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });


        const response = NextResponse.json({
            message: "User logged in successfully",
            isAdmin: userexists.isAdmin
        }, { status: 200 })
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })

        return response

    } catch (error: any) {
        return NextResponse.json({
            message: "Internal Server Error",
        }, { status: 500 })
    }

}


