import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';
import sunImg from '../assets/textures/8k_sun.jpg';

import venusImg from '../assets/textures/Venus.jpg';
import marsImg from '../assets/textures/Mars.jpg';
import jupiterImg from '../assets/textures/Jupiter.jpg';
import saturnImg from '../assets/textures/Saturn.jpg';

const Sun = () => {
    const texture = useTexture(sunImg);
    const sunRef = useRef();

    useFrame((state, delta) => {
        if (sunRef.current) {
            sunRef.current.rotation.y += delta * 0.05; // Slow rotation
        }
    });

    return (
        <mesh ref={sunRef}>
            <sphereGeometry args={[1.8, 64, 64]} />
            <meshBasicMaterial map={texture} color="#cccccc" />
        </mesh>
    );
};

const Planet = ({ textureImg, size, orbitRadius, speed, offset }) => {
    const texture = useTexture(textureImg);
    const planetRef = useRef();
    const angleRef = useRef(offset); // Start at random angle

    useFrame((state, delta) => {
        if (planetRef.current) {
            // Update Orbit Angle
            angleRef.current += delta * speed;

            // Orbit around local origin [0, 0, 0] (Sun's position)
            const x = Math.cos(angleRef.current) * orbitRadius;
            const z = Math.sin(angleRef.current) * orbitRadius;

            planetRef.current.position.set(x, 0, z); // Keep Y same as Sun

            // Self-Rotation
            planetRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <mesh ref={planetRef}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

const SolarSystem = () => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 7; // Threshold for mobile layout

    // Responsive Position:
    // Desktop: Right side [10, 1.5, -12] (Moved further right)
    // Mobile: Centered, Higher, Further back [0, 2.5, -18]
    const position = isMobile ? [0, 2.5, -18] : [10, 1.5, -12];

    return (
        <group position={position}>
            <pointLight intensity={1.0} color="#ffaa00" /> {/* Sun Light at center of group */}
            <Sun />
            {/* Venus: Small, close, fast */}
            <Planet textureImg={venusImg} size={0.3} orbitRadius={2.8} speed={0.5} offset={0} />
            {/* Mars: Small, red, moderate */}
            <Planet textureImg={marsImg} size={0.25} orbitRadius={3.8} speed={0.3} offset={2} />
            {/* Jupiter: Huge, far, slow */}
            <Planet textureImg={jupiterImg} size={0.8} orbitRadius={5.5} speed={0.15} offset={4} />
            {/* Saturn: Large, very far, very slow */}
            <Planet textureImg={saturnImg} size={0.7} orbitRadius={7.5} speed={0.1} offset={1} />
        </group>
    );
};

const ParticleGroup = ({ count, size, radius, sunTexture }) => {
    const ref = useRef();

    // Generate random points in different shapes for THIS group
    const [sphere, galaxy, ring] = useMemo(() => {
        // 1. Cube/Sphere (Cloud) - Expanded random spread
        // Using inSphere gives a ball, let's flatten it slightly for better screen coverage
        const s = new Float32Array(count * 3);
        const randomSphere = random.inSphere(new Float32Array(count * 3), { radius: radius });
        for (let i = 0; i < count * 3; i += 3) {
            s[i] = randomSphere[i] * 1.5; // Wider X
            s[i + 1] = randomSphere[i + 1] * 1.2; // Taller Y
            s[i + 2] = randomSphere[i + 2];
        }

        // 2. Galaxy (Spiral)
        const g = new Float32Array(count * 3);
        const spiralRadius = radius * 0.8;
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const angle = Math.random() * Math.PI * 2 * 3; // 3 turns
            const r = Math.random() * spiralRadius;
            const spiralOffset = r * 0.5;
            g[i3] = Math.cos(angle + spiralOffset) * r;
            g[i3 + 1] = (Math.random() - 0.5) * (radius * 0.2); // More vertical spread
            g[i3 + 2] = Math.sin(angle + spiralOffset) * r;
        }

        // 3. Ring (Saturn-like)
        const r = new Float32Array(count * 3);
        const innerRadius = radius * 0.4;
        const outerRadius = radius * 1.0;
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const theta = Math.random() * Math.PI * 2;
            const rad = Math.sqrt(Math.random() * (outerRadius ** 2 - innerRadius ** 2) + innerRadius ** 2);
            r[i3] = Math.cos(theta) * rad;
            r[i3 + 1] = (Math.random() - 0.5) * 0.5; // Flat but visible
            r[i3 + 2] = Math.sin(theta) * rad;
        }

        return [s, g, r];
    }, [count, radius]);

    useFrame((state) => {
        const { clock, pointer, viewport } = state;
        const refState = ref.current;
        if (!refState) return;

        const t = clock.elapsedTime;
        const positions = refState.geometry.attributes.position.array;

        // Interaction
        const mx = (pointer.x * viewport.width) / 2;
        const my = (pointer.y * viewport.height) / 2;
        const repulsionRadius = 1.0; // Larger interaction radius
        const repulsionForce = 0.8;

        // Morphing Logic
        const cycleDuration = 10;
        const totalCycle = cycleDuration * 3;
        const timeInCycle = t % totalCycle;

        let startShape, endShape, progress;

        if (timeInCycle < cycleDuration) {
            startShape = sphere;
            endShape = galaxy;
            progress = timeInCycle / cycleDuration;
        } else if (timeInCycle < cycleDuration * 2) {
            startShape = galaxy;
            endShape = ring;
            progress = (timeInCycle - cycleDuration) / cycleDuration;
        } else {
            startShape = ring;
            endShape = sphere;
            progress = (timeInCycle - cycleDuration * 2) / cycleDuration;
        }

        const ease = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        const smoothProgress = ease(progress);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Interpolate
            const sx = startShape[i3];
            const sy = startShape[i3 + 1];
            const sz = startShape[i3 + 2];

            const ex = endShape[i3];
            const ey = endShape[i3 + 1];
            const ez = endShape[i3 + 2];

            const tx = sx + (ex - sx) * smoothProgress;
            const ty = sy + (ey - sy) * smoothProgress;
            const tz = sz + (ez - sz) * smoothProgress;

            // Rotate
            const rotSpeed = t * 0.05;
            const rx = tx * Math.cos(rotSpeed) - tz * Math.sin(rotSpeed);
            const rz = tx * Math.sin(rotSpeed) + tz * Math.cos(rotSpeed);
            const ry = ty;

            // Tilt
            const tilt = 0.3;
            const fx = rx;
            const fy = ry * Math.cos(tilt) - rz * Math.sin(tilt);
            const fz = ry * Math.sin(tilt) + rz * Math.cos(tilt);

            // Interaction
            const dx = mx - fx;
            const dy = my - fy;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            positions[i3] = fx;
            positions[i3 + 1] = fy;
            positions[i3 + 2] = fz;

            // Use simple repulsion
            if (dist < repulsionRadius) {
                const f = (repulsionRadius - dist) / repulsionRadius;
                const a = Math.atan2(dy, dx);
                positions[i3] -= Math.cos(a) * f * repulsionForce;
                positions[i3 + 1] -= Math.sin(a) * f * repulsionForce;
            }
        }

        refState.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                map={sunTexture}
                color="#ffffff"
                size={size}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.8}
            />
        </Points>
    );
};

const AntigravityBackground = () => {
    // Generate Sun Texture once (High Resolution for 4K)
    const sunTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64; // Increased from 32 for sharper look
        canvas.height = 64;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 215, 0, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(canvas);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                dpr={[1, 2]} // Support High-DPI (Retina/4K) screens
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: false
                }}
                performance={{ min: 0.5 }} // Adaptive quality if FPS drops
                eventSource={document.getElementById('root')}
            >
                <ambientLight intensity={0.1} />

                <Suspense fallback={null}>
                    <SolarSystem />
                </Suspense>

                {/* 1. Small Background Stars (Dense, Wide) */}
                <ParticleGroup count={1000} size={0.012} radius={12} sunTexture={sunTexture} />

                {/* 2. Medium Stars (Interactive, Mid-range) */}
                <ParticleGroup count={300} size={0.025} radius={8} sunTexture={sunTexture} />

                {/* 3. Large Glowing Suns (Sparse, Close) */}
                <ParticleGroup count={60} size={0.05} radius={5} sunTexture={sunTexture} />
            </Canvas>
        </div>
    );
};

export default AntigravityBackground;
