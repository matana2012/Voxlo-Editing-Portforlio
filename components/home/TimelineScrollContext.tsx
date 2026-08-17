"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "framer-motion";

/**
 * Shares the page-level scroll progress driving the timeline columns so
 * other homepage sections (portfolio reveal, process scrubber) can sync
 * accents to the same "playhead" instead of each subscribing to their own
 * useScroll(). Provided by TimelineBackground; null outside of it.
 */
export const TimelineScrollContext = createContext<MotionValue<number> | null>(null);

export function useTimelineScroll() {
  return useContext(TimelineScrollContext);
}
