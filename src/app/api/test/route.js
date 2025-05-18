import { connectDB } from '@/lib/mongodb';

export async function GET() {
    try {
        await connectDB();
        console.log("✅ MongoDB connected successfully.");
        return Response.json({ message: "MongoDB connected successfully." });
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to connect to MongoDB." }),
            { status: 500 }
        );
    }
}
