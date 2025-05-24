import React from 'react'
import { TalkToExpertBtn } from '../common/TalkToExpertBtn'

export const LegalSolutions = () => {
    const legalSolutions = [
        {
            icon: '/icons/icon1.png',
            icon_bg: "#FFF4E2",
            heading: "Private Limited Company",
            desc: "Incorporate your business with full legal backing and expert guidance."
        },
        {
            icon: '/icons/icon2.png',
            icon_bg: "#FFF4E2",
            heading: "Digital Signature Certificate (DSC)",
            desc: "Get your DSC quickly for secure and verified online transactions."
        },
        {
            icon: '/icons/icon3.png',
            icon_bg: "#FFF4E2",
            heading: "Provident Fund (PF) Registration",
            desc: "Stay compliant and employee-friendly with easy PF registration support."
        },
        {
            icon: '/icons/icon4.png',
            icon_bg: "#FFF4E2",
            heading: "Udyam Registration",
            desc: "Register your business as a micro, small, or medium enterprise effortlessly."
        },
        {
            icon: '/icons/icon5.png',
            icon_bg: "#FFF4E2",
            heading: "MSME Registration",
            desc: "Unlock benefits and recognition with hassle-free MSME registration."
        },
        {
            icon: '/icons/icon6.png',
            icon_bg: "#FFF4E2",
            heading: "GST Registration",
            desc: "Ensure smooth tax operations with fast and accurate GST registration."
        }
    ]

    return (
        <div className="bg-white py-16 lg:px-16 text-center w-11/12 md:max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
                Experience a smarter
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-accent mb-10">
                legal solution platform in your hand
            </h3>

            <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 my-4">
                {legalSolutions.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-start gap-1 border border-gray-300  text-black p-5 px-6"
                    >
                        <img src={item.icon} alt={`icon-${index}`} className="py-3" />
                        {/* <div> */}
                        <p className="w-full text-start font-semibold text-lg">{item.heading}</p>
                        <p className="text-sm w-full text-start">{item.desc}</p>
                    </div>
                ))}
            </div>

            <TalkToExpertBtn />
        </div>
    )
}
