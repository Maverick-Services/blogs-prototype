import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Actions, checkPermission, Resources } from '@/lib/permissions';

export const useTags = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const queryClient = useQueryClient();

    // Permissions
    const canView = checkPermission(user, Resources.TAGS, Actions.VIEW);
    const canAdd = checkPermission(user, Resources.TAGS, Actions.ADD);
    const canEdit = checkPermission(user, Resources.TAGS, Actions.EDIT);
    const canDelete = checkPermission(user, Resources.TAGS, Actions.DELETE);

    // Get all tags
    const tagsQuery = useQuery({
        queryKey: ['tags'],
        enabled: canView,
        queryFn: () => api.get('/tags').then(res => res.data),
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        onError: (err) => {
            toast.error(err.message || 'Failed to fetch tags');
        }
    });

    // Create tag mutation
    const createTag = useMutation({
        mutationFn: (data) => api.post('/tags', data),
        enabled: canAdd,
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
        enabled: canEdit,
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
        enabled: canDelete,
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
        permissions: {
            canView,
            canAdd,
            canEdit,
            canDelete,
        }
    };
};
