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
                <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">{displayText1.charAt(0)}</span>
                <span className="text-slate-300">{displayText1.slice(1)}</span>
                {showCursor1 && <span className="cursor-blink text-emerald-400">_</span>}
            </div>
            <div>
                <span className="text-cosmic-violet drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">{displayText2.charAt(0)}</span>
                <span className="text-slate-300">{displayText2.slice(1)}</span>
                {showCursor2 && <span className="cursor-blink text-cosmic-violet">_</span>}
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
    }, [greetings.length]);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-12 md:pt-20">
            {/* Background Elements - Light Theme */}
            {/* Grid and stars handled by InteractiveGrid component now */}

            <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-start">

                {/* Left-Aligned Text Content */}
                <div className="w-full md:w-2/3 lg:w-1/2 z-10 text-left mt-0 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-cosmic-amber font-bold text-2xl md:text-3xl mb-4 flex items-center gap-2 drop-shadow-lg"
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
                        className="text-5xl md:text-7xl font-bold font-outfit mb-6 leading-tight"
                    >
                        <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent drop-shadow-2xl">
                            I'm Hanesh Koganti
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-xl md:text-2xl font-mono mb-8"
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
                            {/* Multi-color glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-cyan/30 via-cosmic-violet/30 to-cosmic-amber/30 rounded-lg blur-lg opacity-60 group-hover:opacity-100 transition duration-700"></div>

                            {/* Main terminal card */}
                            <div
                                className="relative bg-black/95 backdrop-blur-xl border border-cosmic-cyan/30 rounded-lg p-6 md:p-8 overflow-hidden terminal-glow"
                            >
                                {/* Scanline effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-cyan/5 to-transparent pointer-events-none"></div>
                                
                                {/* Animated gradient line top */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cosmic-cyan to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
                                
                                {/* Animated gradient line bottom */}
                                <div className="absolute bottom-0 right-0 w-1/2 h-[1px] bg-gradient-to-l from-cosmic-violet to-transparent"></div>

                                {/* Content */}
                                <div className="relative z-10 space-y-4 font-mono">
                                    <p className="text-sm md:text-base leading-relaxed tracking-wide text-slate-300">
                                        <span className="text-cosmic-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse">&gt;</span> I'm a software engineer who thinks in systems,
                                        <br />
                                        <span className="ml-2">observes patterns, and solves problems by building technologies that</span>
                                        <br />
                                        <span className="ml-2">propel us forward.</span>
                                    </p>

                                    <p className="text-sm md:text-base leading-relaxed tracking-wide pt-2 text-slate-300">
                                        <span className="text-cosmic-violet drop-shadow-[0_0_8px_rgba(139,92,246,0.6)] animate-pulse">|</span> Currently exploring the vast web universe—charting scientific
                                        <br />
                                        <span className="ml-2">coordinates, uncovering principles, and solving complex, human-centric</span>
                                        <br />
                                        <span className="ml-2">challenges<span className="cursor-blink text-cosmic-amber">_</span></span>
                                    </p>
                                </div>

                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cosmic-cyan/50 rounded-tl-lg"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cosmic-violet/50 rounded-br-lg"></div>
                            </div>
                        </motion.div>
                    </div>


                </div>

            </div>
        </section>
    );
};

export default Hero;
