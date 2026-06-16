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
      className="fixed z-[60]"
    >
      {/* Mobile: top-right small icons to avoid bottom dock overlap */}
      <div className="flex md:hidden fixed top-4 right-14 z-[60] items-center gap-1.5">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onModeChange('explore')}
          className="flex items-center justify-center w-9 h-9 rounded-full text-slate-400 hover:text-cyan-400 transition-colors"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <MessageCircle size={16} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onModeChange('solar')}
          className="flex items-center justify-center w-9 h-9 rounded-full text-slate-400 hover:text-amber-400 transition-colors"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <Orbit size={16} />
        </motion.button>
      </div>

      {/* Desktop versions - keep expanded cards */}
      <div className="hidden md:flex fixed bottom-8 right-8 flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onModeChange('explore')}
          className="flex group items-center gap-3 px-4 py-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-cyan-500/30 hover:bg-black/70 transition-all shadow-lg"
        >
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle size={18} className="text-cyan-400/80" />
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider">AI Chat</span>
            <span className="block text-sm text-slate-300 group-hover:text-white transition-colors">Ask the Universe</span>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onModeChange('solar')}
          className="flex group items-center gap-3 px-4 py-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-500/30 hover:bg-black/70 transition-all shadow-lg"
        >
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Orbit size={18} className="text-amber-400/80" />
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider">3D Explorer</span>
            <span className="block text-sm text-slate-300 group-hover:text-white transition-colors">Solar System</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SpaceNavigator;
