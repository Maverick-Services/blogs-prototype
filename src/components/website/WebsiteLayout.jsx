import Footer from '@/components/website/common/Footer'
import NavBar from '@/components/website/common/Navbar'
import React from 'react'

export default function WebsiteLayout({ children }) {
    return (
        <div className='bg-gray-100'>
            <div className=''>
                <NavBar />
            </div>

            <div className='min-h-screen'>
                {children}
            </div>
            <Footer />
        </div>
    )
}
