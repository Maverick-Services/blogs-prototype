// app/orderSuccess/page.jsx
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { getCategories, getServices } from "@/lib/main/getHomePageData";
import { getOrderById } from "@/lib/main/getOrders";

export default async function page({ params }) {
    const { id } = await params;
    
    const servicesData = await getServices();
    const services = servicesData?.data || [];
    const categoriesData = await getCategories();
    const categories = categoriesData?.data || [];

    const order = await getOrderById(id)
    // console.log(order)

    return (
        <WebsiteLayout services={services} categories={categories}>
            <div className="max-w-4xl mx-auto px-4 py-8"></div>
        </WebsiteLayout>
    )
}