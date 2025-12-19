import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/usermodel";
import connectToDB from "@/config/db";
import bcrypt from "bcryptjs";
import { sendMailer } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        await connectToDB();
        const body = await request.json();
        const { Fullname, Email, Password } = body;

        if (!Email || !Fullname || !Password) {
            return NextResponse.json({
                message: "All fields are required",
            }, { status: 400 })
        }
        const userexists = await UserModel.findOne({ Email })
        if (userexists) {
            return NextResponse.json({
                message: "User already exists",
            }, { status: 400 })
        }
        if (!Email.includes("@")) {
            return NextResponse.json({
                message: "Please use a valid email",
            }, { status: 400 })
        }

        if (Password.length < 6) {
            return NextResponse.json({
                message: "Password must be at least 6 characters long",
            }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt)

        const newUser = await UserModel.create({
            Fullname,
            Email,
            Password: hashedPassword
        })

        try {
            await sendMailer({ Email: newUser.Email, emailType: "VERIFY", userId: newUser._id });
        } catch (emailError: any) {
            console.error("Error sending email:", emailError);
            // Optional: Delete user if email fails to prevent zombie accounts
            // await UserModel.findByIdAndDelete(newUser._id);
            return NextResponse.json({
                message: "User created but failed to send verification email. Please check credentials.",
                error: emailError.message, // Send specific error to client
            }, { status: 500 });
        }

        return NextResponse.json({
            message: "User created successfully",
            user: newUser
        }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({
            message: "Internal Server Error: " + error.message,
        }, { status: 500 })
    }

}
