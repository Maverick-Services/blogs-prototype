import React from 'react'

function VideoSection() {
    return (
        <section className="relative bg-gradient-to-b to-blue-50 from-white via-indigo-50 overflow-hidden pt-10 pb-24 px-4">
            {/* Enhanced Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 -left-20 w-80 h-80 bg-blue-400 rounded-full filter blur-[110px] opacity-25 animate-pulse-slow"></div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-400 rounded-full filter blur-[130px] opacity-25 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-400 rounded-full filter blur-[120px] opacity-20 animate-pulse-slow" style={{animationDelay: '4s'}}></div>
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            {/* Main content container */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Enhanced Section header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-blue-700">Watch Our Story</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-800 to-indigo-600 mb-6">
                        Know more about us
                    </h2>
                    
                    <div className="mt-6 max-w-2xl mx-auto">
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                            We combine legal expertise with innovative solutions to provide 
                            <span className="font-semibold text-gray-800"> unmatched service </span>
                            for your business growth and success
                        </p>
                    </div>
                </div>

                {/* Enhanced Video Container */}
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="relative group">
                        {/* Glow effect behind video */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                        
                        {/* Video frame with enhanced styling */}
                        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                            <div className="relative pb-[56.25%] rounded-2xl overflow-hidden">
                                <iframe
                                    src="https://www.youtube.com/embed/WL8A6g1r0A8?si=gZuJengIO0-pdVeY"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full transition-transform duration-300"
                                />
                            </div>
                            
                            
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-60 group-hover:scale-150 transition-transform duration-300"></div>
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full opacity-60 group-hover:scale-150 transition-transform duration-300"></div>
                    </div>
                    
                    {/* Video caption */}
                    <div className="text-center mt-8">
                        <p className="text-gray-500 text-sm font-medium">
                            Click on the video to play
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoSection