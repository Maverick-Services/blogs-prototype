import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    const quickLinks = [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Our Services', href: '/services' },
        { label: 'Why Choose Us', href: '/#why' },
        { label: 'Testimonials', href: '/#testimonials' },
        { label: 'Contact', href: '/#contact' },
    ]

    const services = [
        'Startup Registration',
        'Trademark Services',
        'GST & Tax Filing',
        'PF & MSME Registration',
        'Legal Compliance',
        'DSC & Udyam Registration',
    ]

    return (
        <footer className="bg-primary text-white py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand & Contact */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center w-2/3">
                        <Image src="/logo-white.png" alt="Logo" width={200} height={200} className='w-full' />
                    </div>

                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                            <span role="img" aria-label="pin">📍</span>
                            <span>123 Legal Street, New Delhi, India</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span role="img" aria-label="email">✉️</span>
                            <span>contact@yourlegalfirm.com</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span role="img" aria-label="phone">☎️</span>
                            <span>+91 98765 43210</span>
                        </li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        {quickLinks.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className="hover:underline">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Services</h4>
                    <ul className="space-y-2 text-sm">
                        {services.map((svc, i) => (
                            <li key={i}>{svc}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-12 text-center text-gray-300 text-sm">
                © {new Date().getFullYear()} Lawyers Legal Services. All rights reserved.
            </div>
        </footer>
    )
}
