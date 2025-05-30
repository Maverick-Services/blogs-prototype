"use client"
import React from 'react'
import Footer from '@/components/website/common/Footer'
import NavBar from '@/components/website/common/Navbar'

export default function WebsiteLayout({ services, categories, children }) {

    return (
        <div className='bg-gray-100'>
            <div className=''>
                <NavBar services={services} categories={categories} />
            </div>

            <div className='min-h-screen'>
                {children}
            </div>

            <Footer />
        </div>
    )
}
