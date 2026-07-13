"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Interactive cinematic 3D hero — a cluster of "film frame" panels drifting in
 * warm rim-light. Lit panels glow like little editing monitors (emissive faces
 * + bloom); dark panels catch the key light for depth. Floating dust + vignette
 * complete the filmic look. Hand-built in Three.js, mounted client-only.
 */

const SCREEN_COLORS = ["#F5A623", "#FF8A3D", "#FFCF87", "#E8620A", "#FFD98A"];

type PanelData = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  lit: boolean;
  screen: string;
  floatSpeed: number;
};

function makePanels(): PanelData[] {
  const panels: PanelData[] = [];
  const count = 22;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 2.4 + Math.random() * 2.8;
    panels.push({
      position: [
        Math.cos(angle) * radius * (0.85 + Math.random() * 0.5),
        (Math.random() - 0.5) * 5.4,
        Math.sin(angle) * radius * 0.55 - Math.random() * 1.5,
      ],
      rotation: [
        (Math.random() - 0.5) * 0.7,
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 0.45,
      ],
      scale: 0.6 + Math.random() * 0.85,
      lit: Math.random() > 0.42,
      screen: SCREEN_COLORS[Math.floor(Math.random() * SCREEN_COLORS.length)],
      floatSpeed: 0.6 + Math.random() * 0.8,
    });
  }
  return panels;
}

function Panel({ data }: { data: PanelData }) {
  const frameMat: ThreeElements["meshStandardMaterial"] = {
    color: "#211a13",
    emissive: "#E8620A",
    emissiveIntensity: 0.15,
    roughness: 0.45,
    metalness: 0.6,
  };
  return (
    <Float speed={data.floatSpeed} rotationIntensity={0.45} floatIntensity={0.7}>
      <group position={data.position} rotation={data.rotation} scale={data.scale}>
        {/* film frame — 16:9 thin panel */}
        <mesh>
          <boxGeometry args={[1.72, 0.98, 0.06]} />
          <meshStandardMaterial {...frameMat} />
        </mesh>
        {/* glowing "screen" face for lit panels */}
        {data.lit && (
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[1.5, 0.82]} />
            <meshStandardMaterial
              color="#0b0a09"
              emissive={data.screen}
              emissiveIntensity={2.4}
              toneMapped={false}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function Cluster() {
  const group = useRef<THREE.Group>(null);
  const panels = useMemo(makePanels, []);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.07;
    target.current.x = state.pointer.y * 0.2;
    target.current.y = state.pointer.x * 0.3;
    group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.04;
    group.current.position.x += (state.pointer.x * 0.5 - group.current.position.x) * 0.03;
  });

  return (
    <group ref={group}>
      {panels.map((p, i) => (
        <Panel key={i} data={p} />
      ))}
    </group>
  );
}

export default function FilmScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7.4], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <fog attach="fog" args={["#0B0A09", 8, 17]} />
      {/* Lighting — warm amber key + cool rim for cinematic depth */}
      <ambientLight intensity={0.22} color="#ffd9a0" />
      <pointLight position={[6, 4, 6]} intensity={120} color="#FF9A3D" distance={34} decay={2} />
      <pointLight position={[-7, -3, -2]} intensity={45} color="#3b6cff" distance={34} decay={2} />
      <directionalLight position={[0, 6, 4]} intensity={0.5} color="#fff2df" />

      <Cluster />

      {/* Warm dust motes */}
      <Sparkles count={90} scale={[13, 9, 6]} size={2.4} speed={0.3} opacity={0.6} color="#FFB84D" />

      <EffectComposer>
        <Bloom intensity={1.35} luminanceThreshold={0.12} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette offset={0.3} darkness={0.7} eskil={false} />
      </EffectComposer>
    </Canvas>
  );
}
