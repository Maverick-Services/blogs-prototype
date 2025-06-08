// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    const path = req.nextUrl.pathname;

    // Admin route protection
    if (path.startsWith('/admin')) {
        const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!session) {
            return NextResponse.redirect(new URL('/auth', req.url));
        }

        // Only allow admin/sub-admin roles
        if (!['admin', 'sub-admin'].includes(session.role)) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*']
}
