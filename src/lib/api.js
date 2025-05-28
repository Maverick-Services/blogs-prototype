// lib/api.js
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token
api.interceptors.request.use(async (config) => {
    try {
        const session = await getSession()
        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`
        }
    } catch (error) {
        console.error('Error getting session:', error)
    }
    return config
})

// Response interceptor - Handle auth errors
api.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const message = error.response?.data?.error || error.message

        // Handle authentication errors
        if (error.response?.status === 401) {
            // Token expired or invalid - sign out user
            await signOut({ redirect: false })
            window.location.href = '/'
            return Promise.reject(new Error('Session expired. Please login again.'))
        }

        // Handle permission errors
        if (error.response?.status === 403) {
            return Promise.reject(new Error('You don\'t have permission to perform this action.'))
        }

        return Promise.reject(new Error(message))
    }
)

export default api;

// Helper function for permission-based API calls
export const apiWithPermission = {
    get: (url, resource, action) => {
        return api.get(url, {
            headers: {
                'X-Required-Permission': `${resource}:${action}`
            }
        })
    },

    post: (url, data, resource, action) => {
        return api.post(url, data, {
            headers: {
                'X-Required-Permission': `${resource}:${action}`
            }
        })
    },

    put: (url, data, resource, action) => {
        return api.put(url, data, {
            headers: {
                'X-Required-Permission': `${resource}:${action}`
            }
        })
    },

    delete: (url, resource, action) => {
        return api.delete(url, {
            headers: {
                'X-Required-Permission': `${resource}:${action}`
            }
        })
    }
}