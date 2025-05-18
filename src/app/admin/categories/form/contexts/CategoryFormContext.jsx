
'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

const CategoryFormContext = createContext();

export function CategoryFormContextProvider({ children }) {
    const router = useRouter();
    const [creating, setCreating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    // helper for JSON API calls using Axios
    const callApiJson = async (url, method, payload) => {
        try {
            const response = await axios({
                url,
                method,
                headers: { 'Content-Type': 'application/json' },
                data: payload,
            });
            return response.data;
        } catch (err) {
            throw new Error(err.response?.data?.error || err.message);
        }
    };

    const handleCreate = async (data, imageUrl) => {
        setError(null);
        setCreating(true);
        try {
            await callApiJson('/api/categories', 'post', { data, imageUrl });
            router.push('/admin/categories');
        } catch (e) {
            setError(e.message);
        }
        setCreating(false);
    };

    const handleUpdate = async (id, data, imageUrl) => {
        setError(null);
        setCreating(true);
        try {
            await callApiJson(`/api/categories/${id}`, 'put', { data, imageUrl });
            router.push('/admin/categories');
        } catch (e) {
            setError(e.message);
        }
        setCreating(false);
    };

    const handleDelete = async (id) => {
        setError(null);
        setDeleting(true);
        try {
            await axios.delete(`/api/categories/${id}`);
            router.push('/admin/categories');
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        }
        setDeleting(false);
    };

    return (
        <CategoryFormContext.Provider
            value={{ creating, deleting, error, handleCreate, handleUpdate, handleDelete }}>
            {children}
        </CategoryFormContext.Provider>
    );
}

export const useCategoryFormContext = () => useContext(CategoryFormContext);



// 'use client';
// // import { createNewCategory, deleteCategory, getCategory, updateCategory } from '@/lib/firebase/blogs/blogCategories';
// import { useRouter } from 'next/navigation';
// import { createContext, useContext, useState } from 'react';

// const CategoryFormContext = createContext();

// export function CategoryFormContextProvider({ children }) {
//     const router = useRouter();
//     const [creating, setCreating] = useState(false);
//     const [deleting, setDeleting] = useState(false);
//     const [error, setError] = useState(null);

//     const handleCreate = async (data, image) => {
//         setError(null);
//         setCreating(true);
//         try {
//             //   await createNewCategory({ data, image });
//             router.push('/admin/categories');
//         } catch (err) {
//             setError(err.message);
//         }
//         setCreating(false);
//     };

//     const handleUpdate = async (id, data, image) => {
//         setError(null);
//         setCreating(true);
//         try {
//             //   await updateCategory({ id, data, image });
//             router.push('/admin/categories');
//         } catch (err) {
//             setError(err.message);
//         }
//         setCreating(false);
//     };

//     const handleDelete = async (id) => {
//         setError(null);
//         setDeleting(true);
//         try {
//             //   await deleteCategory(id);
//             router.push('/admin/categories');
//         } catch (err) {
//             setError(err.message);
//         }
//         setDeleting(false);
//     };

//     return (
//         <CategoryFormContext.Provider value={{ creating, deleting, error, handleCreate, handleUpdate, handleDelete }}>
//             {children}
//         </CategoryFormContext.Provider>
//     );
// }
// export const useCategoryFormContext = () => useContext(CategoryFormContext);