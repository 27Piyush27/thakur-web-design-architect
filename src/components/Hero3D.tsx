import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlassOrb({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.6;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function WobbleTorus({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.8, 0.35, 32, 100]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </Float>
  );
}

function IcoSphere({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.4;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.8}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshPhysicalMaterial
          color={color}
          metalness={1}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const particlesCount = 200;

  const particles = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a78bfa" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function ConnectedLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const positions = useMemo(() => {
    const pos: number[] = [];
    const nodeCount = 30;
    const nodes: [number, number, number][] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push([
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
      ]);
    }
    
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 4) {
          pos.push(...nodes[i], ...nodes[j]);
        }
      }
    }
    
    return new Float32Array(pos);
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.12} />
    </lineSegments>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#a78bfa" />
      <pointLight position={[-10, -5, -10]} intensity={0.8} color="#6366f1" />
      <pointLight position={[0, -10, 5]} intensity={0.5} color="#22d3ee" />
      
      <GlassOrb position={[-3.5, 1.5, -2]} color="#8b5cf6" scale={0.8} />
      <GlassOrb position={[3, -1, -1]} color="#06b6d4" scale={0.6} />
      <GlassOrb position={[0, 3, -4]} color="#a78bfa" scale={1} />
      
      <WobbleTorus position={[-2, -2.5, 0.5]} color="#c084fc" />
      <IcoSphere position={[2.5, 2, -2.5]} color="#7c3aed" />
      
      <ConnectedLines />
      <ParticleField />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        maxPolarAngle={Math.PI / 2} 
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

function WebGLFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-indigo-900/20 to-cyan-900/30 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-violet-500/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-cyan-500/15 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-indigo-500/20 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}

export default function Hero3D() {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) return <WebGLFallback />;

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          if (!gl) setWebglSupported(false);
        }}
      >
        <Scene3D />
      </Canvas>
    </div>
  );
}
