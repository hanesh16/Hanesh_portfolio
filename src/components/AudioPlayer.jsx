import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import musicFile from '../assets/Perplexity.mp3';

// Pre-computed equalizer bar values at module level (computed once when module loads)
const EQUALIZER_BARS = [1, 2, 3, 4, 5].map((i) => ({
    id: i,
    height: Math.random() * 40 + 20,
    duration: 0.5 + Math.random() * 0.5,
}));

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => {
                    console.error("Playback failed", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        // Attempt to play on mount
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.5;
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch {
                    console.log("Autoplay blocked. Waiting for ANY interaction.");
                    setIsPlaying(false);

                    // Robust Fallback: Trigger play on the very first user interaction of ANY kind
                    const enableAudio = () => {
                        if (audioRef.current) {
                            audioRef.current.play()
                                .then(() => {
                                    setIsPlaying(true);
                                    // Cleanup all listeners immediately
                                    ['click', 'scroll', 'keydown', 'mousemove', 'touchstart'].forEach(evt =>
                                        document.removeEventListener(evt, enableAudio)
                                    );
                                })
                                .catch(e => console.error("Still blocked:", e));
                        }
                    };

                    // Add listeners for every possible interaction
                    ['click', 'scroll', 'keydown', 'mousemove', 'touchstart'].forEach(evt =>
                        document.addEventListener(evt, enableAudio, { once: true })
                    );
                }
            }
        };

        playAudio();
    }, []);

    return (
        <div className="fixed top-4 right-4 md:top-auto md:right-auto md:bottom-6 md:left-6 z-40 flex items-center gap-3">
            <audio
                ref={audioRef}
                src={musicFile}
                loop
            />

            <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10"
                aria-label={isPlaying ? "Pause Music" : "Play Music"}
            >
                {/* Orbital ring animation - same as HK button */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-amber-500/30"
                />

                {/* Inner glow on hover */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Background circle */}
                <div className="absolute inset-0.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 group-hover:border-amber-500/30 transition-colors" />

                {/* Playing indicator pulse */}
                {isPlaying && (
                    <motion.div
                        className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-500/80"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.6, 1]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                )}

                {/* Icon */}
                <div className="relative z-10 text-slate-200 group-hover:text-amber-400 transition-colors">
                    {isPlaying ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    )}
                </div>
            </motion.button>
            <span className={`hidden md:block text-xs font-mono tracking-widest transition-all duration-500 ${isPlaying ? 'text-amber-400/80 opacity-100' : 'text-slate-500 opacity-0 translate-x-[-10px]'}`}>
                AUDIO ON
            </span>
        </div>
    );
};

export default AudioPlayer;

