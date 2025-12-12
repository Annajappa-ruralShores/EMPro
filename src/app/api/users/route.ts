import connectToDB from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import UserModel, { IUser } from "@/models/usermodel";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await connectToDB();

        const id: string | null = request.nextUrl.searchParams.get("id");

        const checkUserExist = await UserModel.findById(id);

        const allUsers = await UserModel.find();

        console.log(allUsers)

        if (allUsers.length === 0) {
            return NextResponse.json({
                message: "No users found",
                status: 404
            })
        }

        if (allUsers) {
            return NextResponse.json({
                message: "User fetched Successfully",
                status: 200,
                Users: allUsers
            })
        }

        if (!checkUserExist) {
            return NextResponse.json({
                message: "User Not Found",
                status: 404
            })
        }


        if (id) {
            const singleUser: IUser | null = await UserModel.findById(id);
            return NextResponse.json({
                message: "User fetched successfully",
                status: 200,
                User: singleUser
            })
        }

        const users: IUser[] = await UserModel.find();
        return NextResponse.json({
            message: "Users fetched successfully",
            status: 200,
            Users: users
        })

    } catch (error: any) {
        return NextResponse.json({
            message: "Internal Server Error",
            status: 500
        })
    }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
    try {
        await connectToDB();
        const body = await request.json();
        const { _id, Fullname, Email, Password } = body;

        if (!_id) {
            return NextResponse.json({
                message: "User ID is required",
                status: 400
            })

        }
        if (!Fullname || !Email || !Password) {
            return NextResponse.json({
                message: "All fields are required",
                status: 400
            })
        }
        if (!Email.includes("@")) {
            return NextResponse.json({
                message: "Please use a valid email",
                status: 400
            })
        }
        if (Password.length < 6) {
            return NextResponse.json({
                message: "Password must be at least 6 characters long",
                status: 400
            })
        }
        const existEmail = await UserModel.findOne({ Email, _id: { $ne: _id } })
        if (existEmail) {
            return NextResponse.json({
                message: "Email already exists",
                status: 400
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt)

        const updatedUser = await UserModel.findByIdAndUpdate(_id, {
            Fullname,
            Email,
            Password: hashedPassword
        })

        return NextResponse.json({
            message: "User updated successfully",
            status: 200,
            UpdatedUser: updatedUser
        })

    } catch (error: any) {
        return NextResponse.json({
            message: "Internal Server Error",
            status: 500
        })
    }

}

export async function DELETE(request: NextRequest) {
    try {
        await connectToDB();
        const id: string | null = request.nextUrl.searchParams.get("id");
        const checkuserExist = await UserModel.findById(id);

        if (!checkuserExist) {
            return NextResponse.json({
                message: "User not found",
                status: 404
            })
        }

        const deleteUser = await UserModel.findByIdAndDelete(id);

        return NextResponse.json({
            message: "User deleted successfully",
            status: 200,
            DeletedUser: deleteUser._id
        })

    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error",
            status: 500
        })
    }
}   
