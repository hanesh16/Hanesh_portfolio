import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Stars, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

import sunImg from '../assets/textures/8k_sun.jpg';
import mercuryImg from '../assets/textures/8k_mercury.jpg';
import venusImg from '../assets/textures/Venus.jpg';
import earthImg from '../assets/textures/8k_earth_daymap.jpg';
import marsImg from '../assets/textures/Mars.jpg';
import jupiterImg from '../assets/textures/Jupiter.jpg';
import saturnImg from '../assets/textures/Saturn.jpg';
import uranusImg from '../assets/textures/2k_uranus.jpg';
import neptuneImg from '../assets/textures/2k_neptune.jpg';

// --- Data ---
const planetData = {
    sun: {
        name: "The Sun",
        type: "Star",
        description: "The star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
        facts: ["Surface Temp: 5,500°C", "Mass: 333,000 x Earth", "Age: 4.6 Billion Years"]
    },
    mercury: {
        name: "Mercury",
        type: "Terrestrial Planet",
        description: "The smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets.",
        facts: ["Year: 88 Days", "Temp: -173 to 427°C", "Moons: 0"]
    },
    venus: {
        name: "Venus",
        type: "Terrestrial Planet",
        description: "Second planet from the Sun. It has a thick atmosphere that traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
        facts: ["Day Year: Longer than Year", "Temp: 462°C", "Moons: 0"]
    },
    earth: {
        name: "Earth",
        type: "Terrestrial Planet",
        description: "Our home planet. It is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
        facts: ["Moons: 1", "Water: 71% Surface", "Life: Abundant"]
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
    },
    uranus: {
        name: "Uranus",
        type: "Ice Giant",
        description: "The seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. It rotates on its side.",
        facts: ["Tilt: 97.77°", "Moons: 28", "Temp: -224°C"]
    },
    neptune: {
        name: "Neptune",
        type: "Ice Giant",
        description: "The eighth and farthest-known Solar planet from the Sun. It is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.",
        facts: ["Year: 165 Earth Years", "Moons: 16", "Winds: 2,100 km/h"]
    }
};

// --- 3D Components ---

const Sun = ({ onSelect, isSelected }) => {
    const texture = useTexture(sunImg);
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta * 0.05;
    });

    return (
        <group onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : 'sun'); }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}>

            <mesh ref={meshRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshBasicMaterial map={texture} />
                <pointLight intensity={2} color="#ffaa00" distance={100} decay={2} />
            </mesh>

            <AnimatePresence>
                {isSelected && <InfoCard planetKey="sun" onClose={() => onSelect(null)} radius={2.5} />}
            </AnimatePresence>
        </group>
    );
};

const Planet = ({ textureImg, size, orbitRadius, speed, offset, id, onSelect, isSelected }) => {
    const texture = useTexture(textureImg);
    const groupRef = useRef();
    const meshRef = useRef();
    const angleRef = useRef(offset);

    useFrame((state, delta) => {
        // Orbit Logic (Move the Group)
        if (groupRef.current) {
            angleRef.current += delta * speed * 0.5;
            const x = Math.cos(angleRef.current) * orbitRadius;
            const z = Math.sin(angleRef.current) * orbitRadius;
            groupRef.current.position.set(x, 0, z);
        }

        // Spin Logic (Rotate the Mesh)
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group ref={groupRef} onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : id); }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}>

            <mesh ref={meshRef}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial map={texture} />
            </mesh>

            <AnimatePresence>
                {isSelected && <InfoCard planetKey={id} onClose={() => onSelect(null)} radius={size} />}
            </AnimatePresence>
        </group>
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

