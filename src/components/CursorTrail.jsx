import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  // Smooth spring physics for cursor following
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  // Trail particles with delayed following
  const trail1X = useSpring(0, { damping: 30, stiffness: 200 });
  const trail1Y = useSpring(0, { damping: 30, stiffness: 200 });
  
  const trail2X = useSpring(0, { damping: 35, stiffness: 150 });
  const trail2Y = useSpring(0, { damping: 35, stiffness: 150 });
  
  const trail3X = useSpring(0, { damping: 40, stiffness: 100 });
  const trail3Y = useSpring(0, { damping: 40, stiffness: 100 });

  useEffect(() => {
    // Only show on desktop
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Delayed trail particles
      setTimeout(() => {
        trail1X.set(e.clientX);
        trail1Y.set(e.clientY);
      }, 50);
      
      setTimeout(() => {
        trail2X.set(e.clientX);
        trail2Y.set(e.clientY);
      }, 100);
      
      setTimeout(() => {
        trail3X.set(e.clientX);
        trail3Y.set(e.clientY);
      }, 150);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, trail1X, trail1Y, trail2X, trail2Y, trail3X, trail3Y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
        }}
      />
      
      {/* Trail particle 1 */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%)',
          boxShadow: '0 0 15px rgba(251, 191, 36, 0.3)',
        }}
      />
      
      {/* Trail particle 2 */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9997] mix-blend-screen"
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.2)',
        }}
      />
      
      {/* Trail particle 3 */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9996] mix-blend-screen"
        style={{
          x: trail3X,
          y: trail3Y,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
          boxShadow: '0 0 8px rgba(34, 211, 238, 0.15)',
        }}
      />
    </>
  );
};

export default CursorTrail;
