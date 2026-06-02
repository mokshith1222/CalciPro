"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Torus } from "@react-three/drei";

export function Rings() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ringsRef.current) return;
    const t = state.clock.getElapsedTime();
    
    ringsRef.current.children.forEach((child, i) => {
      const speed = 0.5 + i * 0.2;
      child.rotation.x = t * speed * (i % 2 === 0 ? 1 : -1);
      child.rotation.y = t * speed * 0.5;
    });
  });

  return (
    <group ref={ringsRef}>
      {/* Primary Energy Ring */}
      <Torus args={[2, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={10} />
      </Torus>

      {/* Secondary Ring */}
      <Torus args={[2.5, 0.01, 16, 100]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={5} />
      </Torus>

      {/* Tertiary Thin Ring */}
      <Torus args={[3, 0.005, 16, 100]} rotation={[-Math.PI / 3, 0.5, 0.2]}>
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} transparent opacity={0.5} />
      </Torus>

      {/* Outer Data Ring (Fragmented) */}
      <points rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.2, 8, 100]} />
        <pointsMaterial color="#ffffff" size={0.01} transparent opacity={0.3} />
      </points>
    </group>
  );
}
