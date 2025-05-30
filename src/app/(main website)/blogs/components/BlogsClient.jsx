"use client"

import React, { useState, useEffect, useRef } from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout'
import BlogList from './BlogList'
import TalkToLawyerCard from '@/components/website/TalkToLawyerCard'
import CategoriesFilter from './CategoryFilter'
import { getBlogsData } from '@/lib/main/getBlogsData';
import Loader from '@/components/Loader'

function BlogsClient({ services, categories, initialData }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    const [blogData, setBlogData] = useState({
        blogs: initialData.blogs,
        currentPage: initialData.currentPage,
        totalPages: initialData.totalPages,
        totalCount: initialData.totalCount,
        currentCategory: 'all'
    });

    // Use a ref to track the current category
    const currentCategoryRef = useRef(blogData.currentCategory);

    // Keep the ref updated
    useEffect(() => {
        currentCategoryRef.current = blogData.currentCategory;
    }, [blogData.currentCategory]);

    // Fetch blogs when category changes
    useEffect(() => {
        const fetchCategoryBlogs = async () => {
            setLoading(true);
            try {
                const newData = await getBlogsData({
                    page: 1,
                    limit: 30,
                    category: selectedCategory
                });

                setBlogData({
                    blogs: newData.blogs,
                    currentPage: newData.currentPage,
                    totalPages: newData.totalPages,
                    totalCount: newData.totalCount,
                    currentCategory: selectedCategory
                });
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedCategory !== blogData.currentCategory) {
            fetchCategoryBlogs();
        }
    }, [selectedCategory]);

    const handleLoadMore = async () => {
        if (blogData.currentPage >= blogData.totalPages) return;

        setLoading(true);
        try {
            const newData = await getBlogsData({
                page: blogData.currentPage + 1,
                limit: 10,
                // Use ref to get the current category to avoid stale closure
                category: currentCategoryRef.current
            });

            // Use functional update to ensure we have the latest state
            setBlogData(prev => ({
                ...prev,
                blogs: [...prev.blogs, ...newData.blogs],
                currentPage: newData.currentPage,
                totalPages: newData.totalPages
            }));
        } catch (error) {
            console.error('Error loading more blogs:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <WebsiteLayout services={services} categories={categories}>
            <div className='bg-[#0a3460] max-w-7xl mx-auto rounded-2xl text-white h-28 flex items-center justify-center mt-5 mb-5'>
                <h1 className='font-bold text-3xl md:text-4xl'>Read Our Blogs</h1>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto items-start gap-5'>
                <div className='flex flex-col gap-4 w-full'>
                    <CategoriesFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                    <TalkToLawyerCard />
                </div>

                <div className='col-span-1 sm:col-span-2 lg:col-span-3'>
                    {loading && blogData.blogs.length === 0 ? (
                        <div><Loader /></div>
                    ) : (
                        <BlogList
                            blogs={blogData.blogs}
                            onLoadMore={handleLoadMore}
                            hasMore={blogData.currentPage < blogData.totalPages}
                            isLoadingMore={loading}
                        />
                    )}
                </div>
            </div>
        </WebsiteLayout>
    )
}

export default BlogsClient;





// "use client"

// import React, { useState } from 'react'
// import WebsiteLayout from '@/components/website/WebsiteLayout'
// import BlogList from './BlogList'
// import TalkToLawyerCard from '@/components/website/TalkToLawyerCard'
// import CategoriesFilter from './CategoryFilter'

// function BlogsClient({ services, categories, blogs }) {
//     const [selectedCategory, setSelectedCategory] = useState('all')

//     return (
//         <WebsiteLayout services={services} categories={categories}>
//             <div className='bg-[#0a3460] max-w-7xl mx-auto rounded-2xl text-white h-28 flex items-center justify-center mt-5 mb-5'>
//                 <h1 className='font-bold text-3xl md:text-4xl'>Read Our Blogs</h1>
//             </div>

//             <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto items-start gap-5'>
//                 <div className='flex flex-col gap-4 w-full'>

//                     <CategoriesFilter categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

//                     <TalkToLawyerCard />
//                 </div>
//                 <div className='col-span-1 sm:col-span-2 lg:col-span-3'>
//                     <BlogList blogs={blogs} />
//                 </div>

//             </div>
//         </WebsiteLayout>
//     )
// }

// export default BlogsClient