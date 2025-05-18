import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

export const useTags = () => {
    const queryClient = useQueryClient();

    // Get all tags
    const tagsQuery = useQuery({
        queryKey: ['tags'],
        queryFn: () => api.get('/tags').then(res => res.data),
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        onError: (err) => {
            toast.error(err.message || 'Failed to fetch tags');
        }
    });

    // Create tag mutation
    const createTag = useMutation({
        mutationFn: (data) => api.post('/tags', data),
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
            toast.success('Tag created successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create tag');
        }
    });

    // Update tag mutation
    const updateTag = useMutation({
        mutationFn: ({ id, data }) => api.put(`/tags/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
            toast.success('Tag updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update tag');
        }
    });

    // Delete tag mutation
    const deleteTag = useMutation({
        mutationFn: (id) => api.delete(`/tags/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
            toast.success('Tag deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete tag');
        }
    });

    return {
        tagsQuery,
        createTag,
        updateTag,
        deleteTag,
    };
};
