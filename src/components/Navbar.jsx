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
        background: "rgba(0, 0, 0, 0.4)", // Pitch dark transparent
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backgroundImage: `
            radial-gradient(white, rgba(255, 255, 255, .2) 2px, transparent 3px),
            radial-gradient(white, rgba(255, 255, 255, .15) 1px, transparent 2px),
            radial-gradient(white, rgba(255, 255, 255, .1) 2px, transparent 3px)
        `,
        backgroundSize: "550px 550px, 350px 350px, 250px 250px",
        backgroundPosition: "0 0, 40px 60px, 130px 270px"
    };

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
                            className="pl-4 pr-2 font-bold font-outfit text-white cursor-pointer select-none whitespace-nowrap text-xl relative group block drop-shadow-lg"
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
                                        className={`nav-item flex items-center gap-2 rounded-full text-sm font-semibold text-white transition-all duration-300 cursor-pointer hover:bg-white/5 hover:text-amber-300 whitespace-nowrap drop-shadow-md ${scrolled ? 'px-3 py-2' : 'px-4 py-2 text-base'}`}
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
                <div className="flex items-center gap-4 px-5 py-3 rounded-full overflow-hidden relative" style={navStyle}>
                    <Link
                        to="hero"
                        smooth={true}
                        duration={800}
                        offset={-100}
                        className="relative z-10 font-bold font-outfit text-white text-xl cursor-pointer drop-shadow-lg"
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
                        className="relative z-10 nav-item flex items-center gap-2 text-sm font-semibold text-white hover:text-amber-300 cursor-pointer drop-shadow-md"
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
                <div className="w-full relative flex items-center justify-around px-2 py-3 rounded-full overflow-hidden" style={navStyle}>
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
                            className="relative z-10 nav-item p-3 rounded-full text-white hover:text-amber-300 transition-all duration-300 cursor-pointer drop-shadow-md"
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
