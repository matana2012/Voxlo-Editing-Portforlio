"use client";

import { useCallback, useRef } from "react";
import { useMotionValue } from "framer-motion";

/**
 * Shared pointer-math for a horizontal 0–100 drag/click scrubber (used by
 * the Before/After comparison and the Process track). Owns a MotionValue
 * so consumers can drive clip-paths/positions directly without re-renders,
 * plus click-to-jump and keyboard arrow support for accessibility.
 */
export function useDragScrubber(initial = 50) {
  const value = useMotionValue(initial);
  const trackRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      value.set(Math.min(100, Math.max(0, pct)));
    },
    [value]
  );

  const onTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setFromClientX(e.clientX);
    },
    [setFromClientX]
  );

  const onDrag = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: { point: { x: number } }) => {
      setFromClientX(info.point.x);
    },
    [setFromClientX]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent, step = 4) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        value.set(Math.max(0, value.get() - step));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        value.set(Math.min(100, value.get() + step));
      } else if (e.key === "Home") {
        e.preventDefault();
        value.set(0);
      } else if (e.key === "End") {
        e.preventDefault();
        value.set(100);
      }
    },
    [value]
  );

  return { value, trackRef, onTrackClick, onDrag, onKeyDown };
}
