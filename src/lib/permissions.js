// lib/permissions.js

// Define your resources
export const Resources = {
    MEDIA: 'media',
    SERVICES: 'services',
    CATEGORIES: 'categories',
    TAGS: 'tags',
    USERS: 'users',
    SETTINGS: 'settings',
    // add more resources as needed
};

// Define possible actions
export const Actions = {
    VIEW: 'view',
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
};

// Frontend helper to check permissions against session.user
export function checkPermission(user, resource, action) {
    if (!user) return false;
    if (user.role === 'admin') return true;
    if (user.role === 'sub-admin') {
        const perms = user.permissions?.[resource];
        return !!perms?.[action];
    }
    // regular 'user' role has no admin/sub-admin permissions
    return false;
}

// Server-side wrapper for App Router pages
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from './nextAuthOptions';

export function requirePermissionPage(resource, action) {
    return async function PageWrapper({ children }) {
        const session = await getServerSession(authOptions);
        if (
            !session ||
            session.user.role === 'user'
            // !session.user.permissions?.[resource]?.[action]
        ) {
            return redirect('/');
        }
        return children;
    };
}

// Server-side wrapper for API route handlers
export function requirePermissionApi(handler, { resource, action, roles = ['admin', 'sub-admin'] }) {
    return async (req, { params }) => {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
        }
        if (!roles.includes(session.user.role)) {
            return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
        }
        if (
            session.user.role !== 'admin' &&
            !session.user.permissions?.[resource]?.[action]
        ) {
            return new Response(JSON.stringify({ error: 'Permission denied' }), { status: 403 });
        }
        return handler(req, { params });
    };
}
