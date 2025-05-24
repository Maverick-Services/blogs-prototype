import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SubService from '@/models/subServiceModel';

// GET a single sub-service by ID
export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get('serviceId');

    if (!serviceId) {
        return NextResponse.json({ message: 'Missing serviceId' }, { status: 400 });
    }

    try {
        const subServices = await SubService.find({ service: serviceId });
        return NextResponse.json(subServices);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching sub-services', error }, { status: 500 });
    }
}

// UPDATE a sub-service by ID
export async function PUT(req, { params }) {
    await connectDB();

    try {
        const data = await req.json();

        const updated = await SubService.findByIdAndUpdate(params.id, data, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return NextResponse.json({ message: 'Sub-service not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating sub-service', error }, { status: 500 });
    }
}

// DELETE a sub-service by ID
export async function DELETE(req, { params }) {
    await connectDB();

    try {
        const deleted = await SubService.findByIdAndDelete(params.id);
        if (!deleted) {
            return NextResponse.json({ message: 'Sub-service not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Sub-service deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting sub-service', error }, { status: 500 });
    }
}
