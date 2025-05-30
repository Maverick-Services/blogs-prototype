import Loader from "@/components/Loader";
import BlogCard from "./BlogCard";

export default function BlogList({ blogs, onLoadMore, hasMore, isLoadingMore }) {
    return (
        <div className="space-y-8">
            {blogs.length === 0 ? (
                <p className="text-center py-10">No blogs found in this category</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map(blog => (
                            <BlogCard key={`${blog._id}-${blogs.length}`} blog={blog} />
                        ))}
                    </div>

                    {hasMore && (
                        <div className="text-center mt-8">
                            <button
                                onClick={onLoadMore}
                                disabled={isLoadingMore}
                                className="bg-[#0A3460] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
                            >
                                {isLoadingMore ? (
                                    <Loader className="mr-2" />
                                ) : 'Load More Blogs'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}


// import React from 'react'
// import BlogCard from './BlogCard'

// export default function BlogList({ blogs }) {
//     console.log(blogs);
//     return (
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
//             {blogs?.data?.map((item, idx) =>
//                 <div key={idx}>
//                     <BlogCard blog={item} />
//                 </div>
//             )}
//         </div>
//     )
// }
