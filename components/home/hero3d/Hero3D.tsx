"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Three.js can't server-render — load the scene on the client only.
const FilmScene = dynamic(() => import("./FilmScene"), { ssr: false, loading: () => null });

const TINT = "linear-gradient(180deg, rgba(232,98,10,0.22), rgba(11,10,9,0.55))";

const STILLS = [
  { src: "/screens/bAd-krnnVqQ.jpg", cls: "left-[5%] top-[22%] w-36 -rotate-6 sm:w-44" },
  { src: "/screens/EMOjNTRZ3q8.jpg", cls: "right-[5%] top-[28%] w-36 rotate-6 sm:w-44" },
  { src: "/screens/CMsSkVDEuB0.jpg", cls: "left-[12%] bottom-[12%] w-28 rotate-6 sm:w-36" },
  { src: "/screens/FukLaMhIYCw.jpg", cls: "right-[10%] bottom-[14%] w-28 -rotate-6 sm:w-36" },
];

/** Lightweight static hero for mobile / reduced-motion — no WebGL. */
function StaticFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[42%] h-[75vw] w-[75vw] max-h-[520px] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(232,98,10,0.34), transparent 70%)" }}
      />
      {STILLS.map((m, i) => (
        <div
          key={i}
          className={`absolute aspect-video overflow-hidden rounded-lg border border-accent/20 opacity-70 blur-[1px] ${m.cls}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.src} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: TINT }} />
        </div>
      ))}
    </div>
  );
}

/**
 * Interactive 3D hero on capable desktops; a static, WebGL-free fallback on
 * mobile (performance) and for reduced-motion. A slight blur keeps the panels
 * from competing with the headline.
 */
export function Hero3D() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const useStatic = !mounted || reduce || small;

  return (
    <div aria-hidden className="absolute inset-0 blur-[3px]">
      {useStatic ? <StaticFallback /> : <FilmScene />}
    </div>
  );
}
