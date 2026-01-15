import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

import sunImg from '../assets/textures/8k_sun.jpg';
import venusImg from '../assets/textures/Venus.jpg';
import marsImg from '../assets/textures/Mars.jpg';
import jupiterImg from '../assets/textures/Jupiter.jpg';
import saturnImg from '../assets/textures/Saturn.jpg';

// --- Data ---
const planetData = {
    sun: {
        name: "The Sun",
        type: "Star",
        description: "The star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
        facts: ["Surface Temp: 5,500°C", "Mass: 333,000 x Earth", "Age: 4.6 Billion Years"]
    },
    venus: {
        name: "Venus",
        type: "Terrestrial Planet",
        description: "Second planet from the Sun. It has a thick atmosphere that traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
        facts: ["Day Year: Longer than Year", "Temp: 462°C", "Moons: 0"]
    },
    mars: {
        name: "Mars",
        type: "Terrestrial Planet",
        description: "The fourth planet from the Sun. Known as the Red Planet due to iron oxide on its surface. It resembles Earth but is cold, dusty, and has a thin atmosphere.",
        facts: ["Gravity: 38% of Earth", "Moons: 2 (Phobos, Deimos)", "Mission Target: High"]
    },
    jupiter: {
        name: "Jupiter",
        type: "Gas Giant",
        description: "The largest planet in our solar system. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets combined.",
        facts: ["Moons: 95+", "Great Red Spot", "Day Length: 10 Hours"]
    },
    saturn: {
        name: "Saturn",
        type: "Gas Giant",
        description: "The sixth planet from the Sun and the second-largest in the Solar System. It is best known for its fabulous ring system that was first discovered in 1610.",
        facts: ["Rings: 7 Groups", "Moons: 146", "Density: Less than water"]
    }
};

// --- 3D Components ---

const Sun = ({ onSelect }) => {
    const texture = useTexture(sunImg);
    const sunRef = useRef();

    useFrame((state, delta) => {
        if (sunRef.current) sunRef.current.rotation.y += delta * 0.05;
    });

    return (
        <mesh ref={sunRef} onClick={(e) => { e.stopPropagation(); onSelect('sun'); }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}>
            <sphereGeometry args={[2.5, 64, 64]} />
            <meshBasicMaterial map={texture} />
            <pointLight intensity={2} color="#ffaa00" distance={100} decay={2} />
        </mesh>
    );
};

