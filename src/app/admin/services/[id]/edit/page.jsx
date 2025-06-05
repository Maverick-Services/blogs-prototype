// admin/services/[id]/edit
'use client';

import React from 'react';
import ServiceForm from '../../components/ServiceForm';
import { useServiceStore } from '@/store/serviceStore';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from '@/components/ui/breadcrumb';
import { useServices } from '@/hooks/useServices';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import { useRouter } from 'next/navigation';
import NotAuthorizedPage from '@/components/notAuthorized';

const EditServicePage = () => {
    const router = useRouter()
    const { updateService, permissions: { canEdit } } = useServices()

    const { selectedService } = useServiceStore();
    if (!selectedService) return <div className="p-4">Loading or Invalid Access</div>;

    const handleSubmit = async (data) => {
        await updateService.mutateAsync({ id: selectedService._id, data })
        console.log('Update service:', data);
        router.push('/admin/services')
    };

    if (!canEdit) return <NotAuthorizedPage />;

    return (
        <InnerDashboardLayout>
            <div className="w-full items-center justify-between">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-3xl mb-3">Edit Service</h1>
                <Breadcrumb className="mb-5">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin/services">Services</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Edit</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <ServiceForm defaultValues={selectedService} onSubmit={handleSubmit} loading={updateService.isPending} error={updateService.error} />
        </InnerDashboardLayout>
    );
};

export default EditServicePage;
