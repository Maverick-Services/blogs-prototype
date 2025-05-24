// admin/services/[id]/edit
'use client';

import React from 'react';
import ServiceForm from '../../components/ServiceForm';
import { useServiceStore } from '@/store/serviceStore';
import { useServices } from '@/hooks/useServices';

const EditServicePage = () => {
    const { updateService } = useServices()

    const { selectedService } = useServiceStore();
    if (!selectedService) return <div className="p-4">Loading or Invalid Access</div>;

    const handleSubmit = async (data) => {
        await updateService.mutateAsync({ id: selectedService._id, data })
        console.log('Update service:', data);
    };

    return (
        <div>
            <h1>Edit Service</h1>
            <ServiceForm defaultValues={selectedService} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditServicePage;
