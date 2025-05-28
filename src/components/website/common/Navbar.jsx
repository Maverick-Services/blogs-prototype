'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import LoginButton from '@/components/auth/LoginButton'

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    const menuItems = [
        { label: 'Startup', href: '/startup', hasDropdown: true },
        { label: 'Registrations', href: '/registrations', hasDropdown: true },
        { label: 'Trademark', href: '/trademark', hasDropdown: true },
        { label: 'Tax & Compliance', href: '/tax-compliance', hasDropdown: true },
        { label: 'Services', href: '/services', hasDropdown: false },
        { label: 'Blogs', href: '/blogs', hasDropdown: false },
    ]

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex items-center justify-between gap-4 h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img src="/logo.png" alt="Lawyers" className="h-8 min-w-[2rem] w-auto" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-gray-700 hover:text-gray-900 flex items-center"
                            >
                                {item.label}
                                {item.hasDropdown && <span className="ml-1 text-xs">▼</span>}
                            </Link>
                        ))}

                        {/* <Link
                            href="/login"
                            className="lg:ml-4 bg-accent text-white px-4 py-1 rounded-full hover:opacity-80 transition"
                        >
                            Login
                        </Link> */}
                        <LoginButton />
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-gray-700 hover:text-gray-900"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                                {item.hasDropdown && <span className="ml-1 text-xs">▼</span>}
                            </Link>
                        ))}

                        {/* <Link
                            href="/login"
                            className="block mt-2 px-4 py-2 text-center bg-accent text-white rounded-md hover:bg-red-700 transition"
                            onClick={() => setMobileOpen(false)}
                        >
                            Login
                        </Link> */}
                        <LoginButton />
                    </div>
                </div>
            )}
        </nav>
    )
}
