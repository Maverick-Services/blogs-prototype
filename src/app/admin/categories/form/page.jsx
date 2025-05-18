import React, { Suspense } from 'react'
import CategoryForm from './components/CategoryForm'

function page() {
    return (
        <div>
            <div className='flex justify-center w-full'>
                <Suspense fallback={<div>Loading form...</div>}>
                    <CategoryForm />
                </Suspense>
            </div>
        </div >
    )
}

export default page
