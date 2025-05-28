// lib/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        // Add authorization headers here if needed
    },
});

// Add request interceptor
api.interceptors.request.use(config => {
    // You can add auth tokens here
    return config;
});

// Add response interceptor
api.interceptors.response.use(
    response => response.data,
    error => {
        const message = error.response?.data?.error || error.message;
        return Promise.reject(new Error(message));
    }
);

export default api;