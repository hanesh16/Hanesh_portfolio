import React, { useState, useEffect, useRef } from 'react';
import musicFile from '../assets/Perplexity.mp3';

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
                } catch (err) {
                    console.log("Autoplay blocked. Waiting for interaction.");
                    setIsPlaying(false);

                    // Aggressive fallback: Start on ANY interaction
                    const startAudio = () => {
                        if (audioRef.current) {
                            audioRef.current.play()
                                .then(() => {
                                    setIsPlaying(true);
                                    // Remove all listeners once playing
                                    ['click', 'mousemove', 'keydown', 'touchstart', 'scroll'].forEach(event =>
                                        document.removeEventListener(event, startAudio)
                                    );
                                })
                                .catch(e => console.error("Playback failed:", e));
                        }
                    };

                    // Listen for any user activity
                    ['click', 'mousemove', 'keydown', 'touchstart', 'scroll'].forEach(event =>
                        document.addEventListener(event, startAudio, { once: true })
                    );
                }
            }
        };

        playAudio();
    }, []);

    return (
        <div className="fixed top-6 right-6 md:top-auto md:right-auto md:bottom-6 md:left-6 z-50 flex items-center gap-3">
            <audio
                ref={audioRef}
                src={musicFile}
                loop
            />

            <button
                onClick={togglePlay}
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-white/10 hover:border-amber-400/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 overflow-hidden"
                aria-label={isPlaying ? "Pause Music" : "Play Music"}
            >
                {/* Visual Equalizer / Glow */}
                {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-40 group-hover:opacity-60">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="w-1 bg-amber-400 rounded-full animate-pulse"
                                style={{
                                    height: `${Math.random() * 40 + 20}%`,
                                    animationDuration: `${0.5 + Math.random() * 0.5}s`
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Icon */}
                <div className="relative z-10 text-slate-200 group-hover:text-amber-400 transition-colors">
                    {isPlaying ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    )}
                </div>
            </button>
            <span className={`hidden md:block text-xs font-mono tracking-widest transition-all duration-500 ${isPlaying ? 'text-amber-400/80 opacity-100' : 'text-slate-500 opacity-0 translate-x-[-10px]'}`}>
                AUDIO ON
            </span>
        </div>
    );
};

export default AudioPlayer;