const InfoCard = ({ planetKey, onClose, radius = 0 }) => {
    const data = planetData[planetKey];
    if (!data) return null;

    // Position the card at the "surface" (radius) + a small offset
    // Using [radius, 0, 0] places it to the right of the planet's center
    const xOffset = radius;

    return (
        <Html position={[xOffset, 0, 0]} center zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
                style={{ pointerEvents: 'auto', minWidth: '350px' }} // Ensure clicks work on the card
            >
                {/* Connecting Line */}
                <div className="relative flex items-center">
                    {/* Circle at origin */}
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                    {/* Angled Line */}
                    <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-cyan-400/50"></div>
                </div>

                {/* Card Container */}
                <div className="relative ml-2 bg-black/80 backdrop-blur-xl border border-cyan-500/30 p-5 rounded-r-2xl rounded-bl-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

                    {/* Top Accent */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"></div>

                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-3 right-3 text-cyan-400/60 hover:text-cyan-400 transition-colors z-10">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="relative z-10">
                        <div className="mb-3">
                            <span className="text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em]">{data.type}</span>
                            <h2 className="text-2xl font-bold text-white font-outfit mt-1 tracking-wide drop-shadow-md">{data.name}</h2>
                        </div>

                        <p className="text-slate-300 text-xs leading-relaxed mb-4 border-b border-white/10 pb-3 font-light">
                            {data.description}
                        </p>

                        <div className="space-y-1.5">
                            {data.facts.map((fact, i) => (
                                <div key={i} className="flex items-center text-[10px] font-mono text-cyan-200/80">
                                    <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 shadow-[0_0_4px_cyan]"></span>
                                    {fact}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-2xl"></div>
                </div>
            </motion.div>
        </Html>
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



            <div className="w-full h-full">
                <Canvas camera={{ position: [0, 30, 40], fov: 45 }}>
                    <ambientLight intensity={0.1} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <OrbitControls
                        enablePan={false}
                        minDistance={10}
                        maxDistance={80}
                        enabled={isInteractionEnabled} // Controlled by toggle
                        autoRotate={!isInteractionEnabled} // Auto-rotate when idle/disabled
                        autoRotateSpeed={0.5}
                    />

                    <Suspense fallback={null}>

                        <Sun onSelect={setSelectedPlanet} isSelected={selectedPlanet === 'sun'} />

                        {/* Orbits Visuals - Expanded for 8 Planets */}
                        <OrbitPath radius={3.2} /> {/* Mercury */}
                        <OrbitPath radius={4.5} /> {/* Venus */}
                        <OrbitPath radius={6.0} /> {/* Earth */}
                        <OrbitPath radius={7.8} /> {/* Mars */}
                        <OrbitPath radius={12} /> {/* Jupiter */}
                        <OrbitPath radius={16} /> {/* Saturn */}
                        <OrbitPath radius={20} /> {/* Uranus */}
                        <OrbitPath radius={24} /> {/* Neptune */}

                        {/* Planets - Correct Order & Relative Scales */}

                        {/* 1. Mercury - Tiny, grayish, super close */}
                        <Planet id="mercury" textureImg={mercuryImg} size={0.38} orbitRadius={3.2} speed={1.2} offset={Math.random() * 6} onSelect={setSelectedPlanet} isSelected={selectedPlanet === 'mercury'} />

                        {/* 2. Venus - Bright, close */}
                        <Planet id="venus" textureImg={venusImg} size={0.95} orbitRadius={4.5} speed={0.9} offset={Math.random() * 6} onSelect={setSelectedPlanet} isSelected={selectedPlanet === 'venus'} />

                        {/* 3. Earth - Our Blue Marble */}
                        <Planet id="earth" textureImg={earthImg} size={1.0} orbitRadius={6.0} speed={0.7} offset={Math.random() * 6} onSelect={setSelectedPlanet} isSelected={selectedPlanet === 'earth'} />

                        {/* 4. Mars - Red, smaller */}
                        <Planet id="mars" textureImg={marsImg} size={0.53} orbitRadius={7.8} speed={0.6} offset={Math.random() * 6} onSelect={setSelectedPlanet} isSelected={selectedPlanet === 'mars'} />

                        {/* 5. Jupiter - Huge, fast self-spin but slow orbit */}
                        <Planet id="jupiter" textureImg={jupiterImg} size={3.0} orbitRadius={12} speed={0.3} offset={Math.random() * 6} onSelect={setSelectedPlanet} isSelected={selectedPlanet === 'jupiter'} />

                        {/* 6. Saturn - Large, rings */}
                        <Planet id="saturn" textureImg={saturnImg} size={2.5} orbitRadius={16} speed={0.2} offset={Math.random() * 6} onSelect={setSelectedPlanet} isSelected={selectedPlanet === 'saturn'} />

                        {/* 7. Uranus - Cyan, far out */}
                        <Planet id="uranus" textureImg={uranusImg} size={1.8} orbitRadius={20} speed={0.15} offset={Math.random() * 6} onSelect={setSelectedPlanet} isSelected={selectedPlanet === 'uranus'} />

                        {/* 8. Neptune - Deep blue, furthest */}
                        <Planet id="neptune" textureImg={neptuneImg} size={1.7} orbitRadius={24} speed={0.1} offset={Math.random() * 6} onSelect={setSelectedPlanet} isSelected={selectedPlanet === 'neptune'} />

                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

// Preload textures
useTexture.preload(sunImg);
useTexture.preload(mercuryImg);
useTexture.preload(venusImg);
useTexture.preload(earthImg);
useTexture.preload(marsImg);
useTexture.preload(jupiterImg);
useTexture.preload(saturnImg);
useTexture.preload(uranusImg);
useTexture.preload(neptuneImg);

export default SolarSystemExplorer;
