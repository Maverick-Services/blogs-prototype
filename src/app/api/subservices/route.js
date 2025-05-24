import { NextResponse } from 'next/server';
import SubService from '@/models/subServiceModel';
import { connectDB } from '@/lib/mongodb';

// GET all sub-services
export async function GET() {

    try {
        await connectDB();
        const subServices = await SubService.find();

        if (subServices.length <= 0) {
            return NextResponse.json({ success: true, data: [], message: 'No sub-services found' });
        }

        return NextResponse.json({ success: true, data: subServices });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching sub-services', error },
            { status: 500 }
        );
    }
}

// CREATE a new sub-service
export async function POST(req) {
    await connectDB();

    try {
        const data = await req.json();
        const newSubService = await SubService.create(data);

        return NextResponse.json({ success: true, data: newSubService }, { status: 201 });

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: 'Error creating sub-service', error },
            { status: 500 }
        );
    }
}
