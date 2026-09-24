"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "framer-motion";

/**
 * Shares the blueprint canvas's single scroll subscription so every station,
 * connector, and camera-consumer reads a slice of the same "playhead"
 * instead of each subscribing to its own useScroll({ target }) — which would
 * measure layout position, not screen position, and silently desync under
 * the canvas's transform. Provided by BlueprintCanvas; null outside of it
 * (e.g. inside BlueprintStack, which doesn't use the canvas at all).
 */
export const TimelineScrollContext = createContext<MotionValue<number> | null>(null);

export function useTimelineScroll() {
  return useContext(TimelineScrollContext);
}
