import React from 'react'
import { getHomePageData } from '@/lib/main/getHomePageData';
import TTLClient from './TTLClient';

export default async function Page() {
    const { services, categories } = await getHomePageData();

    return <TTLClient services={services} categories={categories} />
}
