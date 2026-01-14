import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { User, Code, Mail, Briefcase, GraduationCap } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: -100, x: "-50%" }}
                animate={{ y: 0, x: "-50%" }}
                transition={{ duration: 0.5 }}
                className="hidden md:flex fixed top-6 left-1/2 z-50 origin-top"
            >
                <motion.div
                    layout
                    initial={{ width: "800px", padding: "1rem" }}
                    animate={{
                        width: scrolled ? "750px" : "850px",
                        padding: scrolled ? "0.6rem" : "1rem",
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-center justify-center rounded-full shadow-2xl overflow-hidden backdrop-blur-xl border border-white/10 ring-1 ring-white/5 star-dust-bg"
                >
                    {/* Liquid Background Layer */}
                    <div className="absolute inset-0 z-0 liquid-bg opacity-30 pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)' }}></div>

                    <div className="flex items-center justify-between w-full px-2 relative z-10">
                        {/* Logo - Orbit Effect */}
                        <Link
                            to="hero"
                            smooth={true}
                            duration={800}
                            offset={-100}
                            className="pl-4 pr-2 font-bold font-outfit text-slate-200 cursor-pointer select-none whitespace-nowrap text-xl relative group block"
                        >
                            HK
                            <span className="text-amber-400 inline-block relative">
                                .
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-75"></span>
                            </span>
                        </Link>

                        <div className={`h-6 w-[1px] bg-slate-600 mx-2 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}></div>

                        <motion.ul
                            className="flex items-center justify-between flex-1"
                            animate={{ gap: scrolled ? "0.5rem" : "1rem" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Nav Items with Icons */}
                            {[
                                { name: 'About', icon: <User size={16} /> },
                                { name: 'Experience', icon: <Briefcase size={16} /> },
                                { name: 'Projects', icon: <Code size={16} /> },
                                { name: 'Education', icon: <GraduationCap size={16} /> },
                                { name: 'Contact', icon: <Mail size={16} /> }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        activeClass="nav-reactor-active text-amber-400"
                                        to={item.name.toLowerCase()}
                                        spy={true}
                                        smooth={true}
                                        duration={800}
                                        offset={-100}
                                        className={`nav-item flex items-center gap-2 rounded-full text-sm font-medium text-slate-400 transition-all duration-300 cursor-pointer hover:bg-white/5 hover:text-amber-300 whitespace-nowrap ${scrolled ? 'px-3 py-2' : 'px-4 py-2 text-base'}`}
                                    >
                                        {item.icon}
                                        <span className="hidden md:inline">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </motion.ul>
                    </div>

                </motion.div>
            </motion.nav>

            {/* Mobile Top Navbar (Identity + About) */}
            <motion.nav
                initial={{ y: -100, x: 0 }}
                animate={{ y: 0, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex md:hidden fixed top-6 left-6 z-50 origin-top-left"
            >
                <div className="flex items-center gap-4 px-5 py-3 rounded-full shadow-2xl overflow-hidden backdrop-blur-xl border border-white/10 ring-1 ring-white/5 star-dust-bg relative">
                    <div className="absolute inset-0 z-0 liquid-bg opacity-30 pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)' }}></div>

                    <Link
                        to="hero"
                        smooth={true}
                        duration={800}
                        offset={-100}
                        className="relative z-10 font-bold font-outfit text-slate-200 text-xl cursor-pointer"
                    >
                        HK<span className="text-amber-400">.</span>
                    </Link>

                    <div className="h-5 w-[1px] bg-white/20 relative z-10"></div>

                    <Link
                        activeClass="text-amber-400"
                        to="about"
                        spy={true}
                        smooth={true}
                        duration={800}
                        offset={-100}
                        className="relative z-10 nav-item flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-amber-300 cursor-pointer"
                    >
                        <User size={16} />
                        <span>About</span>
                    </Link>
                </div>
            </motion.nav>

            {/* Mobile Bottom Navbar (Navigation Dock) */}
            <motion.nav
                initial={{ y: 100, x: "-50%" }}
                animate={{ y: 0, x: "-50%" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex md:hidden fixed bottom-6 left-1/2 z-50 origin-bottom w-[90%] max-w-[350px]"
            >
                <div className="w-full relative flex items-center justify-around px-2 py-3 rounded-full shadow-2xl overflow-hidden backdrop-blur-xl border border-white/10 ring-1 ring-white/5 star-dust-bg">
                    <div className="absolute inset-0 z-0 liquid-bg opacity-30 pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)' }}></div>

                    {[
                        { name: 'Experience', icon: <Briefcase size={20} /> },
                        { name: 'Projects', icon: <Code size={20} /> },
                        { name: 'Education', icon: <GraduationCap size={20} /> },
                        { name: 'Contact', icon: <Mail size={20} /> }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            activeClass="nav-reactor-active text-amber-400"
                            to={item.name.toLowerCase()}
                            spy={true}
                            smooth={true}
                            duration={800}
                            offset={-100}
                            className="relative z-10 nav-item p-3 rounded-full text-slate-400 hover:text-amber-300 transition-all duration-300 cursor-pointer"
                        >
                            {item.icon}
                        </Link>
                    ))}
                </div>
            </motion.nav>
        </>
    );
};

export default Navbar;
