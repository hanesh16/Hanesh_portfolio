import React from 'react';
import { motion } from 'framer-motion';
import { Orbit, MessageCircle, X } from 'lucide-react';

const SpaceNavigator = ({ currentMode, onModeChange }) => {
  // Don't show on standalone modes
  if (currentMode === 'explore' || currentMode === 'solar') {
    return (
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onModeChange('portfolio')}
        className="fixed top-6 left-6 z-[100] flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/80 hover:border-amber-500/30 hover:text-white transition-all"
      >
        <X size={16} />
        <span className="text-sm font-medium">Back</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-40 flex flex-col gap-3"
    >
      {/* Ask the Universe Button */}
      <motion.button
        whileHover={{ scale: 1.05, x: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onModeChange('explore')}
        className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 hover:bg-black/50 transition-all"
      >
        <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <MessageCircle size={18} className="text-cyan-400/80" />
        </div>
        <div className="text-left">
          <span className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">AI Chat</span>
          <span className="block text-sm text-slate-300 group-hover:text-white transition-colors">Ask the Universe</span>
        </div>
      </motion.button>

      {/* Solar System Button */}
      <motion.button
        whileHover={{ scale: 1.05, x: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onModeChange('solar')}
        className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 hover:bg-black/50 transition-all"
      >
        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Orbit size={18} className="text-amber-400/80" />
        </div>
        <div className="text-left">
          <span className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">3D Explorer</span>
          <span className="block text-sm text-slate-300 group-hover:text-white transition-colors">Solar System</span>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default SpaceNavigator;
