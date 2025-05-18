import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import React from 'react'

function page() {
    return (
        <div>
            <InnerDashboardLayout>
                <div className='w-full flex items-center justify-between'>
                    <h1 className='text-primary font-bold sm:text-2xl lg:text-4xl'>Users</h1>
                </div>
            </InnerDashboardLayout>
        </div>
    )
}

export default page
