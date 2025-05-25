// lib/services.js
import Service from '@/models/serviceModel';
import { connectDB } from '../mongodb';

export async function getServiceBySlug(slug) {
    try {
        await connectDB();
        return await Service.findOne({ slug })
            .populate('categories')
            // .populate('tags')
            .lean();
    } catch (error) {
        console.error('Error fetching service:', error);
        return null;
    }
}

export async function getAllServicesSlugs() {
    try {
        await connectDB();
        return await Service.find({ status: true })
            .select('slug -_id')
            .lean();
    } catch (error) {
        console.error('Error fetching slugs:', error);
        return [];
    }
}