import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

// Hook to manage Services
export const useServices = () => {
    const queryClient = useQueryClient();

    // Get all Services
    const servicesQuery = useQuery({
        queryKey: ['services'],
        queryFn: () => api.get('/services').then(res => res.data),
        staleTime: 1000 * 60 * 5,
        onError: (err) => {
            toast.error(err.message || 'Failed to fetch services');
        }
    });

    // Create Service
    const createService = useMutation({
        mutationFn: (data) => api.post('/services', data),
        onSuccess: () => {
            queryClient.invalidateQueries(['services']);
            toast.success('Service created successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create service');
        }
    });

    // Update Service
    const updateService = useMutation({
        mutationFn: ({ id, data }) => api.put(`/services/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['services']);
            toast.success('Service updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update service');
        }
    });

    // Delete Service
    const deleteService = useMutation({
        mutationFn: (id) => api.delete(`/services/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['services']);
            toast.success('Service deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete service');
        }
    });

    return {
        servicesQuery,
        createService,
        updateService,
        deleteService,
    };
};
