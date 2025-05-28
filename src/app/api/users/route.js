// app/api/users/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET() {
    await connectDB();
    try {
        const users = await User.find().select('-password');
        if (!users || users.length === 0) {
            return NextResponse.json({
                success: true,
                message: "Users data is empty.",
                data: []
            });
        }
        return NextResponse.json({
            success: true,
            data: users
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();

    try {
        const body = await req.json();

        // check existing user
        const existing = await User.findOne({ email: body.email });
        if (existing) {
            return NextResponse.json({
                success: false,
                message: 'Email already exists'
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Create user with hashed password
        const user = await User.create({
            ...body,
            password: hashedPassword
        });

        return NextResponse.json({
            success: true,
            data: user
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: 'Failed to create user',
            error: err.message
        }, { status: 500 });
    }
}