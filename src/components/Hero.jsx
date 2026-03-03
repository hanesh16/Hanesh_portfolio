import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import { ChevronRight, Code2, Cloud, Cpu } from 'lucide-react';

// Typewriter Effect
const Typewriter = ({ text, delay = 0, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [started, text, speed]);

  return (
    <span className="font-mono">{displayText}</span>
  );
};

// Blinking Cursor
const BlinkingCursor = () => (
  <span className="inline-block w-2 h-5 ml-1 bg-amber-500/80 animate-pulse" />
);

// Tech Badge with shimmer effect
const TechBadge = ({ icon: Icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="shimmer-badge flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm hover:border-amber-500/30 hover:text-slate-200 transition-all duration-300"
  >
    <Icon size={14} className="text-amber-500" />
    <span className="font-mono text-xs">{label}</span>
  </motion.div>
);

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Content - Two Column Layout */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

          {/* Left: Text Content */}
          <div className="flex-1 max-w-3xl">

            {/* Main Heading */}
            <div className="space-y-2 mb-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 font-mono text-sm tracking-wider"
              >
                <Typewriter text="Hi, I'm" delay={200} speed={40} />
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold font-outfit text-white/90 leading-[1.1]"
              >
                Hanesh
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold font-outfit leading-[1.1]"
              >
                <span className="animated-gradient-text">
                  Koganti
                </span>
                <BlinkingCursor />
              </motion.h1>
            </div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <p className="text-lg sm:text-xl text-slate-400 font-light">
                <Typewriter
                  text="Full Stack Developer | Cloud Architect | AI Enthusiast"
                  delay={900}
                  speed={30}
                />
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8"
            >
              Building scalable applications that push the boundaries of what's possible.
              Currently crafting digital experiences at Comcast.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              <TechBadge icon={Code2} label="React / Node.js" delay={1.5} />
              <TechBadge icon={Cloud} label="AWS / Azure" delay={1.6} />
              <TechBadge icon={Cpu} label="Python / AI" delay={1.7} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="projects" smooth={true} duration={600} offset={-100}>
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="premium-button group flex items-center gap-2"
                >
                  View Projects
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="contact" smooth={true} duration={600} offset={-100}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glow-border px-6 py-3 border border-white/10 text-slate-300 font-medium rounded-lg hover:bg-white/5 hover:border-amber-500/30 hover:text-white transition-all"
                >
                  Get in Touch
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex gap-8 sm:gap-12 mt-12 pt-8 border-t border-white/5"
            >
              {[
                { value: '2+', label: 'Years Exp' },
                { value: '10+', label: 'Projects' },
                { value: '5+', label: 'Tech Stack' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 + index * 0.1 }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 stat-glow">{stat.value}</div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Polaroid Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 self-center lg:self-auto mt-4 lg:mt-24 -mr-0 lg:-mr-6"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              className="relative group cursor-pointer"
            >
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/10 via-transparent to-violet-500/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Polaroid frame */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '12px 12px 48px 12px',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(251,191,36,0.03)',
                }}
              >
                {/* Image placeholder */}
                <div className="w-40 h-48 sm:w-48 sm:h-56 md:w-56 md:h-64 lg:w-60 lg:h-72 rounded-lg overflow-hidden relative">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(124,58,237,0.1) 50%, rgba(6,182,212,0.08) 100%)',
                    }}
                  />
                  {/* Decorative elements inside placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-20 h-20 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-violet-500/20 border border-white/10" />
                    </motion.div>
                  </div>
                  {/* Subtle scan line effect */}
                  <motion.div
                    animate={{ y: [-264, 264] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"
                  />
                </div>

                {/* Caption area */}
                <div className="mt-3 text-center">
                  <p className="text-xs text-slate-400 font-mono tracking-wider">Hanesh Koganti</p>
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-amber-500/30 rounded-tr-sm" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-amber-500/30 rounded-bl-sm" />
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [1, 0.3], y: [0, 8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-amber-500/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
