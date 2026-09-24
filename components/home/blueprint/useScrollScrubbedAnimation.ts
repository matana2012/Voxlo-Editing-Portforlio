"use client";

import { useEffect, useRef } from "react";
import { type MotionValue, useMotionValueEvent } from "framer-motion";
import type { JSAnimation, Timeline } from "animejs";

/**
 * Drives an already-paused (created with `scrub: true`, i.e. `autoplay: false`)
 * Anime.js JSAnimation/Timeline's `.progress` directly from a Framer Motion
 * scroll-derived MotionValue slice (0..1). No independent RAF loop or
 * competing scroll system (deliberately not Anime.js's own ScrollObserver) —
 * ticks happen inside Framer Motion's own update cycle via useMotionValueEvent.
 *
 * `factory` is called once on mount to create the animation against the
 * current DOM refs; return void if the ref isn't ready yet (e.g. still null).
 */
export function useScrollScrubbedAnimation(
  progress: MotionValue<number>,
  factory: () => JSAnimation | Timeline | void,
  deps: React.DependencyList = []
) {
  const animRef = useRef<JSAnimation | Timeline | null>(null);

  useEffect(() => {
    // Always call the factory — constructionReveal/drawLines already branch on
    // prefersReducedMotion() internally and set the correct final visible
    // state before returning void in that case. Short-circuiting here too
    // would skip that fallback entirely and leave content stuck hidden.
    const anim = factory();
    if (!anim) return;
    animRef.current = anim;
    // Seed the initial frame immediately rather than waiting for the next scroll event.
    anim.progress = Math.min(1, Math.max(0, progress.get()));
    return () => {
      anim.revert();
      animRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useMotionValueEvent(progress, "change", (latest) => {
    if (animRef.current) {
      animRef.current.progress = Math.min(1, Math.max(0, latest));
    }
  });
}
