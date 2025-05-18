import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export const useTags = () => {
    const queryClient = useQueryClient();

    // Get all tags
    const tagsQuery = useQuery({
        queryKey: ['tags'],
        queryFn: () => api.get('/tags').then(res => res.data),
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });

    // Create tag mutation
    const createTag = useMutation({
        mutationFn: (data) => api.post('/tags', data),
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
        },
    });

    // Update tag mutation
    const updateTag = useMutation({
        mutationFn: ({ id, data }) => api.put(`/tags/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
        },
    });

    // Delete tag mutation
    const deleteTag = useMutation({
        mutationFn: (id) => api.delete(`/tags/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
        },
    });

    return {
        tagsQuery,
        createTag,
        updateTag,
        deleteTag,
    };
};