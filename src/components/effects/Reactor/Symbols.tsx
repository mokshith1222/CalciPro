"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Float } from "@react-three/drei";

const symbols = ["π", "Σ", "∫", "√", "∞", "×", "÷", "+", "−"];

export function Symbols() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", (e) => {
        mouse.current = {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        };
      });
    }
  }, []);

  const data = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      index: i,
      symbol: symbols[i % symbols.length],
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5 - 2,
      ] as [number, number, number],
      speed: 0.1 + Math.random() * 0.4,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const item = data[i];
      if (!item) return;

      // Orbit movement
      child.position.x = item.position[0] + Math.sin(t * item.speed + item.index) * 2;
      child.position.y = item.position[1] + Math.cos(t * item.speed + item.index) * 2;

      // Magnetic field effect (mouse reaction)
      const dx = mouse.current.x * 10 - child.position.x;
      const dy = mouse.current.y * 10 - child.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 4) {
        child.position.x -= dx * 0.02;
        child.position.y -= dy * 0.02;
      }

      child.rotation.x += 0.01;
      child.rotation.y += 0.01;
    });
  });

  return (
    <group ref={groupRef}>
      {data.map((item) => (
        <Float key={item.index} speed={2} rotationIntensity={1} floatIntensity={1}>
          <Text
            fontSize={0.8}
            color="#ffffff"
            font="/fonts/Geist-Bold.ttf" // Optional: we might not have it, using default
            material-toneMapped={false}
          >
            {item.symbol}
            <meshStandardMaterial 
              color="#00f2ff" 
              emissive="#00f2ff" 
              emissiveIntensity={2} 
              transparent 
              opacity={0.6} 
            />
          </Text>
        </Float>
      ))}
    </group>
  );
}
