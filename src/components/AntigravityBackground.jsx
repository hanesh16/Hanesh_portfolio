import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import sunImg from '../assets/textures/8k_sun.jpg';
import mercuryImg from '../assets/textures/8k_mercury.jpg';
import venusImg from '../assets/textures/Venus.jpg';
import earthImg from '../assets/textures/8k_earth_daymap.jpg';
import marsImg from '../assets/textures/Mars.jpg';

// Custom Sun Shader Material with Limb Darkening
const SunMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uGlowIntensity: 1.5,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader with Limb Darkening
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uGlowIntensity;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      // Sample the texture
      vec4 texColor = texture2D(uTexture, vUv);
      
      // Limb darkening effect - edges appear darker
      float limbDarkening = dot(vNormal, vec3(0.0, 0.0, 1.0));
      limbDarkening = pow(max(limbDarkening, 0.0), 0.6);
      
      // Add subtle pulsing glow
      float pulse = 1.0 + 0.05 * sin(uTime * 0.5);
      
      // Combine effects
      vec3 finalColor = texColor.rgb * limbDarkening * pulse * uGlowIntensity;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ SunMaterial });

// Responsive camera controller
const CameraController = () => {
  const { camera } = useThree();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        camera.position.set(0, 1, 14);
        camera.fov = 65;
      } else if (width < 768) {
        camera.position.set(0, 1.5, 15);
        camera.fov = 65;
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

// Enhanced Sun component with realistic 3D effects
const Sun = () => {
  const sunRef = useRef();
  const glowRef = useRef();
  const coronaRef = useRef();
  const materialRef = useRef();
  const sunTexture = useLoader(THREE.TextureLoader, sunImg);

  // Optimize texture settings
  useMemo(() => {
    sunTexture.anisotropy = 16;
    sunTexture.minFilter = THREE.LinearMipMapLinearFilter;
    sunTexture.magFilter = THREE.LinearFilter;
  }, [sunTexture]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (sunRef.current) {
      sunRef.current.rotation.y = time * 0.02;
    }

    if (materialRef.current) {
      materialRef.current.uTime = time;
    }

    // Animate glow layers
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + 0.02 * Math.sin(time * 0.8));
    }

    if (coronaRef.current) {
      coronaRef.current.rotation.z = time * 0.01;
      coronaRef.current.scale.setScalar(1 + 0.03 * Math.sin(time * 0.5 + 1));
    }
  });

  return (
    <group>
      {/* Main Sun sphere with limb darkening shader */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.2, 128, 128]} />
        <sunMaterial
          ref={materialRef}
          uTexture={sunTexture}
          uGlowIntensity={1.4}
          toneMapped={false}
        />
      </mesh>

      {/* Inner glow layer */}
      <mesh ref={glowRef} scale={1.15}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Middle corona layer */}
      <mesh ref={coronaRef} scale={1.35}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow atmosphere */}
      <mesh scale={1.6}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Far corona effect */}
      <mesh scale={2.0}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point light from sun */}
      <pointLight intensity={3} color="#ffcc44" distance={100} decay={2} />
      <pointLight intensity={1} color="#ff8844" distance={50} decay={2} />
    </group>
  );
};

// Enhanced Planet component with smoother animations
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

  // Optimize texture
  useMemo(() => {
    planetTexture.anisotropy = 8;
    planetTexture.minFilter = THREE.LinearMipMapLinearFilter;
  }, [planetTexture]);

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

  // Create orbit ring points
  const orbitPoints = useMemo(() => {
    const points = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * orbitRadius,
        0,
        Math.sin(angle) * orbitRadius
      ));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [orbitRadius]);

  return (
    <>
      {/* Orbit path - glowing line */}
      <line geometry={orbitPoints}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </line>

      {/* Planet */}
      <group ref={orbitRef}>
        <mesh ref={planetRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            map={planetTexture}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
      </group>
    </>
  );
};

// Solar System with tilted view for 3D depth
const SolarSystem = () => {
  const systemRef = useRef();
  const [position, setPosition] = useState([8, 0, -8]);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPosition([0, -3, -5]);
        setScale(0.9);
      } else if (width < 768) {
        setPosition([0, -2, -6]);
        setScale(0.9);
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
      systemRef.current.rotation.y = state.clock.getElapsedTime() * 0.008;
    }
  });

  return (
    // Tilted solar system for 3D depth perception
    <group ref={systemRef} position={position} scale={scale} rotation={[0.2, 0, 0.1]}>
      <Sun />

      <Planet
        texture={mercuryImg}
        size={0.15}
        orbitRadius={2}
        orbitSpeed={0.6}
        rotationSpeed={0.008}
        initialAngle={0}
      />

      <Planet
        texture={venusImg}
        size={0.25}
        orbitRadius={3}
        orbitSpeed={0.45}
        rotationSpeed={0.006}
        initialAngle={Math.PI / 3}
      />

      <Planet
        texture={earthImg}
        size={0.26}
        orbitRadius={4.2}
        orbitSpeed={0.35}
        rotationSpeed={0.008}
        initialAngle={Math.PI}
      />

      <Planet
        texture={marsImg}
        size={0.2}
        orbitRadius={5.5}
        orbitSpeed={0.28}
        rotationSpeed={0.007}
        initialAngle={Math.PI * 1.5}
      />
    </group>
  );
};

// Enhanced Starfield with more stars
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

      // Varying star sizes
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
      const cycle = 8; // seconds per cycle
      const t = ((time + data.delay) % cycle) / cycle;

      if (t < 0.15) {
        // Active streak phase
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

// Nebula Cloud - subtle colored fog in the far background
const NebulaCloud = () => {
  const cloudRef = useRef();

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.z = state.clock.getElapsedTime() * 0.003;
    }
  });

  return (
    <group ref={cloudRef}>
      {/* Violet nebula */}
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

      {/* Cyan nebula */}
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

      {/* Warm amber nebula */}
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

// Scene with improved lighting
const Scene = () => {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.08} />
      <NebulaCloud />
      <Starfield />
      <ShootingStars />
      <SolarSystem />
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
