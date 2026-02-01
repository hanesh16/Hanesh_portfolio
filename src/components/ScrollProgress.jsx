import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollProgress = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollPercentage(Math.round(scrollPercent));
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[9999] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #8b5cf6, #22d3ee)',
          boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
        }}
      />
      
      {/* Scroll Percentage Indicator */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-[9998] flex flex-col items-center gap-2"
          >
            {/* Percentage */}
            <motion.div
              className="text-xs font-mono text-amber-400"
              key={scrollPercentage}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {scrollPercentage}%
            </motion.div>
            
            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20 hover:bg-amber-400/10 hover:border-amber-400 transition-all"
            >
              <ArrowUp size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
