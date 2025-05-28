'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminRouteGuard({ children }) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'loading') return

        // not logged in OR simple user → kick to homepage
        if (!session || session.user.role === 'user') {
            router.replace('/')
        }
    }, [status, session, router])

    // while we’re checking → show spinner / nothing
    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg">Loading…</p>
            </div>
        )
    }

    // now we know: session && role is admin/sub-admin
    return <>{children}</>
}
