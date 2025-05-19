import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ error: "Image is required" }, { status: 400 });
        }

        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "test",
            resource_type: "auto",
        });

        console.log("Cloudinary Response:", uploadResponse);

        return NextResponse.json({ imageURL: uploadResponse.secure_url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const result = await cloudinary.search
            .expression('folder:test')
            .sort_by('created_at', 'desc')
            .max_results(100)
            .execute();

        const images = result.resources.map((img) => ({
            id: img.asset_id,
            public_id: img.public_id,
            url: img.secure_url,
            format: img.format,
            width: img.width,
            height: img.height,
            size: Math.round(img.bytes / 1024), // size in KB
            created_at: img.created_at,
        }));

        return NextResponse.json(images, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
