import {
    FaHome,
    FaEnvelope,
    FaBriefcase,
    FaThLarge,
    FaFileAlt,
    FaTags,
    FaUsers,
    FaImages,
    FaCogs,
    FaUser,
    FaBlog,
    FaQuoteRight,
    FaPhoneAlt,
    FaCalendarCheck,
    FaClipboardList,
} from 'react-icons/fa';

import { Resources } from '../permissions';

export const ADMIN_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        href: '/admin',
        icon: <FaHome />,
    },
    {
        key: 'enquiries',
        label: 'Enquiries',
        href: '/admin/enquiries',
        icon: <FaEnvelope />,
    },
    {
        key: Resources.SERVICES,
        label: 'Services',
        href: '/admin/services',
        icon: <FaBriefcase />,
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
        icon: <FaThLarge />,
    },
    {
        key: Resources.TAGS,
        label: 'Tags',
        href: '/admin/tags',
        icon: <FaTags />,
    },
    {
        key: Resources.MEDIA,
        label: 'Media',
        href: '/admin/media',
        icon: <FaImages />,
    },
    {
        key: Resources.USERS,
        label: 'Users',
        href: '/admin/users',
        icon: <FaUser />,
    },
    {
        key: Resources.SETTINGS,
        label: 'Settings',
        href: '/admin/settings',
        icon: <FaCogs />,
    },
    {
        key: 'testimonials',
        label: 'Testimonials',
        href: '/admin/testimonials',
        icon: <FaQuoteRight />,
    },
    {
        key: 'call-plans',
        label: 'Call Plans',
        href: '/admin/call-plans',
        icon: <FaPhoneAlt />,
    },
    {
        key: 'call-bookings',
        label: 'Call Bookings',
        href: '/admin/call-bookings',
        icon: <FaCalendarCheck />,
    },
    {
        key: 'service-bookings',
        label: 'Service Bookings',
        href: '/admin/service-bookings',
        icon: <FaClipboardList />,
    },
];
