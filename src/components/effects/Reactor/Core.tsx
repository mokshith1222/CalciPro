"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { useReactorStore } from "@/hooks/use-reactor-store";

export function Core() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const pulseTrigger = useReactorStore((state) => state.pulseTrigger);
  const lastPulse = useRef(0);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Smooth idle rotation
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.rotation.z = t * 0.3;
    
    // Scale pulsing
    const pulse = Math.sin(t * 2) * 0.05 + 1;
    meshRef.current.scale.set(pulse, pulse, pulse);
    
    // Handle manual pulse trigger
    if (pulseTrigger !== lastPulse.current) {
      lastPulse.current = pulseTrigger;
      // We can use a ref value to animate the intensity
      meshRef.current.scale.set(1.5, 1.5, 1.5);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), 0.1);
    }

    glowRef.current.rotation.y = -t * 0.2;
    glowRef.current.scale.set(pulse * 1.2, pulse * 1.2, pulse * 1.2);
  });

  return (
    <group>
      {/* Main Reactor Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#00f2ff"
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
          emissive="#00f2ff"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Internal Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#7000ff" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>

      {/* Volumetric Rays (simulated with points) */}
      <points>
        <sphereGeometry args={[1.5, 32, 32]} />
        <pointsMaterial color="#00f2ff" size={0.02} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}
