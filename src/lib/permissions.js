// lib/permissions.js

// Define resources
export const Resources = {
    DASHBOARD: 'dashboard',
    ENQUIRIES: 'enquiries',
    SERVICES: 'services',
    BLOGS: 'blogs',
    CATEGORIES: 'categories',
    TAGS: 'tags',
    MEDIA: 'media',
    USERS: 'users',
    SETTINGS: 'settings',
    TESTIMONIALS: 'testimonials'
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
    return false;
}

export function onlyAdminPermission(user) {
    if (user?.role === 'admin') return true;
    return false;
}