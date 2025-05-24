'use client';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from '@/components/ui/breadcrumb';
import { useRouter } from 'next/navigation';
import { useServices } from '@/hooks/useServices';
import ServicesListView from './components/services list/ServicesList';

export default function Page() {
    const router = useRouter();

    const { servicesQuery } = useServices();


    return (
        <InnerDashboardLayout>
            <div className="w-full items-center justify-between">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl mb-3">Services</h1>
                <Breadcrumb className="mb-3">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Services</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4 mt-4">
                    <Button variant="outline">
                        Services: {servicesQuery?.data?.length || 0}
                    </Button>
                    <Button onClick={() => router.push('/admin/services/add')}>
                        <CirclePlus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </div>

                <ServicesListView
                    error={servicesQuery.error}
                    isLoading={servicesQuery.isLoading}
                    services={servicesQuery.data}
                />
            </div>
        </InnerDashboardLayout>
    );
}