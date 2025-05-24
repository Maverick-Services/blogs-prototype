import { PhoneCallIcon, VideoIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { TalkToExpertBtn } from '../common/TalkToExpertBtn'

export const HeroSection = () => {
    return (
        <div className="relative w-full min-h-[60vh] md:min-h-[40vh] lg:min-h-[70vh] z-0 lg:px-20 py-20">
            <Image src={"/hero-bg-blue.png"} alt="Indian law"
                // width={1000} height={1000}
                layout='fill'
                objectFit='fill'
                className="absolute top-0 right-0 left-0 -z-10 w-full h-full" />

            <div className='w-11/12 md:max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10'>
                {/* Left Content */}
                <div className="w-full md:max-w-lg bg-transparent text-white">
                    <h2 className="w-full text-xl mb-2">Expert Help. Simplified.</h2>
                    <h1 className="w-full text-4xl font-bold leading-snug mb-4">
                        Your Trusted Partner for Every
                        <span className="bg-accent text-white px-2 rounded ml-1">Audit Law</span>
                    </h1>
                    <p className="mb-4">Consult an Expert now.</p>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex justify-center items-center">
                            <Image src="/lawyer1.png" alt="Lawyers" width={40} height={40} />
                            <Image src="/lawyer2.png" alt="Lawyers" width={40} height={40} className="-ml-6" />
                            <Image src="/lawyer3.png" alt="Lawyers" width={40} height={40} className="-ml-6" />
                        </div>
                        <span className="text-sm text-green-400">+121 Experts are online</span>
                    </div>
                    <TalkToExpertBtn />
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
                    <div className="absolute top-[20%] left-8 sm:-left-8 xl:left-0 xl:translate-x-[-70%] bg-white text-black p-3 rounded shadow-[0_0_10px_0_rgba(0,0,0,1)] w-56 flex items-center gap-2">
                        <VideoIcon size={50} />
                        <div className=''>
                            <h4 className="font-bold text-sm mb-1">Video Consultation</h4>
                            <p className="text-xs">Connect with our legal experts face-to-face, from anywhere.</p>
                        </div>
                    </div>
                    <div className="absolute bottom-[20%] left-8 sm:-left-8 xl:left-0 xl:translate-x-[-70%] bg-black text-white p-3 rounded shadow-[0_0_10px_0_rgba(0,0,0,1)] w-56 flex items-center gap-2">
                        <PhoneCallIcon size={35} />
                        <div>
                            <h4 className="font-bold text-sm mb-1">Phone Support</h4>
                            <p className="text-xs">Call now for quick legal advice and assistance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
