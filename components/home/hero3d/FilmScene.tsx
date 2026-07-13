"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Interactive cinematic 3D hero — a slow cluster of "film frame" panels drifting
 * in warm amber rim-light with bloom and floating dust. Hand-built in Three.js
 * (no AI-generated assets). Mounted client-only (ssr:false) from the Hero.
 */

type PanelData = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  lit: boolean;
  floatSpeed: number;
};

function makePanels(): PanelData[] {
  // Deterministic-ish scatter (client-only, so plain Math.random is fine here).
  const panels: PanelData[] = [];
  const count = 15;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 2.6 + Math.random() * 2.6;
    panels.push({
      position: [
        Math.cos(angle) * radius * (0.7 + Math.random() * 0.5),
        (Math.random() - 0.5) * 5,
        Math.sin(angle) * radius * 0.6 - Math.random() * 2,
      ],
      rotation: [
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 1.6,
        (Math.random() - 0.5) * 0.5,
      ],
      scale: 0.7 + Math.random() * 0.9,
      lit: Math.random() > 0.62,
      floatSpeed: 0.6 + Math.random() * 0.8,
    });
  }
  return panels;
}

function Panel({ data }: { data: PanelData }) {
  const litMat: ThreeElements["meshStandardMaterial"] = {
    color: "#1a1712",
    emissive: "#F5A623",
    emissiveIntensity: 1.35,
    roughness: 0.35,
    metalness: 0.4,
  };
  const darkMat: ThreeElements["meshStandardMaterial"] = {
    color: "#221c15",
    emissive: "#E8620A",
    emissiveIntensity: 0.12,
    roughness: 0.5,
    metalness: 0.65,
  };
  return (
    <Float speed={data.floatSpeed} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={data.position} rotation={data.rotation} scale={data.scale}>
        {/* film frame — 16:9 thin panel */}
        <mesh>
          <boxGeometry args={[1.6, 0.9, 0.05]} />
          <meshStandardMaterial {...(data.lit ? litMat : darkMat)} />
        </mesh>
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
    // slow auto-rotation
    group.current.rotation.y += delta * 0.06;
    // gentle parallax toward pointer
    target.current.x = state.pointer.y * 0.18;
    target.current.y = state.pointer.x * 0.28;
    group.current.rotation.x +=
      (target.current.x - group.current.rotation.x) * 0.04;
    group.current.position.x +=
      (state.pointer.x * 0.4 - group.current.position.x) * 0.03;
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
      camera={{ position: [0, 0, 8.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <fog attach="fog" args={["#0B0A09", 8, 16]} />
      {/* Lighting — warm amber key + cool rim for cinematic depth */}
      <ambientLight intensity={0.18} color="#ffd9a0" />
      <pointLight position={[6, 4, 6]} intensity={90} color="#FF9A3D" distance={30} decay={2} />
      <pointLight position={[-7, -3, -2]} intensity={40} color="#3b6cff" distance={30} decay={2} />
      <directionalLight position={[0, 6, 4]} intensity={0.4} color="#fff2df" />

      <Cluster />

      {/* Warm dust motes */}
      <Sparkles
        count={70}
        scale={[12, 8, 6]}
        size={2.2}
        speed={0.28}
        opacity={0.5}
        color="#FFB84D"
      />

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
