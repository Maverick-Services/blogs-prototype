'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'
import BigNav from './BigNav'
import MobileNav from './MobileNav'
import LoginButton from '@/components/auth/LoginButton'

export default function NavBar({ services, categories }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <nav className={`w-full fixed z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-2'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-white p-1 rounded-lg">
                                <Image
                                    alt="logo"
                                    src="/logo.png"
                                    height={1000}
                                    width={1000}
                                    className="h-12 w-auto"
                                />
                            </div>
                        </Link>

                        {/* Big Navigation (Desktop) */}
                        <BigNav services={services} categories={categories} />

                        {/* Mobile Hamburger */}
                        <div className="xl:hidden flex items-center space-x-3">
                            <LoginButton className="px-3 py-1.5 rounded-lg hover:bg-gray-100" />
                            <button
                                className="text-gray-700 hover:text-gray-900"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open menu"
                            >
                                <FiMenu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <MobileNav
                services={services}
                categories={categories}
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
            />
        </>
    )
}