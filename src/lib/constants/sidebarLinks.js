
import {
    Home,
    MessageSquare,
    Briefcase,
    Grid,
    FileText,
    Tag,
    Users as UsersIcon,
    Images,
} from 'lucide-react';

export const ADMIN_SIDEBAR_LINKS = [
    // {
    //     key: 'dashboard',
    //     label: 'Dashboard',
    //     href: '/admin',
    //     icon: <Home />,
    // },
    // {
    //     key: 'enquiries',
    //     label: 'Enquiries',
    //     href: '/admin/enquiries',
    //     icon: <MessageSquare />,
    // },
    // {
    //     key: 'services',
    //     label: 'Services',
    //     href: '/admin/services',
    //     icon: <Briefcase />,
    // },
    {
        key: 'blogs',
        label: 'Blogs',
        href: '/admin/blogs',
        icon: <FileText />,
    },
    {
        key: 'categories',
        label: 'Categories',
        href: '/admin/categories',
        icon: <Grid />,
    },
    {
        key: 'tags',
        label: 'Tags',
        href: '/admin/tags',
        icon: <Tag />,
    },
    {
        key: 'media',
        label: 'Media',
        href: '/admin/media',
        icon: <Images />,
    },
];

