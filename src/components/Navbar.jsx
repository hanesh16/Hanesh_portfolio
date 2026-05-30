import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link, Events, scrollSpy } from 'react-scroll';
import { User, Briefcase, Layers, GraduationCap, Mail } from 'lucide-react';

// Memoized nav item
const NavItem = memo(({ item, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <Link
      to={item.id}
      spy={true}
      smooth="easeInOutCubic"
      duration={600}
      offset={-100}
      onClick={() => onClick(item.id)}
      className="relative group cursor-pointer"
    >
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full
          transition-colors duration-200
          ${isActive
            ? 'text-amber-500/90'
            : 'text-slate-400 hover:text-slate-200'
          }
        `}
      >
        {isActive && (
          <motion.div
            layoutId="navActiveIndicator"
            className="absolute inset-0 rounded-full bg-amber-500/10 border border-amber-500/20"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8
            }}
          />
        )}

        <span className="relative z-10 flex items-center gap-2">
          <Icon size={16} className={isActive ? 'text-amber-500/80' : 'group-hover:text-amber-500/70 transition-colors'} />
          <span className="text-sm font-medium">{item.label}</span>
        </span>
      </motion.div>
    </Link>
  );
});

// Memoized mobile nav item
const MobileNavItem = memo(({ item, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <Link
      to={item.id}
      spy={true}
      smooth="easeInOutCubic"
      duration={600}
      offset={-80}
      onClick={() => onClick(item.id)}
      className="relative cursor-pointer"
    >
      <motion.div
        whileTap={{ scale: 0.85 }}
        className={`
          flex flex-col items-center justify-center w-14 h-12 rounded-2xl
          transition-all duration-300
          ${isActive
            ? 'text-amber-400'
            : 'text-slate-400'
          }
        `}
      >
        {isActive && (
          <motion.div
            layoutId="mobileNavActiveIndicator"
            className="absolute inset-0 rounded-2xl bg-amber-500/10 border border-amber-500/15"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35
            }}
          />
        )}
        <Icon size={20} className="relative z-10" strokeWidth={isActive ? 2.5 : 1.5} />
        {isActive && (
          <motion.span
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-[9px] font-semibold tracking-wide mt-0.5 uppercase"
          >
            {item.label.length > 6 ? item.label.slice(0, 3) : item.label}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
});

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    let rafId;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          lastScrollY = currentScrollY;
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    scrollSpy.update();

    Events.scrollEvent.register('begin', () => { });
    Events.scrollEvent.register('end', () => { });

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  const handleNavClick = useCallback((sectionId) => {
    setActiveSection(sectionId);
  }, []);

  const handleHomeClick = useCallback(() => {
    setActiveSection('hero');
  }, []);

  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'work', label: 'Works', icon: Layers },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const navPadding = useTransform(smoothScrollY, [0, 100], [12, 8]);
  const logoScale = useTransform(smoothScrollY, [0, 100], [1, 0.9]);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          className="relative flex items-center gap-2 px-3 rounded-full"
          style={{
            padding: navPadding,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: `
              0 4px 30px rgba(0, 0, 0, 0.5),
              0 0 20px rgba(251, 191, 36, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.03)
            `,
            willChange: 'padding',
          }}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.05) 0%, transparent 70%)',
            }}
          />

          {/* HK Logo */}
          <Link
            to="hero"
            spy={true}
            smooth="easeInOutCubic"
            duration={600}
            offset={0}
            onClick={handleHomeClick}
            className="relative group flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
          >
            <motion.div
              style={{ scale: logoScale }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center w-full h-full"
            >
              {/* Orbital ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-amber-500/20"
                style={{ willChange: 'transform' }}
              />

              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <span className="relative font-bold font-outfit text-lg text-white/90 group-hover:text-amber-500/90 transition-colors">
                HK
                <motion.span
                  className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-amber-500/60"
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
          <div className="w-px h-6 bg-white/5 mx-1" />

          {/* Nav Items */}
          <div className="flex items-center">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeSection === item.id}
                onClick={handleNavClick}
              />
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)',
        }}
      >
        <div className="flex items-center justify-between w-full pointer-events-auto">
          <Link
            to="hero"
            smooth="easeInOutCubic"
            duration={600}
            className="flex items-center gap-2"
            onClick={handleHomeClick}
          >
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center w-9 h-9"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-amber-500/30"
              />
              <span className="font-bold font-outfit text-white/90 text-sm">
                HK
                <span className="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-amber-500/60 animate-pulse" />
              </span>
            </motion.div>
          </Link>

        </div>
      </motion.nav>

      {/* Mobile Bottom Dock */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
      >
        <div
          className="relative flex items-center gap-1 px-3 py-2 rounded-[20px]"
          style={{
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(251, 191, 36, 0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Top glow line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent)',
            }}
          />

          {navItems.map((item) => (
            <MobileNavItem
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={handleNavClick}
            />
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export default memo(Navbar);
