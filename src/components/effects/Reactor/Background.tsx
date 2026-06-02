"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stars, Sparkles } from "@react-three/drei";

export function Background() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <group ref={groupRef}>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      
      <Sparkles
        count={100}
        scale={20}
        size={2}
        speed={0.5}
        opacity={0.2}
        color="#7000ff"
      />

      <mesh scale={50}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#02040a" 
          side={THREE.BackSide} 
        />
      </mesh>
    </group>
  );
}
