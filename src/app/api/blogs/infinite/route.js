// app/api/blogs/infinite/route.js
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);

        const limit = 30;
        const lastId = searchParams.get('lastId');
        const category = searchParams.get('category');

        const filter = { status: 'active' };
        if (category) filter.category = category;

        const query = Blog.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit + 1); // Fetch one extra to check if more exists

        if (lastId) query.where('_id').lt(lastId);

        let blogs = await query.exec();
        const hasMore = blogs.length > limit;

        if (hasMore) blogs = blogs.slice(0, -1); // Remove extra item

        const lastBlogId = blogs.length > 0 ? blogs[blogs.length - 1]?._id : null;

        return NextResponse.json({
            success: true,
            data: {
                blogs,
                hasMore,
                lastId: lastBlogId
            }
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}