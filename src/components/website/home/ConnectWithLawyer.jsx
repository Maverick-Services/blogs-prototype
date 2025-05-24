import Image from 'next/image'
import React from 'react'
import { TalkToExpertBtn } from '../common/TalkToExpertBtn'

export const ConnectWithLawyer = () => {
    return (

        <div className="bg-white py-6 lg:px-8 w-full">
            <div className="w-11/12 md:max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
                {/* Left: Features + Graphics */}
                <div className="w-full md:max-w-[60%] md:grow h-full">
                    <Image
                        alt='img'
                        width={600} height={500}
                        src={"/connectWithLawyer.png"}
                        className="w-full h-full"
                    />
                </div>

                {/* Right: Text + CTA */}
                <div className="md:grow w-full md:max-w-md text-center md:text-left lg:w-1/3">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                        Connect with our <br />
                        <span className="text-accent font-bold">Taxation Experts</span>
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Legal questions? Get instant answers from trusted professionals—no hassle, no delay
                    </p>
                    <TalkToExpertBtn />
                </div>
            </div>
        </div>
    )
}
