import * as z from "zod";

export const serviceSchema = z.object({
    name: z.string().min(2).max(50),
    slug: z.string().min(2).max(50),
    shortDescription: z.string().min(10).max(160),
    imageURL: z.string().url().regex(/\.(jpg|jpeg|png|webp|svg|gif)$/i),
    categories: z.array(z.string().min(1)).min(1),
    tags: z.array(z.string()).optional(),
    status: z.boolean(),
    featured: z.boolean(),
    pageHeading: z.string().min(2).max(100),
    serviceTypeDetails: z.array(z.string().min(1)).min(1).max(10),
    serviceBigDescription: z.array(
        z.object({
            name: z.string().min(1).max(20),
            title: z.string().min(1).max(50),
            content: z.string().min(1).max(500),
        })
    ).min(1)
});
