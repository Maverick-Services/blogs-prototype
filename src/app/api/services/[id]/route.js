import { connectDB } from "@/lib/mongodb";
import Service from "@/models/serviceModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        connectDB();
        const { id } = params;
        const service = await Service.findById(id)
            .populate('categories')
            .populate('tags')

        if (!service) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        NextResponse.json(
            { success: true, data: service },
            { status: 200 }
        )
    } catch (error) {
        console.error('GET /api/services/[id] error:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    await connectDB();

    const { id } = params;
    const data = await req.json();

    try {
        const updatedService = await Service.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!updatedService) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(updatedService);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating service', error }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    await connectDB();

    const { id } = params;

    try {
        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting service', error }, { status: 500 });
    }
}