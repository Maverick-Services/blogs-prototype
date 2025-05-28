// hooks/useImages.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Actions, checkPermission, Resources } from '@/lib/permissions';

export const useImages = () => {
    const { data: session } = useSession();
    const user = session?.user
    const queryClient = useQueryClient();

    // Check permissions
    const canView = checkPermission(user, Resources.MEDIA, Actions.VIEW)
    const canAdd = checkPermission(user, Resources.MEDIA, Actions.ADD)
    const canDelete = checkPermission(user, Resources.MEDIA, Actions.DELETE)

    const imagesQuery = useQuery({
        queryKey: ['images'],
        queryFn: () => api.get('/images'),
        enabled: canView,
        staleTime: 5 * 60 * 1000,
        onError: (err) => toast.error(err.message || 'Failed to fetch images'),
    });

    const uploadImage = useMutation({
        mutationFn: (data) => api.post('/images', data),
        enabled: canAdd,
        onSuccess: () => {
            queryClient.invalidateQueries(['images']);
            imagesQuery.refetch();
            toast.success('Image uploaded');
        },
        onError: (err) => toast.error(err.message || 'Upload failed'),
    });

    const deleteImage = useMutation({
        mutationFn: ({ publicId }) => {
            if (!canDelete) {
                throw new Error('You don\'t have permission to delete images')
            }
            return api.delete('/images', { data: { publicId } })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['images']);
            toast.success('Image deleted');
        },
        onError: err => toast.error(err.message || 'Delete failed'),
    });

    return {
        imagesQuery,
        uploadImage,
        deleteImage,
        permissions: {
            canView,
            canAdd,
            canDelete
        }
    };
};
