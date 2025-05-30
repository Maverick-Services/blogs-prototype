// app/blogs/page.js
import BlogList from "./components/BlogList";
import CategoryFilter from "./components/CategoryFilter";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata() {
    return {
        title: "Blog Posts | Your Site Name",
        description: "Discover our latest articles and blog posts",
        openGraph: {
            title: "Blog Posts | Your Site Name",
            description: "Discover our latest articles and blog posts",
            images: [
                {
                    url: "/og-blogs.jpg",
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}

export default async function BlogsPage() {
    // Fetch from your API endpoints instead of direct DB calls
    const [blogsRes, categoriesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?limit=30`, { next: { revalidate: revalidate } }),
        fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`, { next: { revalidate: revalidate } })
    ]);

    if (!blogsRes.ok || !categoriesRes.ok) {
        // Optionally handle errors
        throw new Error('Failed to fetch blog data');
    }

    const { blogs: initialBlogs, totalCount } = await blogsRes.json();
    const categories = await categoriesRes.json();

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Discover our latest articles, tutorials, and industry insights
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <CategoryFilter categories={categories} />
                </div>

                <div className="lg:col-span-3">
                    <BlogList
                        initialBlogs={initialBlogs}
                        initialTotalCount={totalCount}
                    />
                </div>
            </div>
        </div>
    );
}