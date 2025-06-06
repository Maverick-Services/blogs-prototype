import clientPromise from "../mongodbClient";


export async function getTestimonialsData({ isVisible = true, limit = 3, page = 1 }) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const skip = (page - 1) * limit;

        const query = { isVisible };
        const [testimonials, total] = await Promise.all([
            db.collection("testimonials")
                .find(query)
                .sort({ updatedAt: -1 })
                .skip(skip)
                .limit(limit)
                .toArray(),
            db.collection("testimonials").countDocuments(query)
        ]);

        return {
            testimonials: JSON.parse(JSON.stringify(testimonials)),
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return { testimonials: [], total: 0, totalPages: 0, currentPage: page };
    }
}