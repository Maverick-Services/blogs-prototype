import React from 'react'
import ServicesClient from './ServicesClient'    // ← New client wrapper

export default async function Page() {
    const [servicesRes, categoriesRes] = await Promise.all([
        fetch("https://blogs-prototype-khaki.vercel.app/api/services", { next: { revalidate: 300 } }),
        fetch("https://blogs-prototype-khaki.vercel.app/api/categories", { next: { revalidate: 300 } })
    ])
    const services = await servicesRes.json()
    const categories = await categoriesRes.json()

    console.log(services)
    console.log(categories)

    return <ServicesClient services={services.data} categories={categories.data} />
}
