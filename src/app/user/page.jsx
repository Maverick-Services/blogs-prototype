import React from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getCategories, getServices } from '@/lib/main/getHomePageData';
import UserMain from './components/UserMain';

export default async function page() {

    const servicesData = await getServices();
    const services = servicesData?.data || [];
    const categoriesData = await getCategories();
    const categories = categoriesData?.data || [];

    return (
        <WebsiteLayout services={services} categories={categories}>
            <UserMain />
        </WebsiteLayout>
    )
}