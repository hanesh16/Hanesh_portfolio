import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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

        const timer1 = setInterval(() => {
            if (index1 < text1.length) {
                setDisplayText1(text1.slice(0, index1 + 1));
                index1++;
            } else {
                clearInterval(timer1);
                setShowCursor1(false);
                setShowCursor2(true);

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
        }, 2500);
        return () => clearInterval(interval);
    }, [greetings.length]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-6">
            <div className="max-w-6xl w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-amber/10 border border-cosmic-amber/20 mb-6"
                        >
                            <span className="w-2 h-2 bg-cosmic-amber rounded-full animate-pulse"></span>
                            <span className="text-cosmic-amber text-sm font-mono">Available for opportunities</span>
                        </motion.div>

                        {/* Greeting */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-cosmic-amber font-bold text-2xl md:text-3xl mb-4 flex items-center gap-2"
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

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-5xl md:text-7xl font-bold font-outfit mb-6 leading-tight"
                        >
                            <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
                                I'm Hanesh
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-cosmic-amber via-cosmic-violet to-cosmic-cyan bg-clip-text text-transparent">
                                Koganti
                            </span>
                        </motion.h1>

                        {/* Terminal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="text-xl md:text-2xl font-mono mb-8"
                        >
                            <TerminalTypewriter />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="text-slate-400 text-lg mb-8 max-w-lg"
                        >
                            A software engineer who thinks in systems, observes patterns, 
                            and builds technologies that propel us forward.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a
                                href="#contact"
                                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cosmic-amber to-cosmic-amber-dark text-slate-900 font-semibold hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-300"
                            >
                                Let's Talk
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </a>
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-slate-300 font-semibold hover:border-cosmic-violet/50 hover:text-cosmic-violet transition-all duration-300"
                            >
                                View Work
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: Terminal Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative hidden lg:block"
                    >
                        {/* Glow effects */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-cosmic-cyan/20 via-cosmic-violet/20 to-cosmic-amber/20 rounded-3xl blur-2xl opacity-50"></div>
                        
                        {/* Terminal */}
                        <div className="relative bg-black/90 backdrop-blur-xl border border-cosmic-cyan/20 rounded-2xl p-6 overflow-hidden"
                            style={{ boxShadow: '0 0 40px rgba(34,211,238,0.1), inset 0 1px 0 rgba(255,255,255,0.05)' }}
                        >
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                <span className="ml-4 text-xs font-mono text-slate-500">hanesh@portfolio ~ zsh</span>
                            </div>

                            {/* Terminal Content */}
                            <div className="font-mono text-sm space-y-3">
                                <div className="text-slate-400">
                                    <span className="text-cosmic-cyan">$</span> whoami
                                </div>
                                <div className="text-slate-200 pl-4">
                                    software_engineer @ comcast
                                </div>
                                
                                <div className="text-slate-400">
                                    <span className="text-cosmic-cyan">$</span> cat location.txt
                                </div>
                                <div className="text-slate-200 pl-4">
                                    sunnyvale, california 🌉
                                </div>
                                
                                <div className="text-slate-400">
                                    <span className="text-cosmic-cyan">$</span> ls skills/
                                </div>
                                <div className="pl-4 flex flex-wrap gap-2">
                                    {['python', 'react', 'aws', 'docker', 'kubernetes', 'ai/ml'].map((skill) => (
                                        <span key={skill} className="text-cosmic-amber px-2 py-1 rounded bg-cosmic-amber/10 border border-cosmic-amber/20 text-xs">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="text-slate-400">
                                    <span className="text-cosmic-cyan">$</span> current_mission
                                </div>
                                <div className="text-slate-200 pl-4">
                                    building scalable systems & exploring AI frontiers
                                    <span className="cursor-blink text-cosmic-cyan">_</span>
                                </div>
                            </div>

                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cosmic-cyan/20 rounded-tl-2xl"></div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cosmic-violet/20 rounded-br-2xl"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="text-slate-600" size={24} />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
