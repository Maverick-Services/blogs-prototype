import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const quickLinks = [
        { label: 'Home', href: '/' },
        // { label: 'About Us', href: '/about' },
        { label: 'Our Services', href: '/services' },
        { label: 'Why Choose Us', href: '/#why' },
        { label: 'Testimonials', href: '/#testimonials' },
        { label: 'Contact', href: '/contact-us' },
        { label: 'Blogs', href: '/blogs' },
    ];

    const policyLinks = [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms & Conditions', href: '/terms&conditions' },
        { label: 'Refund Policy', href: '/refund-policy' },
    ];


    const services = [
        'Startup Registration',
        'Trademark Services',
        'GST & Tax Filing',
        'PF & MSME Registration',
        'Legal Compliance',
        'DSC & Udyam Registration',
    ];

    const socialLinks = [
        { name: 'Facebook', icon: 'M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z' },
        { name: 'Twitter', icon: 'M22 5.924a8.008 8.008 0 0 1-2.357.646 4.11 4.11 0 0 0 1.804-2.27 8.169 8.169 0 0 1-2.606.996A4.096 4.096 0 0 0 15.847 4c-2.266 0-4.103 1.837-4.103 4.103 0 .322.036.635.106.935-3.41-.17-6.433-1.804-8.457-4.287a4.101 4.101 0 0 0-.554 2.062 4.1 4.1 0 0 0 1.825 3.415 4.09 4.09 0 0 1-1.859-.513v.052a4.104 4.104 0 0 0 3.292 4.023 4.099 4.099 0 0 1-1.853.07 4.11 4.11 0 0 0 3.833 2.85A8.261 8.261 0 0 1 2 18.282a11.587 11.587 0 0 0 6.29 1.84c7.547 0 11.673-6.252 11.673-11.673 0-.178-.004-.355-.012-.531A8.33 8.33 0 0 0 22 5.924z' },
        { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
        { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    ];

    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-[#002244] to-[#003366] text-white pt-16 pb-8 px-4">

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand & Contact */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <div className="p-2">
                                <div className="relative w-40 h-16">
                                    <Image
                                        src="/logo-white.png"
                                        alt="Legal Services Logo"
                                        layout="fill"
                                        objectFit="contain"
                                        className="filter brightness-0 invert"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <p className="text-gray-300 leading-relaxed max-w-xs">
                            Providing comprehensive legal solutions to help your business thrive in today's competitive environment.
                        </p> */}

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-[#0055aa] p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Our Office</h4>
                                    <p className="text-gray-300">123 Legal Street, New Delhi, India</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-[#0055aa] p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Email Us</h4>
                                    <p className="text-gray-300">contact@yourlegalfirm.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-[#0055aa] p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Call Us</h4>
                                    <p className="text-gray-300">+91 98765 43210</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-[#0055aa] inline-block">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href}>
                                        <p className="flex items-center gap-3 group text-gray-300 hover:text-white transition-colors">
                                            <span className="w-2 h-2 rounded-full bg-[#0055aa]"></span>
                                            <span className="group-hover:underline group-hover:underline-offset-4">{link.label}</span>
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* legal */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-[#0055aa] inline-block">Policies</h3>
                        <ul className="space-y-3">
                            {policyLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href}>
                                        <p className="flex items-center gap-3 group text-gray-300 hover:text-white transition-colors">
                                            <span className="w-2 h-2 rounded-full bg-[#0055aa]"></span>
                                            <span className="group-hover:underline group-hover:underline-offset-4">{link.label}</span>
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    {/* <div>
                        <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-[#0055aa] inline-block">Our Services</h3>
                        <ul className="space-y-3">
                            {services.map((svc, i) => (
                                <li key={i} className="flex items-center gap-3 group">
                                    <span className="w-2 h-2 rounded-full bg-[#0055aa]"></span>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{svc}</span>
                                </li>
                            ))}
                        </ul>
                    </div> */}

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold mb-3 pb-2 border-b-2 border-[#0055aa] inline-block">Best Services</h3>
                        <p className="text-gray-300 mb-3">
                            Offering expert tax and GST solutions to help your business stay compliant and grow with confidence. Subscribe to our newsletter for the latest tax tips, compliance updates, and financial insights.
                        </p>

                        {/* <form className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 rounded-lg bg-[#001a33] border border-[#0055aa] focus:outline-none focus:ring-2 focus:ring-[#0055aa] text-white placeholder-gray-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#0055aa] to-[#0077cc] hover:from-[#0077cc] hover:to-[#0055aa] text-white font-medium py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
                            >
                                Subscribe Now
                            </button>
                        </form> */}

                        <div className="mt-8">
                            <h4 className="font-semibold mb-4">Follow Us</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="bg-[#0055aa] hover:bg-[#0077cc] p-3 rounded-full transition-all"
                                        aria-label={social.name}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                                            <path fill="currentColor" d={social.icon} />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                {/* Bottom section */}
                <div className="border-t border-[#0055aa] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-300 text-sm">
                        © {new Date().getFullYear()} CA Vakeel. All rights reserved.
                    </div>

                    <div className="text-sm text-gray-400">
                        Developed by{" "}
                        <a
                            href="https://matchbestsoftware.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white text-[#E7F7FF] transition-colors font-semibold no-underline"
                        >
                            Matchbest Software
                        </a>
                    </div>
                </div>


            </div>

            {/* Decorative bottom wave */}
            <div className="absolute bottom-0 left-0 w-full h-12 overflow-hidden">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="absolute bottom-0 left-0 w-full h-full fill-[#001a33] opacity-20"
                >
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>
        </footer>
    );
}