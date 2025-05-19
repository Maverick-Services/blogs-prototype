import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

export const useCategories = () => {
    const queryClient = useQueryClient();

    // Get all tags
    const categoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: () => api.get('/categories').then(res => res.data),
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        onError: (err) => {
            toast.error(err.message || 'Failed to fetch categories');
        }
    });

    // Create tag mutation
    const createCategory = useMutation({
        mutationFn: (data) => api.post('/categories', data),
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            toast.success('Category created successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to create category');
        }
    });

    // Update tag mutation
    const updateCategory = useMutation({
        mutationFn: ({ id, data }) => api.put(`/categories/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            toast.success('Category updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to update Category');
        }
    });

    // Delete tag mutation
    const deleteCategory = useMutation({
        mutationFn: (id) => api.delete(`/categories/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            toast.success('Category deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete Category');
        }
    });

    return {
        categoriesQuery, deleteCategory, updateCategory, createCategory
    };
};
