'use client'
import React, { useState } from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout'
import CategoriesBox from './CategoriesBox'
import ServicesBox from './ServicesBox'

export default function ServicesClient({ services, categories }) {
    // single source of truth for the UI
    const [selectedCategory, setSelectedCategory] = useState('all')

    // compute filtered list here and pass down
    const filteredServices = selectedCategory === 'all'
        ? services
        : services.filter(s => s.categories.includes(selectedCategory))

    return (
        <WebsiteLayout>
            <div className='bg-[#0a3460] max-w-7xl mx-auto rounded-2xl text-white h-28 flex items-center justify-center mt-3'>
                <h1 className='font-bold text-3xl md:text-4xl'>Our Services</h1>
            </div>

            <div className='flex flex-col lg:flex-row max-w-7xl mx-auto'>
                <CategoriesBox
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                <ServicesBox services={filteredServices} />
            </div>
        </WebsiteLayout>
    )
}
