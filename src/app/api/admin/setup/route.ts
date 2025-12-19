import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/usermodel";
import connectToDB from "@/config/db";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
    try {
        await connectToDB();

        const adminEmail = "admin@ruralshores.com";
        const adminExists = await UserModel.findOne({ Email: adminEmail });

        if (adminExists) {
            // Force reset password to ensure it works
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("admin123", salt);

            adminExists.Password = hashedPassword;
            adminExists.isAdmin = true; // Ensure they are admin
            await adminExists.save();

            return NextResponse.json({
                message: "Admin account exists. Password reset to default.",
                credentials: {
                    email: adminEmail,
                    password: "admin123"
                }
            });
        }

        // Create new Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", salt);

        const newAdmin = new UserModel({
            Fullname: "Super Admin",
            Email: adminEmail,
            Password: hashedPassword,
            isAdmin: true,
            isVerified: true
        });

        await newAdmin.save();

        return NextResponse.json({
            message: "Admin account created successfully",
            credentials: {
                email: adminEmail,
                password: "admin123",
                note: "Please change this password immediately!"
            }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
