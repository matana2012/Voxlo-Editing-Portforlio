"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Interactive cinematic 3D hero — a cluster of "monitor" panels drifting in a
 * warm room. Each screen shows a real frame from Voxlo's videos with a subtle
 * orange tint; most panels face the viewer. Gentle sway + pointer parallax
 * keep the screens readable. Hand-built in Three.js, mounted client-only.
 */

const SCREENS = [
  "/screens/yM1Z9sQPkbs.jpg",
  "/screens/vWj_U8HI53c.jpg",
  "/screens/jg2ni-c-bmc.jpg",
  "/screens/FukLaMhIYCw.jpg",
  "/screens/CMsSkVDEuB0.jpg",
  "/screens/bAd-krnnVqQ.jpg",
  "/screens/EMOjNTRZ3q8.jpg",
];

type PanelData = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  texIndex: number;
  floatSpeed: number;
  facing: boolean;
};

function makePanels(count: number): PanelData[] {
  const panels: PanelData[] = [];
  for (let i = 0; i < count; i++) {
    const facing = Math.random() < 0.58; // ~58% face the viewer
    const angle = (i / count) * Math.PI * 2;
    const radius = 2.6 + Math.random() * 3.1;
    panels.push({
      position: [
        Math.cos(angle) * radius * (0.95 + Math.random() * 0.55),
        (Math.random() - 0.5) * 5.8,
        Math.sin(angle) * radius * 0.5 - Math.random() * 2,
      ],
      rotation: facing
        ? [(Math.random() - 0.5) * 0.16, (Math.random() - 0.5) * 0.24, (Math.random() - 0.5) * 0.1]
        : [(Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 0.4],
      scale: 0.62 + Math.random() * 0.9,
      texIndex: i % SCREENS.length,
      floatSpeed: 0.6 + Math.random() * 0.8,
      facing,
    });
  }
  return panels;
}

function Panel({ data, tex }: { data: PanelData; tex: THREE.Texture }) {
  return (
    <Float speed={data.floatSpeed} rotationIntensity={data.facing ? 0.14 : 0.4} floatIntensity={0.7}>
      <group position={data.position} rotation={data.rotation} scale={data.scale}>
        {/* monitor bezel */}
        <mesh>
          <boxGeometry args={[1.74, 1.0, 0.07]} />
          <meshStandardMaterial color="#0e0b08" roughness={0.5} metalness={0.55} />
        </mesh>
        {/* screen — real video frame, warm-tinted, softly self-lit */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[1.56, 0.86]} />
          <meshStandardMaterial
            map={tex}
            emissiveMap={tex}
            emissive="#ff9642"
            emissiveIntensity={0.8}
            color="#ffd4a6"
            roughness={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Panels() {
  const textures = useTexture(SCREENS) as THREE.Texture[];
  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
    });
  }, [textures]);

  const panels = useMemo(() => makePanels(26), []);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // gentle sway (not a full spin) so the facing screens keep facing you
    const targetY = Math.sin(t * 0.08) * 0.28 + state.pointer.x * 0.26;
    const targetX = -state.pointer.y * 0.14;
    g.rotation.y += (targetY - g.rotation.y) * 0.04;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
    g.position.x += (state.pointer.x * 0.4 - g.position.x) * 0.03;
  });

  return (
    <group ref={group}>
      {panels.map((p, i) => (
        <Panel key={i} data={p} tex={textures[p.texIndex]} />
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
      <fog attach="fog" args={["#0B0A09", 8, 18]} />
      <ambientLight intensity={0.5} color="#ffd9a0" />
      <pointLight position={[6, 4, 6]} intensity={90} color="#FF9A3D" distance={34} decay={2} />
      <pointLight position={[-7, -3, -2]} intensity={30} color="#5b78ff" distance={34} decay={2} />
      <directionalLight position={[0, 6, 4]} intensity={0.6} color="#fff2df" />

      <Suspense fallback={null}>
        <Panels />
      </Suspense>

      <Sparkles count={80} scale={[13, 9, 6]} size={2.2} speed={0.28} opacity={0.5} color="#FFB84D" />

      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.32} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette offset={0.3} darkness={0.72} eskil={false} />
      </EffectComposer>
    </Canvas>
  );
}
