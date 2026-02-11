import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Enhanced Starfield
const Starfield = () => {
    const starsRef = useRef();
    const starCount = 3000;

    const [positions, sizes] = useMemo(() => {
        const pos = new Float32Array(starCount * 3);
        const size = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            const radius = 30 + Math.random() * 60;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i3 + 2] = radius * Math.cos(phi);

            size[i] = 0.02 + Math.random() * 0.04;
        }
        return [pos, size];
    }, []);

    useFrame((state) => {
        if (starsRef.current) {
            starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.001;
        }
    });

    return (
        <points ref={starsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={starCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#ffffff"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// Shooting Stars / Meteors
const ShootingStars = () => {
    const meteorCount = 5;
    const meteorsRef = useRef([]);

    const meteorData = useMemo(() => {
        return Array.from({ length: meteorCount }, () => ({
            startX: (Math.random() - 0.5) * 80,
            startY: 15 + Math.random() * 25,
            startZ: -20 - Math.random() * 30,
            angle: -0.3 - Math.random() * 0.4,
            speed: 8 + Math.random() * 12,
            delay: Math.random() * 15,
            length: 1.5 + Math.random() * 2.5,
        }));
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        meteorsRef.current.forEach((mesh, i) => {
            if (!mesh) return;
            const data = meteorData[i];
            const cycle = 8;
            const t = ((time + data.delay) % cycle) / cycle;

            if (t < 0.15) {
                const progress = t / 0.15;
                mesh.visible = true;
                mesh.position.x = data.startX + progress * data.speed * 4 * Math.cos(data.angle);
                mesh.position.y = data.startY + progress * data.speed * 4 * Math.sin(data.angle);
                mesh.position.z = data.startZ;
                mesh.material.opacity = Math.sin(progress * Math.PI) * 0.7;
            } else {
                mesh.visible = false;
            }
        });
    });

    return (
        <group>
            {meteorData.map((data, i) => {
                const dx = Math.cos(data.angle) * data.length;
                const dy = Math.sin(data.angle) * data.length;
                const points = [
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(dx, dy, 0),
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);

                return (
                    <line
                        key={i}
                        ref={(el) => (meteorsRef.current[i] = el)}
                        geometry={geometry}
                        visible={false}
                    >
                        <lineBasicMaterial
                            color="#ffffff"
                            transparent
                            opacity={0}
                            blending={THREE.AdditiveBlending}
                            linewidth={1}
                        />
                    </line>
                );
            })}
        </group>
    );
};

// Nebula Cloud - subtle colored fog
const NebulaCloud = () => {
    const cloudRef = useRef();

    useFrame((state) => {
        if (cloudRef.current) {
            cloudRef.current.rotation.z = state.clock.getElapsedTime() * 0.003;
        }
    });

    return (
        <group ref={cloudRef}>
            <mesh position={[-25, 15, -50]} rotation={[0, 0, 0.3]}>
                <planeGeometry args={[40, 25]} />
                <meshBasicMaterial
                    color="#7c3aed"
                    transparent
                    opacity={0.015}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh position={[30, -10, -55]} rotation={[0, 0, -0.5]}>
                <planeGeometry args={[35, 20]} />
                <meshBasicMaterial
                    color="#06b6d4"
                    transparent
                    opacity={0.012}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh position={[0, 20, -60]} rotation={[0.2, 0, 0.1]}>
                <planeGeometry args={[50, 30]} />
                <meshBasicMaterial
                    color="#f59e0b"
                    transparent
                    opacity={0.008}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

// Scene - stars, shooting stars, nebula (no sun)
const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.05} />
            <NebulaCloud />
            <Starfield />
            <ShootingStars />
        </>
    );
};

const AntigravityBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1]" style={{ background: '#000000' }}>
            <Canvas
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: true,
                }}
                camera={{ fov: 60, near: 0.1, far: 200 }}
                performance={{ min: 0.5 }}
                style={{ touchAction: 'none' }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default AntigravityBackground;
