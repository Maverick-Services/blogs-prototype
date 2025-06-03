export async function getTestimonialsData() {
    try {
        const params = new URLSearchParams({
            isVisible: 'true',
            limit: '3',
            page: '1',
        });

        const testimonialsRes = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/testimonials?${params.toString()}`,
            { next: { revalidate: 3600 } }
        );

        if (!testimonialsRes.ok) {
            throw new Error('Failed to fetch testimonials data');
        }

        const testimonials = await testimonialsRes.json();

        return testimonials;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { testimonials: [] };
    }
}
