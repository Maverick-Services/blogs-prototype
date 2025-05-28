import { useSession } from 'next-auth/react';

export const usePermissions = () => {
    const { data: session } = useSession();

    const checkPermission = (section, action) => {
        if (!session) return false;
        if (session.user.role === 'admin') return true;
        return session.user.permissions?.get(section)?.[action] || false;
    };

    return {
        canView: (section) => checkPermission(section, 'view'),
        canAdd: (section) => checkPermission(section, 'add'),
        canEdit: (section) => checkPermission(section, 'edit'),
        canDelete: (section) => checkPermission(section, 'delete')
    };
};