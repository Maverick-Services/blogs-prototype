import React from 'react'
import BlogsList from './components/BlogsList'
import NavBar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'

export default function page() {
    return (
        <div className='bg-gray-100'>
            <div className='sticky top-0 w-screen z-[100]'>
                <NavBar />
            </div>

            <BlogsList />

            <Footer />
        </div>
    )
}
