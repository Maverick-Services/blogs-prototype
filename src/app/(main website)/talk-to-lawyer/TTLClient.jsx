"use client"
import WebsiteLayout from '@/components/website/WebsiteLayout';
import React, { useState } from 'react';

export default function TTLClient({ services, categories }) {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        query: ''
    });
    const [activeTab, setActiveTab] = useState('taxation');

    const plans = [
        {
            id: 1,
            name: 'Basic Consultation',
            price: 499,
            duration: '60 minutes',
            features: ['General legal advice', 'Phone consultation', 'Basic document review']
        },
        {
            id: 2,
            name: 'Tax Guidance',
            price: 999,
            duration: '2 hours',
            features: ['Tax filing assistance', 'Deduction optimization', 'Compliance review']
        },
        {
            id: 3,
            name: 'Business Advisory',
            price: 2499,
            duration: '4 hours',
            features: ['Business registration', 'Contract review', 'Compliance strategy']
        },
        {
            id: 4,
            name: 'Comprehensive Support',
            price: 4999,
            duration: '8 hours',
            features: ['Priority access', 'Document drafting', 'Week-long support']
        },
        {
            id: 5,
            name: 'Enterprise Solution',
            price: 9999,
            duration: '16 hours',
            features: ['Dedicated expert', '24/7 availability', 'Full legal support']
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Booking submitted! Our team will contact you shortly. Selected plan: ₹${plans.find(p => p.id === selectedPlan).price}`);
        // Razorpay integration would go here
    };

    return (
        <WebsiteLayout services={services} categories={categories}>
            <div className="min-h-screen bg-gradient-to-b from-[#f0f7ff] to-[#e6f2ff]">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#003366] to-[#004080] opacity-95 z-0"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="text-white">
                                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                    <span className="block">Pick the slot to get</span>
                                    <span className="text-[#FFD700] block mt-2">Expert Solution</span>
                                </h1>
                                <p className="text-xl mb-8 max-w-2xl text-blue-100">
                                    Let's talk about your legal needs — whether it's launching your startup,
                                    registering your business, or handling compliance. Our experts are just
                                    a call away to guide you in the right direction.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-[#FFD700] hover:bg-[#FFC000] text-[#003366] font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl">
                                        Book Consultation
                                    </button>
                                    <button className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 font-bold py-3 px-8 rounded-lg transition-all">
                                        View Plans
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md">
                                        <div className="flex items-center mb-6">
                                            <div className="bg-[#003366] text-white p-3 rounded-lg mr-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#003366]">Secure & Confidential</h3>
                                        </div>
                                        <ul className="space-y-4">
                                            <li className="flex items-start">
                                                <svg className="h-6 w-6 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">100% secure payment processing</span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="h-6 w-6 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">Attorney-client privilege maintained</span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="h-6 w-6 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">GDPR compliant data handling</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expertise Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">Our Areas of Expertise</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Specialized guidance for your unique legal and financial challenges
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#003366] transition-transform hover:scale-105">
                            <div className="bg-[#003366] w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-[#003366] mb-4">Taxation Services</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Income Tax Planning</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>GST Compliance & Filing</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>International Taxation</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Tax Audit Representation</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#00897B] transition-transform hover:scale-105">
                            <div className="bg-[#00897B] w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-[#003366] mb-4">Chartered Accountancy</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Financial Auditing</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Business Valuation</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Corporate Finance</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Risk Management</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#D32F2F] transition-transform hover:scale-105">
                            <div className="bg-[#D32F2F] w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-[#003366] mb-4">Legal Services</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Corporate Law Advisory</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Contract Drafting & Review</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Regulatory Compliance</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Dispute Resolution</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Consultation Plans */}
                <div className="bg-[#003366] py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Consultation Plan</h2>
                            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                                Flexible options tailored to meet your specific legal and financial needs
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {plans.map(plan => (
                                <div
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`rounded-xl border-2 p-6 cursor-pointer transition-all duration-300 ${selectedPlan === plan.id ? 'border-[#FFD700] bg-white shadow-2xl' : 'border-white/30 bg-white/10 hover:border-white/60'}`}
                                >
                                    <h3 className={`text-xl font-bold mb-2 ${selectedPlan === plan.id ? 'text-[#003366]' : 'text-white'}`}>{plan.name}</h3>
                                    <div className="mb-4">
                                        <span className={`text-3xl font-bold ${selectedPlan === plan.id ? 'text-[#003366]' : 'text-[#FFD700]'}`}>₹{plan.price}</span>
                                        <span className={`${selectedPlan === plan.id ? 'text-gray-600' : 'text-blue-100'}`}> / {plan.duration}</span>
                                    </div>
                                    <ul className="space-y-2 mb-6">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg className="h-5 w-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke={selectedPlan === plan.id ? "#003366" : "#FFD700"}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className={`${selectedPlan === plan.id ? 'text-gray-700' : 'text-blue-100'}`}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className={`w-full py-2 px-4 rounded-lg font-medium ${selectedPlan === plan.id ? 'bg-[#003366] text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                                    >
                                        {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Booking Form */}
                    <div className="max-w-7xl mx-auto px-4 mt-10 sm:px-6 lg:px-8 pb-24">
                        <div className="bg-white shadow-2xl  rounded-md overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="bg-gradient-to-r from-[#003366] to-[#004080] p-8 text-white">
                                    <h2 className="text-3xl font-bold mb-6">Schedule Your Consultation</h2>
                                    <p className="mb-8 text-blue-100">Fill in your details and our expert will contact you at your preferred time.</p>

                                    <div className="space-y-6">
                                        <div className="flex items-center">
                                            <div className="bg-[#FFD700] text-[#003366] p-3 rounded-lg mr-4">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">24/7 Expert Support</h3>
                                                <p className="text-blue-100">We're always here to assist you</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="bg-[#FFD700] text-[#003366] p-3 rounded-lg mr-4">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">Instant Booking</h3>
                                                <p className="text-blue-100">Get connected within minutes</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="bg-[#FFD700] text-[#003366] p-3 rounded-lg mr-4">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">100% Confidential</h3>
                                                <p className="text-blue-100">Your information is secure with us</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                                    placeholder="Enter your phone number"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                                    placeholder="Enter your email address"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block text-gray-700 font-medium mb-2" htmlFor="query">
                                                Your Legal/Financial Query
                                            </label>
                                            <textarea
                                                id="query"
                                                name="query"
                                                value={formData.query}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                                placeholder="Briefly describe your legal or financial needs"
                                            ></textarea>
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex items-center">
                                                <input
                                                    id="terms"
                                                    name="terms"
                                                    type="checkbox"
                                                    className="h-4 w-4 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
                                                    required
                                                />
                                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                                    I agree to the <a href="#" className="text-[#003366] hover:underline">terms and conditions</a> and <a href="#" className="text-[#003366] hover:underline">privacy policy</a>
                                                </label>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!selectedPlan}
                                            className={`w-full py-4 px-4 rounded-lg font-bold text-white transition-all ${selectedPlan ? 'bg-[#003366] hover:bg-[#002244]' : 'bg-gray-400 cursor-not-allowed'}`}
                                        >
                                            {selectedPlan ? `Book Now - ₹${plans.find(p => p.id === selectedPlan).price}` : 'Please select a plan'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </WebsiteLayout>
    );
}