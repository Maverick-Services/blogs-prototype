import React from 'react'
import ServicesClient from './ServicesClient'    // ← New client wrapper

export default async function Page() {
    const [servicesRes, categoriesRes] = await Promise.all([
        fetch("http://localhost:3000/api/services", { next: { revalidate: 300 } }),
        fetch("http://localhost:3000/api/categories", { next: { revalidate: 300 } })
    ])
    const services = await servicesRes.json()
    const categories = await categoriesRes.json()

    console.log(services)
    console.log(categories)

    return <ServicesClient services={services?.data} categories={categories?.data} />
}
