"use client";

import { useEffect, useState } from "react";

const KEY = "voxlo-motion";

function set(on: boolean) {
  try {
    if (on) localStorage.setItem(KEY, "on");
    else localStorage.removeItem(KEY);
  } catch {}
  window.location.reload();
}

/**
 * Desktop visitors whose system asks for reduced motion get the stacked page
 * by default. This lets them choose the spatial board anyway — and go back.
 */
export function MotionOptIn({ mode }: { mode: "enable" | "disable" }) {
  const [forced, setForced] = useState(false);
  useEffect(() => setForced(document.documentElement.classList.contains("force-motion")), []);

  if (mode === "disable") {
    if (!forced) return null;
    return (
      <button type="button" onClick={() => set(false)} className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/60 underline-offset-4 hover:text-gold hover:underline">
        Use reduced-motion layout
      </button>
    );
  }

  return (
    <div className="hidden items-center gap-4 border border-line/30 px-4 py-3 lg:flex">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Reduced motion is on for this device</span>
      <button type="button" onClick={() => set(true)} className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-gold underline-offset-4 hover:underline">
        View the spatial board anyway →
      </button>
    </div>
  );
}
