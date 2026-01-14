import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Elements - Light Theme */}
            {/* Grid and stars handled by InteractiveGrid component now */}

            <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Left Column: Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left z-10">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-amber-400 font-medium text-lg mb-4"
                    >
                        Hi, my name is
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-5xl md:text-7xl font-bold font-outfit mb-6 leading-tight"
                    >
                        <span className="cosmic-gradient">Hanesh Koganti</span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-slate-400 mb-8"
                    >
                        Space Explorer & <br className="hidden md:block" /> Web Developer.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="holo-glass inline-block p-8 rounded-2xl mb-10 relative overflow-hidden text-left"
                    >
                        {/* Liquid Background Layer */}
                        <div className="absolute inset-0 z-0 liquid-bg opacity-20 pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)' }}>
                        </div>

                        <p className="text-slate-300 text-lg leading-relaxed relative z-10">
                            I'm a software engineer specializing in building exceptional digital experiences. Currently, I'm plotting coordinates for accessible, human-centered products in the vast web universe.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                    >
                        <a href="#projects" className="launch-btn inline-block">
                            Launch Mission
                        </a>
                    </motion.div>
                </div>

                {/* Right Column: Floating Polaroid */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="w-full md:w-1/2 flex justify-center z-10"
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative group cursor-pointer"
                    >
                        {/* Polaroid Frame */}
                        <div className="bg-white p-4 pb-16 rounded shadow-2xl transform rotate-6 hover:rotate-0 transition-all duration-500 ease-out max-w-sm relative">
                            {/* Glassy Overlay / Texture */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

                            {/* Image Container */}
                            <div className="overflow-hidden bg-black aspect-square relative z-10 border border-slate-200">
                                <img
                                    src="/src/assets/polaroid_placeholder.png"
                                    alt="Space Explorer"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Caption (Optional or scribbled look) */}
                            <div className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-slate-800 transform -rotate-2">
                                <span className="text-xl font-bold opacity-80" style={{ fontFamily: 'cursive' }}>Lost in Space</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
