import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Actions, checkPermission, onlyAdminPermission, Resources } from '@/lib/permissions';

// Hook to manage Services
export const useServices = () => {
    const router = useRouter()
    const { data: session } = useSession();
    const user = session?.user;
    const queryClient = useQueryClient();

    // Permissions
    const canView = checkPermission(user, Resources.SERVICES, Actions.VIEW);
    const canAdd = checkPermission(user, Resources.SERVICES, Actions.ADD);
    const canEdit = checkPermission(user, Resources.SERVICES, Actions.EDIT);
    const canDelete = checkPermission(user, Resources.SERVICES, Actions.DELETE);
    const onlyAdmin = onlyAdminPermission(user);

    // Get all Services
    const servicesQuery = useQuery({
        queryKey: ['services'],
        queryFn: () => api.get('/services').then(res => res.data),
        enabled: canView,
        staleTime: 1000 * 60 * 5,
        onError: (err) => {
            toast.error(err.message || 'Failed to fetch services');
        }
    });

    // Create Service
    const createService = useMutation({
        mutationFn: (data) => api.post('/services', data),
        enabled: canAdd,
        onSuccess: () => {
            queryClient.invalidateQueries(['services']);
            toast.success('Service created successfully');
            router.push('/admin/services')
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create service');
        }
    });

    // Update Service
    const updateService = useMutation({
        mutationFn: ({ id, data }) => api.put(`/services/${id}`, data),
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['services']);
            toast.success('Service updated successfully');
            router.push('/admin/services')
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update service');
        }
    });

    // Delete Service
    const deleteService = useMutation({
        mutationFn: (id) => api.delete(`/services/${id}`),
        enabled: canDelete,
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
        permissions: {
            canView,
            canAdd,
            canEdit,
            canDelete,
            onlyAdmin
        }
    };
};
