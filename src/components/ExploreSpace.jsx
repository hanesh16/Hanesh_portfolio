
import React from 'react';
import { motion } from 'framer-motion';

const ExploreSpace = () => {
    return (
        <section className="relative w-full py-32 flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: 'transparent', fontFamily: '"Inter", sans-serif' }}>



            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center px-6 max-w-3xl mx-auto backdrop-blur-sm p-8 rounded-3xl border border-white/5 bg-black/20"
            >
                <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-light text-[#e8e8e6] mb-4 tracking-tight">
                        Where curiosity begins.
                    </h2>
                    <p className="text-[#8d8d8a] text-lg font-light">
                        Ask the universe anything.
                    </p>
                </div>

                {/* Search Bar Visual */}
                <div className="w-full max-w-xl mx-auto group">
                    <div className="bg-[#1f1d21]/80 backdrop-blur-md border border-[#2d2b2f] rounded-full p-2 pl-6 flex items-center shadow-2xl transition-all duration-300 group-hover:border-[#3d3b3f] group-hover:bg-[#252327]/90">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#8d8d8a] mr-4">
                            <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 22L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input
                            type="text"
                            disabled
                            placeholder="Explore deep space..."
                            className="bg-transparent border-none outline-none text-[#e8e8e6] text-lg w-full placeholder-[#5d5d5a] font-light py-2"
                        />
                        <button className="bg-[#3d3b3f] text-[#e8e8e6] p-2 rounded-full hover:bg-[#4d4b4f] transition-colors ml-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mt-12 flex items-center justify-center gap-6 text-[#5d5d5a] text-sm">
                    <span>Powered by Stardust</span>
                    <span className="w-1 h-1 bg-[#5d5d5a] rounded-full"></span>
                    <span>Designed for Orbit</span>
                </div>
            </motion.div>
        </section>
    );
};

export default ExploreSpace;
