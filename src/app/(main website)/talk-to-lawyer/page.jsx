import WebsiteLayout from '@/components/website/WebsiteLayout';
import Image from 'next/image';
import React from 'react';

function page() {
    return (
        <WebsiteLayout>
            <div className="relative w-full min-h-[60vh] md:min-h-[40vh] lg:min-h-[70vh] z-0 lg:px-20 py-20">
                <Image src={"/hero-bg.png"} alt="Indian law"
                    // width={1000} height={1000}
                    layout='fill'
                    objectFit='fill'
                    className="absolute top-0 right-0 left-0 -z-10 w-full h-full" />

                <div className='w-11/12 md:max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10'>
                    {/* Left Content */}
                    <div className="w-full md:max-w-lg bg-transparent text-white">
                        <h2 className="w-full text-xl mb-2">Legal Help. Simplified.</h2>
                        <h1 className="w-full text-4xl font-bold leading-snug mb-4">
                            Your Trusted Partner <br />
                            for Every <span className="bg-red-500 text-white px-2 rounded">Legal Need</span>
                        </h1>
                        <p className="mb-4">Consult a Lawyer now.</p>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex justify-center items-center">
                                <Image src="/lawyer1.png" alt="Lawyers" width={40} height={40} />
                                <Image src="/lawyer2.png" alt="Lawyers" width={40} height={40} className="-ml-6" />
                                <Image src="/lawyer3.png" alt="Lawyers" width={40} height={40} className="-ml-6" />
                            </div>
                            <span className="text-sm text-green-400">+121 Lawyers are online</span>
                        </div>
                        <button className="bg-red-600 px-6 py-2 rounded text-white hover:bg-red-700">Talk to lawyer</button>
                    </div>
                    {/* Right Image */}
                    <div className="relative lg:mt-0 bg-transparent">
                        <div className="rounded-full overflow-hidden  ring-8 ring-white w-72 h-72">
                            <Image
                                src={"/hero-img-1.png"}
                                alt="Lawyer hand"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full w-full h-full"
                            />
                        </div>
                        {/* Overlays */}
                        <div className="absolute top-[20%] left-8 sm:-left-8 xl:left-0 xl:translate-x-[-70%] bg-white text-black p-3 rounded shadow-lg w-56">
                            <h4 className="font-bold text-sm mb-1">Video Consultation</h4>
                            <p className="text-xs">Connect with our legal experts face-to-face, from anywhere.</p>
                        </div>
                        <div className="absolute bottom-[20%] left-8 sm:-left-8 xl:left-0 xl:translate-x-[-70%] bg-white text-black p-3 rounded shadow-lg w-56">
                            <h4 className="font-bold text-sm mb-1">Phone Support</h4>
                            <p className="text-xs">Call now for quick legal advice and assistance.</p>
                        </div>
                    </div>
                </div>
            </div>

        </WebsiteLayout>
    )
}

export default page
