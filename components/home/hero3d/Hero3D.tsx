"use client";

import dynamic from "next/dynamic";

// Three.js can't server-render — load the scene on the client only.
const FilmScene = dynamic(() => import("./FilmScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * The interactive 3D hero is a core part of the brand, so it always renders
 * (we intentionally do NOT swap it for a static fallback under reduced-motion —
 * the scene's own motion is slow and non-jarring).
 */
export function Hero3D() {
  return (
    <div aria-hidden className="absolute inset-0">
      <FilmScene />
    </div>
  );
}
