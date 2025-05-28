import { getToken } from 'next-auth/jwt';

export function withAuth(handler, { roles = [], permission } = {}) {
    return async (req) => {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
        }
        if (roles.length && !roles.includes(token.role)) {
            return new Response(JSON.stringify({ error: 'Forbidden: wrong role' }), { status: 403 });
        }
        if (permission) {
            const perms = token.permissions?.[permission.resource] || {};
            if (!perms[permission.action]) {
                return new Response(JSON.stringify({ error: 'Permission denied' }), { status: 403 });
            }
        }
        return handler(req);
    };
}
