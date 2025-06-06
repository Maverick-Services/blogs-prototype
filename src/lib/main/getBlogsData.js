import Blog from '@/models/blogModel';
import { connectDB } from '@/lib/mongodb';

export async function getBlogsData({ page = 1, limit = 30, category = 'all' } = {}) {
    await connectDB();
    const filter = { status: true };
    if (category && category !== 'all') {
        filter.categories = { $in: [category] };
    }
    const skip = (page - 1) * limit;
    const [blogs, totalCount] = await Promise.all([
        Blog.find(filter)
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limit),
        Blog.countDocuments(filter)
    ]);

    return {
        blogs,
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit)
    };
}

export async function getBlogBySlug(slug) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/bySlug/${slug}`,
            { next: { revalidate: 300 }, }
        );

        if (!res.ok) {
            console.error(`Failed to fetch service ${slug}: ${res.status}`);
            return null;
        }

        const service = await res.json();
        return service;
    } catch (error) {
        console.error(`Error fetching blog ${slug}:`, error);
        return null;
    }
}


// export async function getBlogsData() {
//     try {
//         const [blogsRes] = await Promise.all([
//             fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/b?status=true&limit=30`, {
//                 next: { revalidate: 3600 }
//             }),
//         ]);

//         if (!blogsRes.ok) {
//             throw new Error('Failed to blogsRes data');
//         }

//         const blogs = await blogsRes.json();

//         return { blogs };

//     } catch (error) {
//         console.error('Error fetching data:', error);
//         // Return empty data or fallback data
//         return { services: [], categories: [] };
//     }
// }