// app/blogs/page.jsx
import React from 'react';
import { getCategories, getServices } from '@/lib/main/getHomePageData';
import BlogsClient from './components/BlogsClient';
import { getBlogsData } from '@/lib/main/getBlogsData';

export default async function page() {
    const servicesData = await getServices();
    const services = servicesData?.data || [];
    const categoriesData = await getCategories();
    const categories = categoriesData?.data || [];

    const blogs = await getBlogsData();
    console.log(blogs)

    return (
        <BlogsClient
            services={services}
            categories={categories}
            allBlogs={blogs}
        />
        // <p>lajfdklasjf;lkasjdf</p>
    );
}
