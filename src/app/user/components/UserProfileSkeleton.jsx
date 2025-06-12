import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function UserProfileSkeleton() {
    return (
        <div className="flex flex-col items-center p-4 gap-4">
            {/* Circular avatar skeleton */}
            <Skeleton className="h-24 w-24 rounded-full" />

            {/* Text detail skeletons */}
            <div className="w-full space-y-2">
                <Skeleton className="h-5 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-5/6 mx-auto" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
        </div>

    )
}

export default UserProfileSkeleton