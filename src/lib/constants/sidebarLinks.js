
import {
    Home,
    MessageSquare,
    Briefcase,
    Grid,
    FileText,
    Tag,
    Users as UsersIcon,
    Images,
    ServerCog,
    User,
    Settings,
} from 'lucide-react';
import { Resources } from '../permissions';
import { FaBlog } from 'react-icons/fa';

export const ADMIN_SIDEBAR_LINKS = [
    {
        key: Resources.SERVICES,
        label: 'Services',
        href: '/admin/services',
        icon: <ServerCog />,
    },
    {
        key: Resources.BLOGS,
        label: 'Blogs',
        href: '/admin/blogs',
        icon: <FaBlog />,
    },
    {
        key: Resources.CATEGORIES,
        label: 'Categories',
        href: '/admin/categories',
        icon: <Grid />,
    },
    {
        key: Resources.TAGS,
        label: 'Tags',
        href: '/admin/tags',
        icon: <Tag />,
    },
    {
        key: Resources.MEDIA,
        label: 'Media',
        href: '/admin/media',
        icon: <Images />,
    },
    {
        key: Resources.USERS,
        label: "Users",
        href: "/admin/users",
        icon: <User />
    },
    {
        key: Resources.SETTINGS,
        label: "Settings",
        href: "/admin/settings",
        icon: <Settings />
    },
];





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