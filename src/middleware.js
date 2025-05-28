// middleware.js
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    (req) => {
        const role = req.nextauth.token?.role
        if (
            req.nextUrl.pathname.startsWith('/admin') &&
            !['admin', 'sub-admin'].includes(role)
        ) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
)

export const config = {
    matcher: ['/admin/:path*']
}
