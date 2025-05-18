import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import React from 'react'

function page() {
    return (
        <InnerDashboardLayout >
            <div className='w-full flex overflow-y-auto'>
                <h1 className='text-primary font-bold sm:text-2xl lg:text-4xl'>Dashboard</h1>
            </div>
        </InnerDashboardLayout>
    )
}

export default page
