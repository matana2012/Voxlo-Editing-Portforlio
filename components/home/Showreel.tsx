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

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, ease: EASE },
      };

  return (
    <section aria-labelledby="showreel-heading" className="px-6 py-20 sm:py-28">
      <motion.div {...reveal} className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p
            id="showreel-heading"
            className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent"
          >
            The Reel
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            A minute of proof.
          </h2>
        </div>

        <div className="relative">
          {/* warm glow behind the frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] blur-3xl"
            style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(232,98,10,0.28), transparent 75%)" }}
          />

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-accent/15 bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
            <iframe
              ref={iframeRef}
              src={src}
              title="Voxlo Editing showreel"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />

            {/* Unmute / mute control */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute showreel" : "Mute showreel"}
              aria-pressed={!muted}
              className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
