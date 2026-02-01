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

    const navStyle = {
        background: `
            radial-gradient(ellipse at top, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(251, 191, 36, 0.05) 0%, transparent 50%),
            rgba(0, 0, 0, 0.6)
        `,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(251, 191, 36, 0.08),
            0 0 60px rgba(139, 92, 246, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `,
    };

    return (
        <>
            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: -100, x: "-50%" }}
                animate={{ y: 0, x: "-50%" }}
                transition={{ duration: 0.5 }}
                className="hidden md:flex fixed top-6 left-1/2 z-50 origin-top"
                role="navigation"
                aria-label="Main navigation"
            >
                <motion.div
                    layout
                    initial={{ width: "800px", padding: "1rem" }}
                    animate={{
                        width: scrolled ? "750px" : "850px",
                        padding: scrolled ? "0.6rem" : "1rem",
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-center justify-center rounded-full overflow-hidden"
                    style={navStyle}
                >
                    <div className="flex items-center justify-between w-full px-2 relative z-10">
                        {/* Logo - Orbit Effect */}
                        <Link
                            to="hero"
                            smooth={true}
                            duration={800}
                            offset={-100}
                            className="pl-4 pr-2 font-bold font-outfit text-white cursor-pointer select-none whitespace-nowrap text-xl relative group block"
                        >
                            <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                                HK
                            </span>
                            <span className="text-cosmic-amber inline-block relative">
                                .
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-cosmic-amber rounded-full animate-ping opacity-75 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></span>
                            </span>
                        </Link>

                        <div className={`h-6 w-[1px] bg-gradient-to-b from-transparent via-slate-600 to-transparent mx-2 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}></div>

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
                                        activeClass="nav-reactor-active"
                                        to={item.id || item.name.toLowerCase()}
                                        spy={true}
                                        smooth="easeInOutQuart"
                                        duration={1000}
                                        offset={-100}
                                        className={`nav-item flex items-center gap-2 rounded-full text-sm font-semibold text-slate-200 transition-all duration-300 cursor-pointer hover:bg-white/5 whitespace-nowrap ${scrolled ? 'px-3 py-2' : 'px-4 py-2 text-base'}`}
                                    >
                                        <span className="text-cosmic-amber/80">{item.icon}</span>
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
                <div className="flex items-center gap-4 px-5 py-3 rounded-full overflow-hidden relative" style={navStyle}>
                    <Link
                        to="hero"
                        smooth={true}
                        duration={800}
                        offset={-100}
                        className="relative z-10 font-bold font-outfit text-xl cursor-pointer"
                    >
                        <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                            HK
                        </span>
                        <span className="text-cosmic-amber">.</span>
                    </Link>

                    <div className="h-5 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent relative z-10"></div>

                    <Link
                        activeClass="text-cosmic-amber drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                        to="about"
                        spy={true}
                        smooth="easeInOutQuart"
                        duration={1000}
                        offset={-100}
                        className="relative z-10 nav-item flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-cosmic-amber transition-colors cursor-pointer"
                    >
                        <User size={16} className="text-cosmic-amber/80" />
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
                <div className="w-full relative flex items-center justify-around px-2 py-3 rounded-full overflow-hidden" style={navStyle}>
                    {[
                        { name: 'Experience', icon: <Briefcase size={20} /> },
                        { name: 'Projects', icon: <Code size={20} /> },
                        { name: 'Education', icon: <GraduationCap size={20} /> },
                        { name: 'Contact', icon: <Mail size={20} /> }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            activeClass="nav-reactor-active"
                            to={item.id || item.name.toLowerCase()}
                            spy={true}
                            smooth="easeInOutQuart"
                            duration={1000}
                            offset={-100}
                            className="relative z-10 nav-item p-3 rounded-full text-slate-300 hover:text-cosmic-amber transition-all duration-300 cursor-pointer"
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
