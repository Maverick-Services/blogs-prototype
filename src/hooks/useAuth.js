'use client';
import { useSession } from 'next-auth/react';

export function useAuth() {
    const { data: session, status } = useSession();
    const user = session?.user || null;

    function can(resource, action) {
        return !!(user?.permissions?.[resource]?.[action]);
    }

    return { user, status, can };
}
