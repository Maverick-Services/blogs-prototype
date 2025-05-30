// app/api/blog/bySlug/[slug]
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { slug } = params;

        const blog = await Blog.findOne({ slug }).populate('categories').exec();

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        console.error('GET /api/Blogs/bySlug/[slug] error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}