import React from 'react';
import { motion } from 'framer-motion';
import { Orbit, MessageCircle, X } from 'lucide-react';

const SpaceNavigator = ({ currentMode, onModeChange }) => {
  if (currentMode === 'explore' || currentMode === 'solar') {
    return (
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onModeChange('portfolio')}
        className="fixed top-20 left-4 z-[100] md:top-6 md:left-6 flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:border-amber-500/30 hover:text-white transition-all"
      >
        <X size={16} />
        <span className="text-sm font-medium hidden sm:inline">Back</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      className="fixed bottom-20 right-4 z-40 md:bottom-8 md:right-8 flex flex-col gap-2 md:gap-3"
    >
      {/* Ask the Universe Button */}
      <motion.button
        whileHover={{ scale: 1.05, x: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onModeChange('explore')}
        className="group flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 hover:border-cyan-500/30 hover:bg-black/60 transition-all"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
          <MessageCircle size={16} className="text-cyan-400/80 md:w-[18px] md:h-[18px]" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="block text-[9px] md:text-[10px] text-slate-500 font-mono uppercase tracking-wider">AI Chat</span>
          <span className="block text-xs md:text-sm text-slate-300 group-hover:text-white transition-colors">Ask the Universe</span>
        </div>
      </motion.button>

      {/* Solar System Button */}
      <motion.button
        whileHover={{ scale: 1.05, x: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onModeChange('solar')}
        className="group flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 hover:border-amber-500/30 hover:bg-black/60 transition-all"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
          <Orbit size={16} className="text-amber-400/80 md:w-[18px] md:h-[18px]" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="block text-[9px] md:text-[10px] text-slate-500 font-mono uppercase tracking-wider">3D Explorer</span>
          <span className="block text-xs md:text-sm text-slate-300 group-hover:text-white transition-colors">Solar System</span>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default SpaceNavigator;
