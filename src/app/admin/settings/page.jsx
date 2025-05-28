// app/admin/media/page.jsx
'use client';
import React from 'react';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from '@/components/ui/breadcrumb';
import UserInfo from './UserInfo';


export default function MediaPage() {
    return (
        <InnerDashboardLayout>
            <div className="w-full flex items-center justify-between">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl mb-3">
                    Settings
                </h1>
                <Breadcrumb className="mb-3">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Settings</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <UserInfo />
        </InnerDashboardLayout>
    )
}