import { NextRequest, NextResponse } from "next/server";
import HelpModel from "@/models/helpmodel";
import connectToDB from "@/config/db";

// PUT: Update Help Request (Mainly for Status)
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await connectToDB();
        const body = await request.json();
        const { status } = body;

        const updatedRequest = await HelpModel.findByIdAndUpdate(
            params.id,
            { status },
            { new: true }
        );

        if (!updatedRequest) return NextResponse.json({ message: "Request not found" }, { status: 404 });

        return NextResponse.json({
            message: "Request status updated successfully",
            data: updatedRequest
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
