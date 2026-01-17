import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children, className = "", index = 0, variant = "default" }) => {
    const ref = useRef(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Tilt transformations
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Glare gradient position
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;

        // Normalize values to -0.5 to 0.5 range
        const xPct = (mouseXRel / width) - 0.5;
        const yPct = (mouseYRel / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const isSciFi = variant === "scifi" || variant === "scifi-tech";
    const isTechShape = variant === "scifi-tech";

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
            viewport={{ once: true }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative perspective-1000 ${className}`}
        >
            <div
                className={`h-full w-full relative group transform-gpu ${isSciFi ? '' : 'holo-glass rounded-xl overflow-hidden'}`}
                style={isSciFi ? {
                    clipPath: isTechShape
                        ? "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)" // Aggressive Tech Shape
                        : "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                    backgroundColor: "rgba(0, 0, 0, 0.4)", // More transparent black
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backgroundImage: `
                        radial-gradient(white, rgba(255, 255, 255, .2) 2px, transparent 3px),
                        radial-gradient(white, rgba(255, 255, 255, .15) 1px, transparent 2px),
                        radial-gradient(white, rgba(255, 255, 255, .1) 2px, transparent 3px)
                    `,
                    backgroundSize: "550px 550px, 350px 350px, 250px 250px",
                    backgroundPosition: "0 0, 40px 60px, 130px 270px"
                } : {}}
            >
                {/* Visual "Glowing Stars" for SciFi */}
                {isSciFi && (
                    <>
                        <div className="absolute top-10 right-10 w-1 h-1 bg-white rounded-full animate-pulse z-0" style={{ boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.6)" }}></div>
                        <div className="absolute bottom-20 left-10 w-[2px] h-[2px] bg-sky-200 rounded-full animate-pulse z-0" style={{ animationDelay: "1s", boxShadow: "0 0 8px 1px rgba(186, 230, 253, 0.6)" }}></div>
                        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-amber-100 rounded-full animate-pulse z-0" style={{ animationDelay: "2s", boxShadow: "0 0 8px 1px rgba(254, 243, 199, 0.4)", opacity: 0.6 }}></div>
                    </>
                )}

                {/* Tech Shape Decorations (Lines/Notches visual effect) */}
                {isTechShape && (
                    <div className="absolute inset-0 pointer-events-none border border-white/5" style={{ clipPath: "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)" }}></div>
                )}


                {/* Glare Effect */}
                <motion.div
                    style={{
                        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 60%)`
                    }}
                    className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                />

                {/* Liquid Background Layer */}
                {!isSciFi && (
                    <div className="absolute inset-0 z-0 liquid-bg opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)' }}>
                    </div>
                )}

                {/* Content Container */}
                <div className="relative z-10 h-full transform-gpu translate-z-10 p-6 md:p-8">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default TiltCard;
