import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';


export async function GET(_, { params }) {
    await connectDB();

    try {
        const user = await User.findById(params.id).select('-password');

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, user });

    } catch (err) {
        return NextResponse.json({ success: false, message: 'Failed to fetch user' }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    await connectDB();
    try {
        const updates = await req.json();
        const hashedPassword = await bcrypt.hash(updates.password, 10);
        const user = await User.findByIdAndUpdate(params.id, { ...updates, password: hashedPassword }, { new: true });
        if (!user) {
            return Response.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return Response.json({ success: true, user });
    } catch (err) {
        return Response.json({ success: false, message: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    await connectDB();
    try {
        const user = await User.findByIdAndDelete(params.id);
        if (!user) {
            return Response.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return Response.json({ success: true, message: 'User deleted' });
    } catch (err) {
        return Response.json({ success: false, message: 'Failed to delete user' }, { status: 500 });
    }
}
