import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
        boxShadow: '0 0 6px rgba(251, 191, 36, 0.3)',
      }}
    />
  );
};

export default ScrollProgress;
