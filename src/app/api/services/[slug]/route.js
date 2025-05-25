// /api/services/[slug]/route.js

import { connectDB } from "@/lib/mongodb";
import Service from "@/models/serviceModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { slug } = params;

        const service = await Service.findOne({ slug })
            .populate('categories')
            .populate('tags');

        if (!service) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(service, { status: 200 });
    } catch (error) {
        console.error('GET /api/services/[slug] error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { slug } = params;
        const data = await req.json();

        const updatedService = await Service.findOneAndUpdate(
            { slug },
            data,
            {
                new: true,
                runValidators: true,
            }
        ).populate('categories').populate('tags');

        if (!updatedService) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(updatedService);
    } catch (error) {
        console.error('PUT /api/services/[slug] error:', error);
        return NextResponse.json(
            { message: 'Error updating service', error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { slug } = params;

        const deletedService = await Service.findOneAndDelete({ slug });

        if (!deletedService) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('DELETE /api/services/[slug] error:', error);
        return NextResponse.json(
            { message: 'Error deleting service', error: error.message },
            { status: 500 }
        );
    }
}




















// export async function GET(req, { params }) {
//     try {
//         await connectDB();
//         const { slug } = params;

//         const service = await Service.findOne(slug)
//             .populate('categories')
//             .populate('tags');

//         if (!service) {
//             return NextResponse.json({ message: 'Service not found' }, { status: 404 });
//         }

//         return NextResponse.json(service, { status: 200 });
//     } catch (error) {
//         console.error('GET /api/services/[slug] error:', error);
//         return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
// }

// export async function PUT(req, { params }) {
//     await connectDB();

//     const { id } = params;
//     const data = await req.json();

//     try {
//         const updatedService = await Service.findByIdAndUpdate(id, data, {
//             new: true,
//             runValidators: true,
//         });

//         if (!updatedService) {
//             return NextResponse.json({ message: 'Service not found' }, { status: 404 });
//         }

//         return NextResponse.json(updatedService);
//     } catch (error) {
//         return NextResponse.json({ message: 'Error updating service', error }, { status: 500 });
//     }
// }

// export async function DELETE(req, { params }) {
//     await connectDB();

//     const { id } = params;

//     try {
//         const deletedService = await Service.findByIdAndDelete(id);

//         if (!deletedService) {
//             return NextResponse.json({ message: 'Service not found' }, { status: 404 });
//         }

//         return NextResponse.json({ message: 'Service deleted successfully' });
//     } catch (error) {
//         return NextResponse.json({ message: 'Error deleting service', error }, { status: 500 });
//     }
// }