"use client"
import React from 'react'
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import BlogForm from '../components/blog form/BlogForm';

function page() {

    return (
        <InnerDashboardLayout>
            <h1>Create new blog</h1>

            <BlogForm />
        </InnerDashboardLayout>
    )
}

export default page