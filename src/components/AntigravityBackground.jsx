import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import sunImg from '../assets/textures/8k_sun.jpg';
import mercuryImg from '../assets/textures/8k_mercury.jpg';
import venusImg from '../assets/textures/Venus.jpg';
import earthImg from '../assets/textures/8k_earth_daymap.jpg';
import marsImg from '../assets/textures/Mars.jpg';

// Responsive camera controller
const CameraController = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile) {
        camera.position.set(0, 1, 18);
        camera.fov = 75;
      } else {
        camera.position.set(0, 2, 12);
        camera.fov = 60;
      }
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera]);

  return null;
};

// Sun component
const Sun = () => {
  const sunRef = useRef();
  const sunTexture = useLoader(THREE.TextureLoader, sunImg);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshBasicMaterial map={sunTexture} toneMapped={false} />
      <pointLight intensity={2} color="#ffaa00" distance={100} decay={2} />
    </mesh>
  );
};

// Planet component
const Planet = ({ 
  texture, 
  size, 
  orbitRadius, 
  orbitSpeed, 
  rotationSpeed,
  initialAngle = 0,
}) => {
  const planetRef = useRef();
  const orbitRef = useRef();
  const planetTexture = useLoader(THREE.TextureLoader, texture);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (orbitRef.current) {
      const angle = initialAngle + time * orbitSpeed;
      orbitRef.current.position.x = Math.cos(angle) * orbitRadius;
      orbitRef.current.position.z = Math.sin(angle) * orbitRadius;
    }
    
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          map={planetTexture}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.02, orbitRadius + 0.02, 128]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.03} 
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Solar System with responsive positioning
const SolarSystem = () => {
  const systemRef = useRef();
  const [position, setPosition] = useState([8, 0, -8]);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPosition([3, 0, -6]);
        setScale(0.6);
      } else if (width < 768) {
        setPosition([5, 0, -7]);
        setScale(0.75);
      } else if (width < 1024) {
        setPosition([6, 0, -8]);
        setScale(0.85);
      } else {
        setPosition([8, 0, -8]);
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state) => {
    if (systemRef.current) {
      systemRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <group ref={systemRef} position={position} scale={scale}>
      <Sun />
      
      <Planet
        texture={mercuryImg}
        size={0.15}
        orbitRadius={2}
        orbitSpeed={0.8}
        rotationSpeed={0.01}
        initialAngle={0}
      />
      
      <Planet
        texture={venusImg}
        size={0.25}
        orbitRadius={3}
        orbitSpeed={0.6}
        rotationSpeed={0.008}
        initialAngle={Math.PI / 3}
      />
      
      <Planet
        texture={earthImg}
        size={0.26}
        orbitRadius={4.2}
        orbitSpeed={0.5}
        rotationSpeed={0.01}
        initialAngle={Math.PI}
      />
      
      <Planet
        texture={marsImg}
        size={0.2}
        orbitRadius={5.5}
        orbitSpeed={0.4}
        rotationSpeed={0.009}
        initialAngle={Math.PI * 1.5}
      />
    </group>
  );
};

// Distant stars
const Starfield = () => {
  const starsRef = useRef();
  const starCount = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 30 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.002;
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
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Scene
const Scene = () => {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.1} />
      <Starfield />
      <SolarSystem />
    </>
  );
};

const AntigravityBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1]" style={{ background: '#000000' }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default AntigravityBackground;
