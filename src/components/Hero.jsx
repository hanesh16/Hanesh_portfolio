import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';

const Hero = () => {
    const greetings = ["Hi", "Hola", "Bonjour", "Namaste", "Ciao", "Hallo", "Konnichiwa"];
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % greetings.length);
        }, 2500); // Change every 2.5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Elements - Light Theme */}
            {/* Grid and stars handled by InteractiveGrid component now */}

            <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-start">

                {/* Left-Aligned Text Content */}
                <div className="w-full md:w-2/3 lg:w-1/2 z-10 text-left mt-24 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-amber-400 font-bold text-2xl md:text-3xl mb-4 flex items-center gap-2 drop-shadow-md"
                    >
                        <div className="relative h-10 w-40 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={greetings[index]}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute left-0 block"
                                >
                                    {greetings[index]},
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-5xl md:text-7xl font-bold font-outfit mb-6 leading-tight drop-shadow-2xl"
                    >
                        I'm <span className="cosmic-gradient drop-shadow-sm filter">Hanesh Koganti</span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-slate-200 mb-8 drop-shadow-lg"
                    >
                        Space Explorer & <br className="hidden md:block" /> Web Developer.
                    </motion.h2>

                    <div className="flex justify-start">
                        <TiltCard index={8} variant="scifi-tech" className="mb-10 text-left inline-block max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
                            <div className="relative z-10 p-2">
                                <p className="text-slate-100 text-lg leading-relaxed text-left font-medium drop-shadow-md">
                                    I'm a software engineer specializing in building exceptional digital experiences. Currently, I'm plotting coordinates for accessible, human-centered products in the vast web universe.
                                </p>
                            </div>
                        </TiltCard>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                    >
                        <a href="#projects" className="launch-btn inline-block shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-shadow">
                            Launch Mission
                        </a>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
