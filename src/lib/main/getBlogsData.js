export async function getBlogsData({ page = 1, limit = 30, category = 'all' } = {}) {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/b`);
        url.searchParams.append('page', page);
        url.searchParams.append('limit', limit);
        if (category && category !== 'all') {
            url.searchParams.append('category', category);
        }
        const blogsRes = await fetch(url)
        const data = await blogsRes.json();
        // console.log(data);
        return {
            blogs: data.data || [],
            totalCount: data.totalCount || 0,
            currentPage: data.currentPage || 1,
            totalPages: data.totalPages || 1
        };

    } catch (error) {
        console.error('Error fetching blogs:', error);
        return {
            blogs: [],
            totalCount: 0,
            currentPage: 1,
            totalPages: 1
        };
    }
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