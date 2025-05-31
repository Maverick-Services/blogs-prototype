'use client'
import React, { useState } from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout'
import CategoriesBox from './CategoriesBox'
import ServicesBox from './ServicesBox'
import TalkToLawyerCard from '@/components/website/TalkToLawyerCard'

export default function ServicesClient({ services, categories }) {

    const [selectedCategory, setSelectedCategory] = useState('all')
    const filteredServices = selectedCategory === 'all'
        ? services.data
        : services.data.filter(s => s.categories.includes(selectedCategory))

    return (
        <WebsiteLayout services={services} categories={categories}>
            <div className='px-3'>
                <div className='bg-[#0a3460] max-w-7xl rounded-2xl mx-auto text-white h-28 flex items-center justify-center mt-5 mb-5'>
                    <h1 className='font-bold text-3xl md:text-4xl'>Our Services</h1>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 px-5 max-w-7xl mx-auto items-start gap-5'>
                    <div className='flex flex-col gap-4 w-full'>

                        <CategoriesBox
                            categories={categories.data}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />

                        <TalkToLawyerCard />
                    </div>
                    <div className='col-span-1 sm:col-span-2 lg:col-span-3'>
                        <ServicesBox services={filteredServices} />
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    )
}
