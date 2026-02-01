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

// Tech Badge
const TechBadge = ({ icon: Icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm"
  >
    <Icon size={14} className="text-amber-500/80" />
    <span className="font-mono text-xs">{label}</span>
  </motion.div>
);

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Content - Left Aligned */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
      >
        <div className="max-w-3xl">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500/90 text-xs font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 animate-pulse" />
              Available for work
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-2 mb-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 font-mono text-sm tracking-wider"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500/90 via-orange-500/80 to-amber-500/70">
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
            <p className="text-lg sm:text-xl text-slate-500 font-light">
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
            className="text-slate-500 text-base sm:text-lg max-w-xl leading-relaxed mb-8"
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
                className="group flex items-center gap-2 px-6 py-3 bg-amber-500/90 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors"
              >
                View Projects
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <Link to="contact" smooth={true} duration={600} offset={-100}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-white/10 text-slate-300 font-medium rounded-lg hover:bg-white/5 hover:border-amber-500/30 hover:text-white transition-all"
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
                <div className="text-2xl sm:text-3xl font-bold text-white/80">{stat.value}</div>
                <div className="text-xs text-slate-500 font-mono mt-1">{stat.label}</div>
              </motion.div>
            ))}
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
