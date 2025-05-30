// lib/services.js

const API_BASE = process.env.NEXT_PUBLIC_SITE_URL;

export async function getServiceBySlug(slug) {
    try {
        const res = await fetch(
            `${API_BASE}/api/services/bySlug/${slug}`,
            { next: { revalidate: 300 }, }
        );

        if (!res.ok) {
            console.error(`Failed to fetch service ${slug}: ${res.status}`);
            return null;
        }

        const service = await res.json();
        return service;
    } catch (error) {
        console.error(`Error fetching service ${slug}:`, error);
        return null;
    }
}
export async function getAllServicesSlugs() {
    try {
        const res = await fetch(`${API_BASE}/api/services/`, {
            next: { revalidate: 300 },
        }
        );

        if (!res.ok) {
            console.error(`Failed to fetch services ${res.status}`);
            return null;
        }
        const services = await res.json();
        return services;

    } catch (error) {
        console.error('Error fetching slugs:', error);
        return [];
    }
}