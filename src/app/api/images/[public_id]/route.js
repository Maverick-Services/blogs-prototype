import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function DELETE(req, { params }) {
    try {
        const { public_id } = params;

        if (!public_id) {
            return NextResponse.json({ error: 'Public ID is required' }, { status: 400 });
        }

        const result = await cloudinary.uploader.destroy(public_id);

        if (result.result !== 'ok') {
            return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
