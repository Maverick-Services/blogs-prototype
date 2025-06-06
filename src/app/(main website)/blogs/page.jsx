import React from 'react';
import { getHomePageData } from '@/lib/main/getHomePageData';
// import { getBlogsData } from '@/lib/main/getBlogsData';
import BlogsClient from './components/BlogsClient';

export default async function page() {
    const { services, categories } = await getHomePageData();
    //   const initialData = await getBlogsData({ page: 1, limit: 30, category: 'all' });

    return (
        <BlogsClient
            services={services}
            categories={categories}
        //   initialData={initialData}
        />
    );
}
