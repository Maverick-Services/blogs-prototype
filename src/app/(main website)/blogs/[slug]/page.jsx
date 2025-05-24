import React from 'react'
import BlogData from '../components/BlogData';
import { getBlog } from '@/lib/firebase/blogs/blogs';
import NavBar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { RelatedBlogs } from '../components/RelatedBlogs';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getBlog(slug);

    return {
        title: post?.title,
        openGraph: {
            images: [post?.imageURL?.imageURL],
        },
    }
}

export default async function page({ params }) {
    const { slug } = await params;
    const post = await getBlog(slug);

    // console.log(post)

    return (
        <div className="">
            <div className="sticky w-full top-0 z-[100]">
                <NavBar />
            </div>
            <main className="h-full mt-6 w-11/12 mx-auto overflow-hidden py-4">
                <div className='w-full flex flex-col lg:flex-row justify-between items-center gap-2'>
                    <div className='lg:max-w-[700px] xl:max-w-[850px] h-screen overflow-y-auto mb-4'>
                        <BlogData post={post} />
                    </div>
                    <div className='grow self-start flex flex-col items-center bg-white'>
                        <h3 className='text-2xl font-bold text-primary'>Services</h3>
                    </div>
                </div>
                <RelatedBlogs category={post?.categoryId} />
            </main>
            <Footer />
        </div>
    )
}