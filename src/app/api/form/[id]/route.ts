import { NextRequest, NextResponse } from "next/server";
import FormModel from "@/models/formmodel";
import connectToDB from "@/config/db";

// PUT: Update Form Details
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await connectToDB();
        const body = await request.json();

        const updatedForm = await FormModel.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedForm) return NextResponse.json({ message: "Form not found" }, { status: 404 });

        return NextResponse.json({
            message: "Form updated successfully",
            data: updatedForm
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Remove Form
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await connectToDB();
        const deletedForm = await FormModel.findByIdAndDelete(params.id);

        if (!deletedForm) return NextResponse.json({ message: "Form not found" }, { status: 404 });

        return NextResponse.json({ message: "Form deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
