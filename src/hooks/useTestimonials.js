"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Actions, checkPermission, onlyAdminPermission, Resources } from '@/lib/permissions';

export const useTestimonials = ({ isVisible, page, pageSize }) => {
    const { data: session } = useSession();
    const user = session?.user;
    const queryClient = useQueryClient();

    // Permissions
    const canView = checkPermission(user, Resources.TESTIMONIALS, Actions.VIEW);
    const canAdd = checkPermission(user, Resources.TESTIMONIALS, Actions.ADD);
    const canEdit = checkPermission(user, Resources.TESTIMONIALS, Actions.EDIT);
    const canDelete = checkPermission(user, Resources.TESTIMONIALS, Actions.DELETE);
    const onlyAdmin = onlyAdminPermission(user);

    const buildQueryString = () => {
        const queryParams = [];

        if (isVisible !== 'all') queryParams.push(`isVisible=${isVisible === 'isVisible'}`);

        queryParams.push(`page=${page}`);
        queryParams.push(`limit=${pageSize}`);

        return queryParams.length ? `?${queryParams.join('&')}` : '';
    };

    const testimonialsQuery = useQuery({
        queryKey: ['testimonials', isVisible, page, pageSize],
        queryFn: async () => {
            if (!canView) {
                throw new Error('You do not have permission to view enquiries');
            }

            const queryString = buildQueryString();
            const response = await api.get(`/testimonials${queryString}`);
            return response;
        },
        enabled: canView, // Only run query if user has permission
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
        onError: (err) => {
            console.error('Testimonials fetch error:', err);
            toast.error(err.message || 'Failed to fetch testimonials');
        },
    });

    const createTestimonial = useMutation({
        mutationFn: ({ data }) => api.post('/testimonials', data),
        onSuccess: () => {
            queryClient.invalidateQueries(['testimonials']);
            toast.success('Testimonial created successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create Testimonial');
        }
    });

    const updateTestimonial = useMutation({
        mutationFn: ({ id, data }) => api.put(`/testimonials/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['testimonials']);
            toast.success('Testimonial updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update Testimonial');
        }
    });

    const patchTestimonial = useMutation({
        mutationFn: ({ id, isVisible: newVisible, priority: newPriority }) => {
            return api.patch(`/testimonials/${id}`, {
                id,
                ...(newVisible !== undefined ? { isVisible: newVisible } : {}),
                ...(newPriority !== undefined ? { priority: newPriority } : {}),
            });
        },
        enabled: canEdit,
        onSuccess: () => {
            queryClient.invalidateQueries(['testimonials']);
            toast.success('Testimonial updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update Testimonial');
        },
    });

    const deleteTestimonial = useMutation({
        mutationFn: (id) => {
            return api.delete(`/testimonials/${id}`);
        },
        enabled: canDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['testimonials']);
            toast.success('Testimonial deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete testimonial!');
        },
    });

    return {
        testimonialsQuery,
        createTestimonial,
        updateTestimonial,
        patchTestimonial,
        deleteTestimonial,
        permissions: {
            canView,
            canAdd,
            canEdit,
            canDelete,
            onlyAdmin
        }
    };
}
