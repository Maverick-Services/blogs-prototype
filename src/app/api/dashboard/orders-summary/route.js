
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/orderModel'      // your Order mongoose model

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7', 10)

    await connectDB()

    // Calculate the cutoff date
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - days)

    // Aggregate counts per day and type
    const agg = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: cutoff }
            }
        },
        {
            $group: {
                _id: {
                    day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    type: '$type'
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id.day': 1 } },
        {
            $group: {
                _id: '$_id.day',
                byType: {
                    $push: { type: '$_id.type', count: '$count' }
                }
            }
        }
    ])

    // Build arrays for dates / serviceCounts / callCounts
    const dates = []
    const serviceCounts = []
    const callCounts = []
    for (const dayBucket of agg) {
        dates.push(dayBucket._id)
        // initialize
        let svc = 0, call = 0
        for (const { type, count } of dayBucket.byType) {
            if (type === 'service') svc = count
            if (type === 'call') call = count
        }
        serviceCounts.push(svc)
        callCounts.push(call)
    }

    return new Response(
        JSON.stringify({ dates, serviceCounts, callCounts }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
}
