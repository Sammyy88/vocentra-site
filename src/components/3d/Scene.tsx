import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

const MorphingGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { darkMode } = useStore();
  const sphereColor = darkMode ? "#111111" : "#ffffff";
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <MeshDistortMaterial 
          color={sphereColor}
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.8} 
          roughness={0.2} 
          distort={0.4} 
          speed={2} 
        />
      </mesh>
    </Float>
  );
};

const MouseParallax = () => {
  const { camera, mouse } = useThree();
  const target = new THREE.Vector3();

  useFrame(() => {
    target.set((mouse.x * 2), (mouse.y * 2), camera.position.z);
    camera.position.lerp(target, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

export const Scene: React.FC = () => {
  const { darkMode } = useStore();
  const bgColor = darkMode ? '#111111' : '#F8F8F6';
  
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-colors duration-700">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.25]}>
        <color attach="background" args={[bgColor]} />
        
        {/* Ambient & Directional Lighting for calm cinematic feel */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#e5e7eb" />
        
        <Environment preset="city" />
        <fog attach="fog" args={[bgColor, 10, 20]} />

        {/* Floating Particles - Reduced count for performance */}
        <Sparkles count={50} scale={15} size={2} speed={0.4} opacity={0.3} color={darkMode ? "#9CA3AF" : "#6B7280"} />
        <Sparkles count={20} scale={10} size={4} speed={0.2} opacity={0.5} color={darkMode ? "#ffffff" : "#111111"} />

        {/* Central Abstract Shape */}
        <MorphingGeometry />

        {/* Camera Movement */}
        <MouseParallax />

        {/* Post Processing - Removed DepthOfField for mobile performance */}
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