const Planet = ({ textureImg, size, orbitRadius, speed, offset, id, onSelect }) => {
    const texture = useTexture(textureImg);
    const planetRef = useRef();
    const angleRef = useRef(offset);

    useFrame((state, delta) => {
        if (planetRef.current) {
            angleRef.current += delta * speed * 0.5; // Slightly slower for exploration
            const x = Math.cos(angleRef.current) * orbitRadius;
            const z = Math.sin(angleRef.current) * orbitRadius;
            planetRef.current.position.set(x, 0, z);
            planetRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <mesh ref={planetRef} onClick={(e) => { e.stopPropagation(); onSelect(id); }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

const OrbitPath = ({ radius }) => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
            <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
        </mesh>
    );
};

// --- UI Components ---

const InfoCard = ({ planetKey, onClose }) => {
    const data = planetData[planetKey];
    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="absolute bottom-10 right-6 md:right-10 md:bottom-20 z-20 max-w-sm w-full"
        >
            <div className="bg-black/60 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
                {/* Decorative border gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-blue-500"></div>

                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="mb-2">
                    <span className="text-amber-400 text-xs font-mono uppercase tracking-widest">{data.type}</span>
                    <h2 className="text-3xl font-bold text-white font-outfit mt-1">{data.name}</h2>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 border-b border-white/10 pb-4">
                    {data.description}
                </p>

                <div className="grid grid-cols-1 gap-2">
                    {data.facts.map((fact, i) => (
                        <div key={i} className="flex items-center text-xs font-mono text-slate-400 bg-white/5 p-2 rounded">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                            {fact}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

import { Lock, Unlock, MousePointer2 } from 'lucide-react';

// ... (existing imports)

const SolarSystemExplorer = () => {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [isInteractionEnabled, setIsInteractionEnabled] = useState(false);

    return (
        <section
            className={`relative w-full h-[100dvh] bg-black overflow-hidden group ${isInteractionEnabled ? 'touch-none' : 'touch-auto'}`}
        >
            {/* Scroll Shield - Critical for Mobile */}
            {/* When locked, this invisible layer sits ON TOP of the Canvas but BELOW the UI. */}
            {/* It captures touches so the browser scrolls naturally, preventing the Canvas from "stealing" the gesture. */}
            {!isInteractionEnabled && (
                <div
                    className="absolute inset-0 z-20 w-full h-full"
                    style={{ touchAction: 'auto' }}
                />
            )}

            {/* UI Overlay - Mobile Adjusted Position */}
            <div className="absolute top-24 left-6 md:top-6 md:left-6 z-30 pointer-events-none">
                <h3 className="text-white font-mono text-sm md:text-xl font-bold tracking-widest uppercase opacity-80">
                    System Explorer
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isInteractionEnabled ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse' : 'bg-amber-500/50'}`}></span>
                    <p className="text-slate-500 font-mono text-[10px] md:text-sm uppercase tracking-wider">
                        {isInteractionEnabled ? "Manual Control" : "Autopilot Engaged"}
                    </p>
                </div>
            </div>

            {/* Toggle Switch - Mobile Adjusted Position & Round Style */}
            <div className="absolute top-24 right-6 md:top-6 md:right-6 z-30">
                <button
                    onClick={() => setIsInteractionEnabled(!isInteractionEnabled)}
                    className={`group w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300 ${isInteractionEnabled
                        ? 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                    aria-label={isInteractionEnabled ? "Disable Interaction" : "Enable Interaction"}
                >
                    {isInteractionEnabled ? <Unlock size={20} /> : <Lock size={20} />}

                    {/* Tooltip for Desktop */}
                    <span className="absolute right-full mr-3 px-2 py-1 bg-black/80 border border-white/10 rounded text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
                        {isInteractionEnabled ? "Lock View" : "Enable Interaction"}
                    </span>
                </button>
            </div>

            <AnimatePresence>
                {selectedPlanet && <InfoCard planetKey={selectedPlanet} onClose={() => setSelectedPlanet(null)} />}
            </AnimatePresence>

            <div className="w-full h-full">
                <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
                    <ambientLight intensity={0.1} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <OrbitControls
                        enablePan={false}
                        minDistance={10}
                        maxDistance={60}
                        enabled={isInteractionEnabled} // Controlled by toggle
                        autoRotate={!isInteractionEnabled} // Auto-rotate when idle/disabled
                        autoRotateSpeed={0.5}
                    />

                    <Suspense fallback={null}>
                        <Sun onSelect={setSelectedPlanet} />

                        {/* Orbits Visuals */}
                        <OrbitPath radius={4} />
                        <OrbitPath radius={6} />
                        <OrbitPath radius={10} />
                        <OrbitPath radius={15} />

                        {/* Planets */}
                        <Planet id="venus" textureImg={venusImg} size={0.6} orbitRadius={4} speed={0.8} offset={0} onSelect={setSelectedPlanet} />
                        <Planet id="mars" textureImg={marsImg} size={0.5} orbitRadius={6} speed={0.6} offset={2} onSelect={setSelectedPlanet} />
                        <Planet id="jupiter" textureImg={jupiterImg} size={1.2} orbitRadius={10} speed={0.3} offset={4} onSelect={setSelectedPlanet} />
                        <Planet id="saturn" textureImg={saturnImg} size={1.0} orbitRadius={15} speed={0.2} offset={1} onSelect={setSelectedPlanet} />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

// Preload textures
useTexture.preload(sunImg);
useTexture.preload(venusImg);
useTexture.preload(marsImg);
useTexture.preload(jupiterImg);
useTexture.preload(saturnImg);

export default SolarSystemExplorer;
