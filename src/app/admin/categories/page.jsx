'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CategoriesListView from './components/CategoriesListView';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    async function fetchCategories() {
        setLoading(true);
        try {
            const res = await axios.get('/api/categories');
            setCategories(res.data.data);
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <InnerDashboardLayout>
            <div className="">
                <Breadcrumb className="mb-3">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Categories</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex justify-between items-center mb-4 mt-4">
                    <Button variant="outline">
                        Categories: {categories.length}
                    </Button>
                    <Link href="categories/form">
                        <Button>
                            <CirclePlus className="mr-2 h-4 w-4" />
                            Add New
                        </Button>
                    </Link>
                </div>

                <CategoriesListView
                    loading={loading}
                    categories={categories}
                    error={error}
                />
            </div>
        </InnerDashboardLayout>
    );
}
