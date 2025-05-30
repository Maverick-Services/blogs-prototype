export async function getHomePageData() {
    try {
        const [servicesRes, categoriesRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/services`, {
                next: { revalidate: 3600 } // Revalidate every hour
            }),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`, {
                next: { revalidate: 3600 }
            })
        ]);

        if (!servicesRes.ok || !categoriesRes.ok) {
            throw new Error('Failed to fetch data');
        }

        const services = await servicesRes.json();
        const categories = await categoriesRes.json();

        return { services, categories };
    } catch (error) {
        console.error('Error fetching data:', error);
        // Return empty data or fallback data
        return { services: [], categories: [] };
    }
}