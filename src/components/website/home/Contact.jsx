import React from 'react';
import { ContactForm } from '../common/ContactForm';

export default function Contact() {
    return (
        <section className="bg-[#F1F3F5] py-16 px-4">
            <div className="w-11/12 sm:max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10">

                {/* Left: Info */}
                <div className="md:w-1/2">
                    <h5 className="italic text-lg text-gray-700">Let’s Talk</h5>
                    <h2 className="mt-1 text-3xl font-bold text-[#00564F]">Experts</h2>

                    <div className="mt-8 pl-4 border-l-2 border-[#00564F] space-y-8 text-gray-800">
                        <div>
                            <p className="font-semibold flex items-center gap-2">
                                <span role="img" aria-label="pin">📍</span>
                                Address:
                            </p>
                            <p className="ml-6">123 Legal Street, New Delhi, India – 110001</p>
                        </div>
                        <div>
                            <p className="font-semibold flex items-center gap-2">
                                <span role="img" aria-label="phone">☎️</span>
                                Phone:
                            </p>
                            <p className="ml-6">+91 98765 43210</p>
                        </div>
                        <div>
                            <p className="font-semibold flex items-center gap-2">
                                <span role="img" aria-label="phone">✉️</span>
                                Email:
                            </p>
                            <p className="ml-6">+91 98765 43210</p>
                        </div>
                        <div>
                            <p className="font-semibold flex items-center gap-2">
                                <span role="img" aria-label="clock">⏱️</span>
                                Working Hours:
                            </p>
                            <p className="ml-6">Mon – Sat | 10:00 AM – 7:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="md:w-1/2">
                    <ContactForm />
                </div>

            </div>
        </section>
    );
}
