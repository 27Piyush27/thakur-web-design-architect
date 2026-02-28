import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, MeshWobbleMaterial, Environment, Sparkles as DreiSparkles } from '@react-three/drei';
import { useRef, useMemo } from 'react';
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
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.8}
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
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.8, 0.35, 32, 100]} />
        <MeshWobbleMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          factor={0.4}
          speed={1.5}
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
          iridescence={1}
          iridescenceIOR={1.3}
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
  
  const { positions } = useMemo(() => {
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
    
    return { positions: new Float32Array(pos) };
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
      <spotLight position={[5, 15, 5]} angle={0.3} penumbra={1} intensity={0.5} color="#c084fc" />
      
      {/* Hyper-realistic glass orbs */}
      <GlassOrb position={[-3.5, 1.5, -2]} color="#8b5cf6" scale={0.8} />
      <GlassOrb position={[3, -1, -1]} color="#06b6d4" scale={0.6} />
      <GlassOrb position={[0, 3, -4]} color="#a78bfa" scale={1} />
      
      {/* Wobble torus */}
      <WobbleTorus position={[-2, -2.5, 0.5]} color="#c084fc" />
      
      {/* Iridescent icosphere */}
      <IcoSphere position={[2.5, 2, -2.5]} color="#7c3aed" />
      
      {/* Sparkles */}
      <DreiSparkles count={80} scale={15} size={2} speed={0.4} opacity={0.4} color="#a78bfa" />
      
      {/* Connected lines network */}
      <ConnectedLines />
      
      {/* Particle field */}
      <ParticleField />
      
      {/* Controls */}
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

export default function Hero3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene3D />
      </Canvas>
    </div>
  );
}
