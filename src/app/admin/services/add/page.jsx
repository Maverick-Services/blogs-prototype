"use client"
import React from 'react'
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from '@/components/ui/breadcrumb';
import ServiceForm from '../components/ServiceForm';
import { useServices } from '@/hooks/useServices';

function page() {

    const { createService } = useServices()

    const {
        mutateAsync: createServiceAsync,
    } = createService

    const handleSubmit = async (data) => {
        // Yahan TanStack Query ka mutation ya fetch call se "create service" logic
        console.log('Add service:', data);
        await createServiceAsync(data)
    };

    return (
        <InnerDashboardLayout>
            <div className="w-full items-center justify-between">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl mb-3">Add New Product</h1>
                <Breadcrumb className="mb-3">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/services">Products</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Add New</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <ServiceForm onSubmit={handleSubmit} />
        </InnerDashboardLayout>
    )
}

export default page
