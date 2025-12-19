import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/usermodel";
import connectToDB from "@/config/db";

// GET single user (Optional but good to have)
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await connectToDB();
        const user = await UserModel.findById(params.id).select("-Password");
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
        return NextResponse.json({ data: user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update User Details (Admin or Self)
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await connectToDB();
        const body = await request.json();

        // Prevent password update via this route for simplicity, or handle hashing if needed
        // For now, allow updating Fullname, Email, isAdmin, isVerified
        const { Password, ...updateData } = body;

        const updatedUser = await UserModel.findByIdAndUpdate(
            params.id,
            updateData,
            { new: true, runValidators: true }
        ).select("-Password");

        if (!updatedUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json({
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Remove User
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await connectToDB();
        const deletedUser = await UserModel.findByIdAndDelete(params.id);

        if (!deletedUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
