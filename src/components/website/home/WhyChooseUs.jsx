import Image from 'next/image';
import { FaBalanceScale, FaClock, FaShieldAlt, FaChartBar, FaSmile } from 'react-icons/fa';

export default function WhyChooseUs() {
    return (
        <section className='relative z-0 w-full h-full'>
            <Image src={"/choose-us-bg.png"} alt="pattern-bg"
                // width={1000} height={1000}
                layout='fill'
                objectFit='fill'
                className="absolute top-0 right-0 left-0 -z-10 w-full h-full"
            />

            <div className="py-16 lg:px-8 w-11/12 sm:max-w-6xl mx-auto">


                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-primary">Why choose us</h2>
                </div>
                {/* Content */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-center gap-8 text-center">
                    {/* Left list */}
                    <div className="max-sm:order-1 w-full self-start md:h-[80%] flex flex-col gap-4 justify-between items-stretch sm:text-right">
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Expert Legal Team</h4>
                            <p className="text-gray-600">Skilled professionals you can trust.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Fast Process</h4>
                            <p className="text-gray-600">Quick and smooth service delivery.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Startup-Focused</h4>
                            <p className="text-gray-600">Legal help tailored for startups.</p>
                        </div>
                    </div>
                    {/* Center image */}
                    <div className="w-3xs mx-auto sm:w-full h-full rounded-full overflow-hidden max-sm:order-1">
                        <Image
                            src="/chooseUs.png"
                            alt="Friendly advisor"
                            width={500}
                            height={500}
                            objectFit="cover"
                            className='w-full h-full'
                        />
                    </div>
                    {/* Right list */}
                    <div className="max-sm:order-1 w-full self-start md:h-[80%] flex flex-col gap-4 justify-between items-stretch sm:text-left">
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Transparent Pricing</h4>
                            <p className="text-gray-600">No hidden costs, ever.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Dedicated Support</h4>
                            <p className="text-gray-600">We’re here when you need us.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Complete Legal Services</h4>
                            <p className="text-gray-600">All legal needs, one platform.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
