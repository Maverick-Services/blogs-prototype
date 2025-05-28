// hooks/useImages.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

export const useImages = () => {
    const queryClient = useQueryClient();

    const imagesQuery = useQuery({
        queryKey: ['images'],
        queryFn: () => api.get('/images'),
        staleTime: 5 * 60 * 1000,
        onError: (err) => toast.error(err.message || 'Failed to fetch images'),
    });

    const uploadImage = useMutation({
        mutationFn: (data) => api.post('/images', data),
        onSuccess: () => {
            queryClient.invalidateQueries(['images']);
            // imagesQuery.refetch();
            toast.success('Image uploaded');
        },
        onError: (err) => toast.error(err.message || 'Upload failed'),
    });

    const deleteImage = useMutation({
        mutationFn: ({ publicId }) => api.delete(`/images`, { data: { publicId }, }),
        onSuccess: () => {
            queryClient.invalidateQueries(['images']);
            toast.success('Image deleted');
        },
        onError: err => toast.error(err.message || 'Delete failed'),
    });

    return { imagesQuery, uploadImage, deleteImage };
};
