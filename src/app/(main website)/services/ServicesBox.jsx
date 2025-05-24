'use client';
import React from 'react';
import Image from 'next/image';

function ServicesBox({ services }) {
    return (
        <div className="w-full lg:w-3/4 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(service => (
                    <div key={service._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 transition-transform">
                        <div className="relative h-48">
                            <Image src={service.imageURL} alt={service.name} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-[#0A3460] mb-2">{service.name}</h3>
                            <p className="text-gray-600 text-sm">{service.shortDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServicesBox;
