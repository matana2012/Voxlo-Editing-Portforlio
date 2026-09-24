/**
 * The Voxlo Blueprint's spatial layout — plain data, no React. One source of
 * truth for: how tall the scroll spacer is, where each station sits on the
 * canvas, the camera's path between them, and the dogleg connectors drawn
 * between stations. Coordinates are in vh (vertical) and vw (horizontal) so
 * the whole system scales with viewport instead of being pinned to px.
 *
 * The seven named stations from the direction (Identity, Capabilities,
 * Process, Work, Proof, Pricing, Contact) map to nine layout entries: Work
 * splits into three sequential sub-stations (pieces -> compare -> more),
 * each keeping its existing component's internals completely untouched,
 * positioned at increasing X so the camera dollies across them in sequence
 * instead of forcing any one component into a horizontal layout it wasn't
 * built for. All three share hudIndex/hudLabel "04 / WORK" for the readout.
 */

export interface StationDef {
  id: string;
  /** Displayed station number (1-7); Work's three sub-stations all show 4. */
  hudIndex: number;
  /** Displayed station name; Work's three sub-stations all show "WORK". */
  hudLabel: string;
  /** Fraction of total scroll height this station occupies. Must sum to 1 across all stations. */
  vhWeight: number;
  /** Camera/content X offset from canvas center, in vw. */
  xVw: number;
}

export const TOTAL_SCROLL_VH = 1000;

export const STATIONS: StationDef[] = [
  { id: "identity", hudIndex: 1, hudLabel: "IDENTITY", vhWeight: 0.14, xVw: 0 },
  { id: "capabilities", hudIndex: 2, hudLabel: "CAPABILITIES", vhWeight: 0.08, xVw: 18 },
  { id: "process", hudIndex: 3, hudLabel: "PROCESS", vhWeight: 0.16, xVw: -16 },
  { id: "work-pieces", hudIndex: 4, hudLabel: "WORK", vhWeight: 0.17, xVw: 14 },
  { id: "work-compare", hudIndex: 4, hudLabel: "WORK", vhWeight: 0.06, xVw: 28 },
  { id: "work-more", hudIndex: 4, hudLabel: "WORK", vhWeight: 0.06, xVw: 42 },
  { id: "proof", hudIndex: 5, hudLabel: "PROOF", vhWeight: 0.09, xVw: -12 },
  { id: "pricing", hudIndex: 6, hudLabel: "PRICING", vhWeight: 0.08, xVw: 14 },
  { id: "contact", hudIndex: 7, hudLabel: "CONTACT", vhWeight: 0.16, xVw: 0 },
];

export interface StationRange {
  station: StationDef;
  /** [start, end] as a 0-1 fraction of TOTAL_SCROLL_VH / overall scrollYProgress. */
  range: [number, number];
  /** Sub-range within `range` where the arrival/construction reveal plays (scrubbed). */
  revealRange: [number, number];
  /** Y position (vh) of this station's center, for the connector/camera math. */
  centerYVh: number;
  startVh: number;
  chunkVh: number;
}

function computeStationRanges(): StationRange[] {
  let cursorVh = 0;
  return STATIONS.map((station, i) => {
    const chunkVh = station.vhWeight * TOTAL_SCROLL_VH;
    const startVh = cursorVh;
    const endVh = cursorVh + chunkVh;
    cursorVh = endVh;
    const start = startVh / TOTAL_SCROLL_VH;
    const end = endVh / TOTAL_SCROLL_VH;
    // The very first station has already "arrived" the instant the page loads
    // (progress 0 IS its start) — its reveal range ends AT start, not after
    // it, so it reads fully revealed immediately instead of caught mid-reveal.
    const revealRange: [number, number] =
      i === 0 ? [start - 0.05, start] : [start, start + (end - start) * 0.4];
    return {
      station,
      range: [start, end],
      revealRange,
      // Content starts at the top of its chunk and rarely fills it, so the
      // camera targets the upper third rather than the exact geometric
      // center — keeps real content framed instead of centering on
      // whatever empty canvas trails below shorter sections.
      centerYVh: startVh + chunkVh * 0.3,
      startVh,
      chunkVh,
    };
  });
}

export const STATION_RANGES = computeStationRanges();
export const STATION_RANGE_BY_ID = new Map(STATION_RANGES.map((r) => [r.station.id, r]));

/** Camera path: one waypoint per station, centered in its own range, fed to Framer Motion's useTransform. */
export const CAMERA_PROGRESS_STOPS = STATION_RANGES.map((r) => (r.range[0] + r.range[1]) / 2);
export const CAMERA_X_STOPS = STATION_RANGES.map((r) => r.station.xVw);
export const CAMERA_Y_STOPS = STATION_RANGES.map((r) => r.centerYVh);

/** Which station "owns" a given overall progress value — drives the HUD readout. */
export function stationAtProgress(progress: number): StationDef {
  const hit = STATION_RANGES.find(({ range }) => progress >= range[0] && progress < range[1]);
  return hit ? hit.station : STATIONS[STATIONS.length - 1];
}

export interface ConnectorDef {
  id: string;
  from: StationRange;
  to: StationRange;
  /** Scroll range over which this connector's line-draw is scrubbed. */
  drawRange: [number, number];
  /** Real, derived (not invented) vertical distance this connector spans. */
  deltaVh: number;
}

export const CONNECTORS: ConnectorDef[] = STATION_RANGES.slice(0, -1).map((from, i) => {
  const to = STATION_RANGES[i + 1];
  const drawStart = from.range[0] + (from.range[1] - from.range[0]) * 0.6;
  const drawEnd = to.range[0] + (to.range[1] - to.range[0]) * 0.25;
  return {
    id: `${from.station.id}-${to.station.id}`,
    from,
    to,
    drawRange: [drawStart, drawEnd],
    deltaVh: Math.round(to.centerYVh - from.centerYVh),
  };
});
