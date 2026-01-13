import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Elements - Light Theme */}
            {/* Grid and stars handled by InteractiveGrid component now */}

            <div className="max-w-7xl mx-auto px-6 text-center">
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
                    Space Explorer & <br className="md:hidden" /> Web Developer.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="holo-glass inline-block p-8 rounded-2xl mb-10 max-w-2xl mx-auto relative overflow-hidden"
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
        </section>
    );
};

export default Hero;
