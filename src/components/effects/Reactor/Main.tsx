"use client";

import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { Core } from "./Core";
import { Rings } from "./Rings";
import { Symbols } from "./Symbols";
import { Particles } from "./Particles";
import { Background } from "./Background";
import { useReactorStore } from "@/hooks/use-reactor-store";

export function MathematicalReactor() {
  const mode = useReactorStore((state) => state.mode);
  const triggerPulse = useReactorStore((state) => state.triggerPulse);

  const handleClick = () => {
    triggerPulse();
  };

  return (
    <div className="fixed inset-0 -z-10 bg-[#02040a]" onClick={handleClick}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
      >
        <color attach="background" args={["#02040a"]} />
        <fog attach="fog" args={["#02040a", 5, 25]} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
          
          <Background />
          <Particles />
          <Symbols />
          
          <group scale={1.2}>
            <Core />
            <Rings />
          </group>

          <EffectComposer enableNormalPass={false}>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={1.5} 
              radius={0.4}
            />
            <ChromaticAberration offset={[0.001, 0.001]} radialModulation={false} modulationOffset={0} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#02040a]/40" />
    </div>
  );
}
