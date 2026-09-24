"use client";

import { useSyncExternalStore } from "react";
import type { StationId } from "./world";

/**
 * Tiny shared state between the spatial canvas and chrome that lives outside
 * it (the navbar readout). Only changes when the station changes — never per frame.
 */
type State = { station: StationId | null; goto: ((id: StationId) => void) | null };

let state: State = { station: null, goto: null };
const listeners = new Set<() => void>();

export function setCanvasState(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function useCanvasState() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => state
  );
}
