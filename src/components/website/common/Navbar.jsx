'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX, FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi'
import LoginButton from '@/components/auth/LoginButton'

export default function NavBar({ services, categories }) {
    // default to empty arrays if not provided
    const svcList = Array.isArray(services) ? services : []
    const catList = Array.isArray(categories) ? categories : []

    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const [scrolled, setScrolled] = useState(false)
    const primaryColor = "#003366"

    // Take first 4 categories (or empty if none)
    const topCategories = catList.slice(0, 5)

    // Helper to get up to 4 services per category
    const getServicesFor = (catId) =>
        svcList.filter((s) => Array.isArray(s.categories) && s.categories.includes(catId)).slice(0, 4)

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (mobileOpen && !e.target.closest('#mobile-menu')) {
                setMobileOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [mobileOpen])

    return (
        <nav className={`w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-0' : 'bg-white py-2'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-white p-1 rounded-lg">
                            <Image
                                alt="logo"
                                src="/logo.png"
                                height={300}
                                width={300}
                                className="h-12 w-auto"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Only show categories menu if we have categories */}
                        {topCategories.length > 0 && (
                            <div className="flex space-x-1">
                                {topCategories.map((cat) => (
                                    <div
                                        key={cat._id}
                                        className="relative group"
                                        onMouseEnter={() => setActiveDropdown(cat._id)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <button
                                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeDropdown === cat._id
                                                ? `text-white bg-[${primaryColor}]`
                                                : `text-gray-700 hover:text-white hover:bg-[${primaryColor}]`
                                                }`}
                                        >
                                            <span className="font-medium">{cat.name}</span>
                                            {activeDropdown === cat._id ? (
                                                <FiChevronUp className="ml-1" size={16} />
                                            ) : (
                                                <FiChevronDown className="ml-1" size={16} />
                                            )}
                                        </button>

                                        {/* Desktop Dropdown */}
                                        {activeDropdown === cat._id && (
                                            <div
                                                className="absolute left-0 mt-1 w-[550px] rounded-xl shadow-xl bg-white border border-gray-100 overflow-hidden z-50 animate-fadeIn"
                                                onMouseEnter={() => setActiveDropdown(cat._id)}
                                                onMouseLeave={() => setActiveDropdown(null)}
                                            >
                                                <div className="grid grid-cols-[40%_60%]">
                                                    {/* Category Card */}
                                                    <div className="p-6 bg-gradient-to-br from-[#003366]/5 to-white border-r border-gray-100">
                                                        <div className="flex flex-col items-center">
                                                            <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                                                                <Image
                                                                    src={cat.imageURL}
                                                                    alt={cat.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 to-transparent" />
                                                                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                                                                    {cat.name}
                                                                </h3>
                                                            </div>

                                                            <Link
                                                                href="/services"
                                                                className="w-full flex items-center justify-center bg-[#003366] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#002244] transition-colors"
                                                            >
                                                                View all services
                                                                <FiArrowRight className="ml-2" />
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    {/* Services List */}
                                                    <div className="p-6">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                                                Popular Services
                                                            </h4>
                                                            <span className="text-xs bg-[#003366]/10 text-[#003366] px-2 py-1 rounded-full">
                                                                {getServicesFor(cat._id).length} services
                                                            </span>
                                                        </div>

                                                        <ul className="space-y-3">
                                                            {getServicesFor(cat._id).length > 0 ? (
                                                                getServicesFor(cat._id).map((svc) => (
                                                                    <li key={svc._id} className="group">
                                                                        <Link
                                                                            href={`/services/${svc.slug}`}
                                                                            className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100"
                                                                        >
                                                                            <div className="flex-1">
                                                                                <div className="font-medium text-gray-800 group-hover:text-[#003366]">
                                                                                    {svc.name}
                                                                                </div>
                                                                            </div>
                                                                            <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                <FiArrowRight className="text-[#003366]" />
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                            ) : (
                                                                <li className="p-3 text-center text-sm italic text-gray-500 bg-gray-50 rounded-lg">
                                                                    No services available in this category
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <Link
                                    href="/services"
                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-white hover:bg-[#003366] rounded-lg transition-colors duration-200"
                                >
                                    All Services
                                </Link>

                                {/* Static Blogs Link */}
                                <Link
                                    href="/blogs"
                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-white hover:bg-[#003366] rounded-lg transition-colors duration-200"
                                >
                                    Blogs
                                </Link>
                            </div>
                        )}

                        <div className="ml-4 flex items-center space-x-3">
                            <LoginButton className="px-4 py-2 rounded-lg hover:bg-gray-100" />
                            <Link href="/contact-us">
                                <button className="bg-[#003366] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#002244] transition-colors flex items-center">
                                    Contact Us
                                    <FiArrowRight className="ml-2" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-gray-700 hover:text-gray-900"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <FiX size={24} className="text-[#003366]" /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && topCategories.length > 0 && (
                <div
                    id="mobile-menu"
                    className="md:hidden inset-0 bg-white z-40 transform transition-transform duration-300 translate-x-0"
                >
                    <div className="flex flex-col h-full pt-4 pb-8">
                        <div className="flex-1 overflow-y-auto px-4 space-y-1">
                            {topCategories.map((cat) => (
                                <div key={cat._id} className="border-b border-gray-100 py-2">
                                    <button
                                        className="flex items-center justify-between w-full py-3 px-2 text-gray-800 font-medium"
                                        onClick={() =>
                                            setActiveDropdown(activeDropdown === cat._id ? null : cat._id)
                                        }
                                    >
                                        <span>{cat.name}</span>
                                        {activeDropdown === cat._id ? (
                                            <FiChevronUp className="text-[#003366]" />
                                        ) : (
                                            <FiChevronDown />
                                        )}
                                    </button>

                                    {activeDropdown === cat._id && (
                                        <div className="pl-4 py-2 space-y-2 bg-gray-50 rounded-lg mb-3">
                                            <div className="p-3 bg-white rounded-lg shadow-sm mb-2">
                                                <div className="flex items-center mb-2">
                                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                                                    <div className="ml-3">
                                                        <Link
                                                            href={`/services/${cat.slug}`}
                                                            className="font-medium text-[#003366] hover:underline"
                                                            onClick={() => setMobileOpen(false)}
                                                        >
                                                            View all services
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-600">
                                                    Comprehensive solutions for all your legal needs
                                                </p>
                                            </div>

                                            <h4 className="text-xs font-semibold text-gray-500 px-3">Services:</h4>
                                            <ul className="space-y-1">
                                                {getServicesFor(cat._id).length > 0 ? (
                                                    getServicesFor(cat._id).map((svc) => (
                                                        <li key={svc._id}>
                                                            <Link
                                                                href={`/services/${svc.slug}`}
                                                                className="block py-2 px-3 rounded hover:bg-gray-100 transition-colors"
                                                                onClick={() => setMobileOpen(false)}
                                                            >
                                                                <div className="font-medium text-gray-800">{svc.name}</div>
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                    Professional service with guidance
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="px-3 py-2 text-sm italic text-gray-500">
                                                        No services available
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="px-4 pt-4 border-t border-gray-200">
                            <div className="flex space-x-3">
                                <LoginButton className="flex-1" />
                                <button className="flex-1 bg-[#003366] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#002244]">
                                    Contact Us
                                </button>
                            </div>
                            <div className="mt-4 text-center text-xs text-gray-500">
                                © {new Date().getFullYear()} LegalConnect. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
