"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReactorStore } from "@/hooks/use-reactor-store";

const PARTICLE_COUNT = 8000;

const vertexShader = `
  uniform float uTime;
  uniform float uInputTrigger;
  uniform float uPulseTrigger;
  uniform vec2 uMouse;
  uniform int uMode; // 0: default, 1: wave, 2: circle, 3: parabolic, 4: logarithmic, 5: orbital, 6: crystal
  attribute float aSize;
  attribute vec3 aRandom;
  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    vec3 pos = position;
    
    // Brownian motion (Idle)
    pos.x += sin(uTime * aRandom.x + aRandom.y) * 0.2;
    pos.y += cos(uTime * aRandom.y + aRandom.z) * 0.2;
    pos.z += sin(uTime * aRandom.z + aRandom.x) * 0.2;

    // Mode specific transformations
    if (uMode == 1) { // Wave (sin)
      pos.y += sin(pos.x * 0.5 + uTime * 2.0) * 2.0;
    } else if (uMode == 2) { // Circle (cos)
      float angle = atan(pos.y, pos.x) + uTime * 0.5;
      float dist = length(pos.xy);
      pos.x = cos(angle) * dist;
      pos.y = sin(angle) * dist;
    } else if (uMode == 3) { // Parabolic (x^2)
      pos.y += (pos.x * pos.x) * 0.1 * sin(uTime);
    } else if (uMode == 4) { // Logarithmic
      float l = log(abs(pos.x) + 1.1);
      pos.y += l * 2.0 * sin(uTime);
    } else if (uMode == 5) { // Orbital
      float speed = uTime * (aRandom.x + 0.5) * 0.5;
      float r = length(pos.xy);
      pos.x = cos(speed) * r;
      pos.y = sin(speed) * r;
    } else if (uMode == 6) { // Crystal
      pos = floor(pos * 2.0) / 2.0; // Quantize for grid effect
    }

    // Mouse proximity effect (Magnetic)
    float mouseDist = distance(pos.xy, uMouse * 10.0);
    if(mouseDist < 4.0) {
      vec2 dir = normalize(pos.xy - uMouse * 10.0);
      float power = (4.0 - mouseDist) / 4.0;
      pos.xy += dir * power * 2.0;
    }

    // Input pulse effect
    if(uInputTrigger > 0.0) {
      float t = mod(uTime * 2.0, 1.0);
      vec3 target = vec3(0.0);
      pos = mix(pos, target, (1.0 - t) * 0.05);
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (40.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vec3 cyan = vec3(0.0, 0.95, 1.0);
    vec3 violet = vec3(0.44, 0.0, 1.0);
    vColor = mix(cyan, violet, aRandom.x + sin(uTime * 0.5) * 0.2);
    vOpacity = clamp(1.5 / length(pos.xyz * 0.3), 0.0, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if(dist > 0.5) discard;
    
    float strength = 1.0 - (dist * 2.0);
    strength = pow(strength, 3.0);
    
    gl_FragColor = vec4(vColor, strength * vOpacity);
  }
`;

export function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const inputTrigger = useReactorStore((state) => state.inputTrigger);
  const pulseTrigger = useReactorStore((state) => state.pulseTrigger);
  const mode = useReactorStore((state) => state.mode);
  const mouse = useRef(new THREE.Vector2());

  const modeIndex = useMemo(() => {
    const modes: Record<string, number> = {
      default: 0,
      wave: 1,
      circle: 2,
      parabolic: 3,
      logarithmic: 4,
      orbital: 5,
      crystal: 6,
    };
    return modes[mode] ?? 0;
  }, [mode]);

  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", (e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      });
    }
  }, []);

  const particles = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const randoms = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      sizes[i] = Math.random() * 5 + 2;
      
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
    }

    return { positions, sizes, randoms };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: mouse.current },
    uInputTrigger: { value: 0 },
    uPulseTrigger: { value: 0 },
    uMode: { value: 0 },
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value = mouse.current;
    uniforms.uMode.value = modeIndex;
    
    if (inputTrigger > 0) uniforms.uInputTrigger.value = 1.0;
    else uniforms.uInputTrigger.value = 0.0;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={PARTICLE_COUNT}
          array={particles.sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={PARTICLE_COUNT}
          array={particles.randoms}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        // blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
