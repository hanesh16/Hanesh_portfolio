import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { User, Briefcase, FolderGit2, GraduationCap, Mail, Rocket } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <motion.div
          layout
          animate={{
            padding: scrolled ? '0.5rem' : '0.75rem',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center gap-2 px-3 rounded-full overflow-hidden"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: `
              0 4px 30px rgba(0, 0, 0, 0.5),
              0 0 20px rgba(251, 191, 36, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.05)
            `,
          }}
        >
          {/* Glow effect behind */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
            }}
          />

          {/* HK Logo - Home Button */}
          <Link
            to="hero"
            spy={true}
            smooth="easeInOutCubic"
            duration={800}
            offset={0}
            onSetActive={() => setActiveSection('hero')}
            className="relative group flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center w-full h-full"
            >
              {/* Orbital ring animation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-amber-400/30"
              />
              
              {/* Inner glow */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-400/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Text */}
              <span className="relative font-bold font-outfit text-lg text-white group-hover:text-amber-400 transition-colors">
                HK
                <motion.span 
                  className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-amber-400"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </motion.div>
          </Link>

          {/* Divider */}
          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Nav Items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Link
                key={item.id}
                to={item.id}
                spy={true}
                smooth="easeInOutCubic"
                duration={800}
                offset={-100}
                onSetActive={() => setActiveSection(item.id)}
                className="relative group"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer
                    transition-all duration-300
                    ${isActive 
                      ? 'bg-amber-400/10 text-amber-400' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-amber-400/10 border border-amber-400/30"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} className={isActive ? 'text-amber-400' : 'group-hover:text-amber-400 transition-colors'} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)',
        }}
      >
        <div className="flex items-center justify-between w-full">
          {/* HK Logo - Mobile */}
          <Link
            to="hero"
            smooth="easeInOutCubic"
            duration={800}
            className="flex items-center gap-2"
          >
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center w-9 h-9"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-amber-400/40"
              />
              <span className="font-bold font-outfit text-white text-sm">
                HK
                <span className="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
              </span>
            </motion.div>
          </Link>

          {/* Current Section Indicator */}
          <motion.div 
            key={activeSection}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-mono text-amber-400 uppercase tracking-wider"
          >
            {activeSection === 'hero' ? 'Home' : activeSection}
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Dock */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div
          className="flex items-center gap-1 px-2 py-2 rounded-2xl"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(251, 191, 36, 0.1)',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Link
                key={item.id}
                to={item.id}
                spy={true}
                smooth="easeInOutCubic"
                duration={800}
                offset={-80}
                onSetActive={() => setActiveSection(item.id)}
                className="relative"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`
                    flex items-center justify-center w-11 h-11 rounded-xl
                    transition-all duration-300
                    ${isActive 
                      ? 'bg-amber-400/20 text-amber-400' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileNav"
                      className="absolute inset-0 rounded-xl bg-amber-400/10 border border-amber-400/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon size={20} className="relative z-10" />
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
