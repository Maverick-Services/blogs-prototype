// lib/services.js

import clientPromise from "../mongodbClient";


export async function getServiceBySlug(slug) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const service = await db.collection("services").findOne({ slug });

        return service ? JSON.parse(JSON.stringify(service)) : null;
    } catch (error) {
        console.error(`Error fetching service ${slug}:`, error);
        return null;
    }
}


// export async function getAllServicesSlugs() {
//     try {
//         const res = await fetch(`${API_BASE}/api/services/`, {
//             next: { revalidate: 300 },
//         }
//         );

//         if (!res.ok) {
//             console.error(`Failed to fetch services ${res.status}`);
//             return null;
//         }
//         const services = await res.json();
//         return services;

//     } catch (error) {
//         console.error('Error fetching slugs:', error);
//         return [];
//     }
// }