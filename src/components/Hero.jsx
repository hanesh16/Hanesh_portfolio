import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';


const TerminalTypewriter = () => {
    const [displayText1, setDisplayText1] = React.useState('');
    const [displayText2, setDisplayText2] = React.useState('');
    const [showCursor1, setShowCursor1] = React.useState(true);
    const [showCursor2, setShowCursor2] = React.useState(false);

    const text1 = '> full-time software developer';
    const text2 = '| part-time space explorer';

    React.useEffect(() => {
        let index1 = 0;
        let index2 = 0;

        // Type first line
        const timer1 = setInterval(() => {
            if (index1 < text1.length) {
                setDisplayText1(text1.slice(0, index1 + 1));
                index1++;
            } else {
                clearInterval(timer1);
                setShowCursor1(false);
                setShowCursor2(true);

                // Start typing second line after a brief pause
                setTimeout(() => {
                    const timer2 = setInterval(() => {
                        if (index2 < text2.length) {
                            setDisplayText2(text2.slice(0, index2 + 1));
                            index2++;
                        } else {
                            clearInterval(timer2);
                        }
                    }, 50);
                }, 300);
            }
        }, 50);

        return () => {
            clearInterval(timer1);
        };
    }, []);

    return (
        <>
            <div>
                <span className="text-green-500">{displayText1.charAt(0)}</span>
                <span>{displayText1.slice(1)}</span>
                {showCursor1 && <span className="cursor-blink">_</span>}
            </div>
            <div>
                <span className="text-green-500">{displayText2.charAt(0)}</span>
                <span>{displayText2.slice(1)}</span>
                {showCursor2 && <span className="cursor-blink">_</span>}
            </div>
        </>
    );
};

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
                <div className="w-full md:w-2/3 lg:w-1/2 z-10 text-left mt-8 md:mt-0">
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
                        I'm <span className="text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] filter">Hanesh Koganti</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-xl md:text-2xl font-mono text-green-400 mb-8 drop-shadow-lg"
                    >
                        <TerminalTypewriter />
                    </motion.div>

                    <div className="flex justify-start mt-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.8 }}
                            className="relative group max-w-6xl w-full"
                        >
                            {/* Neon blue glow effect */}
                            <div className="absolute -inset-1 bg-cyan-500/20 rounded blur opacity-60 group-hover:opacity-100 transition duration-500"></div>

                            {/* Main terminal card */}
                            <div
                                className="relative bg-black/95 backdrop-blur-xl border-2 border-cyan-400/40 rounded p-6 md:p-8 shadow-[0_0_30px_rgba(34,211,238,0.3)] overflow-hidden"
                            >
                                {/* Scanline effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none"></div>

                                {/* Top neon line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>

                                {/* Content */}
                                <div className="relative z-10 space-y-4 font-mono text-cyan-400">
                                    <p className="text-sm md:text-base leading-relaxed tracking-wide">
                                        <span className="text-cyan-300 animate-pulse">&gt;</span> I'm a software engineer who thinks in systems,
                                        <br />
                                        <span className="ml-2">observes patterns, and solves problems by building technologies that</span>
                                        <br />
                                        <span className="ml-2">propel us forward.</span>
                                    </p>

                                    <p className="text-sm md:text-base leading-relaxed tracking-wide pt-2">
                                        <span className="text-cyan-300 animate-pulse">|</span> Currently exploring the vast web universe—charting scientific
                                        <br />
                                        <span className="ml-2">coordinates, uncovering principles, and solving complex, human-centric</span>
                                        <br />
                                        <span className="ml-2">challenges<span className="cursor-blink">_</span></span>
                                    </p>
                                </div>

                                {/* Bottom neon accent */}
                                <div className="absolute bottom-0 right-0 w-32 h-[2px] bg-gradient-to-l from-cyan-400 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                            </div>
                        </motion.div>
                    </div>


                </div>

            </div>
        </section>
    );
};

export default Hero;
