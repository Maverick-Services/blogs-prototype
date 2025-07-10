import { connectDB } from "@/lib/mongodb";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const res = await Category.find()
            .sort({ updatedAt: -1 });

        return NextResponse.json({ success: true, data: res });
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: error,
            status: 500
        })
    }
}