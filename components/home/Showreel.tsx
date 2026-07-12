"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

// Voxlo Editing showreel — https://www.youtube.com/watch?v=yM1Z9sQPkbs
const YT_ID = "yM1Z9sQPkbs";
const EASE = [0.16, 1, 0.3, 1] as const;

export function Showreel() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);
  const reduceMotion = useReducedMotion();

  // controls=0 keeps the frame clean; our own button is the sole audio control.
  // loop needs playlist=<id>; mute=1 is required for autoplay to be allowed.
  const src =
    `https://www.youtube.com/embed/${YT_ID}` +
    `?autoplay=1&mute=1&loop=1&playlist=${YT_ID}` +
    `&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;

  function toggleMute() {
    const win = iframeRef.current?.contentWindow;
    win?.postMessage(
      JSON.stringify({ event: "command", func: muted ? "unMute" : "mute", args: [] }),
      "*"
    );
    setMuted((m) => !m);
  }

  // Reveal only when reduced motion is NOT requested.
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, ease: EASE },
      };

  return (
    <section aria-labelledby="showreel-heading" className="px-6 py-20 sm:py-28">
      <motion.div {...reveal} className="max-w-5xl mx-auto">
        <p
          id="showreel-heading"
          className="text-xs uppercase tracking-[0.3em] text-accent mb-6 font-medium text-center"
        >
          Showreel
        </p>

        <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-black shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
          <iframe
            ref={iframeRef}
            src={src}
            title="Voxlo Editing showreel"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />

          {/* Unmute / mute control */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute showreel" : "Mute showreel"}
            aria-pressed={!muted}
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white px-4 py-2 text-sm font-medium hover:bg-black/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
