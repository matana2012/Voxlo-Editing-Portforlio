"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

// Three.js can't server-render — load the scene on the client only.
const FilmScene = dynamic(() => import("./FilmScene"), {
  ssr: false,
  loading: () => null,
});

export function Hero3D() {
  const reduceMotion = useReducedMotion();

  // Static, motion-free cinematic fallback for reduced-motion users.
  if (reduceMotion) {
    return (
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 62% 42%, rgba(245,166,35,0.20), transparent 70%)",
        }}
      />
    );
  }

  return (
    <div aria-hidden className="absolute inset-0">
      <FilmScene />
    </div>
  );
}
