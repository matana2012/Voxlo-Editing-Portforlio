/**
 * The Voxlo world — one large drawing the camera travels through.
 *
 * Units: x is measured in viewport WIDTHS, y in viewport HEIGHTS. A station
 * centred at (0.5, 0.5) exactly fills the first screen; (4.75, 0.5) is the
 * top-right corner of the board. Every position on the canvas, the camera
 * path, the route line and the minimap all read from this one file.
 *
 * Composition follows the founder's sketch:
 *   01 Hero (top-left) → 02 Work (centre, then a timeline pan right) →
 *   03 Testimonials (back left) → long swoop along the bottom → 04 Who I am
 *   (top-right) → down into 05 Get in touch (bottom, right of centre).
 */

export type Pt = readonly [number, number];

export const WORLD = { w: 5.95, h: 4.5 } as const;

export type StationId = "hero" | "work" | "proof" | "about" | "contact";

export interface StationDef {
  id: StationId;
  index: string;
  label: string;
  /** Grid reference on the board (column letter + row number). */
  ref: string;
  /** Camera centre when the visitor is "at" this station. */
  center: Pt;
}

export const STATIONS: StationDef[] = [
  { id: "hero", index: "01", label: "Voxlo", ref: "A-1", center: [0.5, 0.5] },
  { id: "work", index: "02", label: "Work", ref: "B-2", center: [1.85, 1.45] },
  { id: "proof", index: "03", label: "Testimonials", ref: "A-3", center: [0.55, 2.5] },
  { id: "about", index: "04", label: "Who I am", ref: "E-1", center: [4.95, 0.5] },
  { id: "contact", index: "05", label: "Get in touch", ref: "D-4", center: [3.6, 3.95] },
];

export const STATION_BY_ID = Object.fromEntries(STATIONS.map((s) => [s.id, s])) as Record<StationId, StationDef>;

/** Work timeline geometry (world units). Clips are laid out deterministically so the pan can be exact. */
export const TRACK = {
  y: 1.45,
  clipStart: 2.0,
  clipWidth: 0.38,
  clipStep: 0.46,
  /** Camera pans from the Work intro to the centre of the last clip. */
  panEnd: 2.0 + 4 * 0.46 + 0.19,
};

export const clipLeft = (i: number) => TRACK.clipStart + i * TRACK.clipStep;

/**
 * Connectors — the gold route drawn between stations. Each runs from an
 * anchor on the edge of one station to an anchor on the next, so the line
 * never cuts through content. The camera travels through the same points,
 * bracketed by the two station centres.
 */
export interface ConnectorDef {
  id: string;
  from: StationId;
  to: StationId;
  pts: Pt[];
}

export const CONNECTORS: ConnectorDef[] = [
  { id: "hero-work", from: "hero", to: "work", pts: [[0.72, 0.82], [1.1, 1.06], [1.4, 1.3]] },
  {
    id: "work-proof",
    from: "work",
    to: "proof",
    pts: [[4.0, 2.02], [2.9, 2.2], [1.9, 2.32], [1.08, 2.42]],
  },
  {
    id: "proof-about",
    from: "proof",
    to: "about",
    pts: [[0.98, 2.92], [1.45, 3.08], [2.8, 3.12], [4.3, 2.85], [4.85, 1.8], [4.9, 0.97]],
  },
  {
    id: "about-contact",
    from: "about",
    to: "contact",
    pts: [[5.18, 0.97], [5.5, 1.7], [5.35, 2.9], [4.6, 3.66], [4.1, 3.88]],
  },
];

/**
 * Waypoints along the long bottom swoop: the three disciplines, pinned above
 * the route line at `line` (the y where the route passes beneath them).
 */
export const WAYPOINTS = [
  { x: 1.62, line: 3.1, title: "3D & motion", text: "3D compositing, motion tracking, depth matching and VFX cleanup." },
  { x: 2.78, line: 3.12, title: "Gaming", text: "Highlight reels, commentary-led long-form and Shorts — paced for retention." },
  { x: 3.78, line: 3.02, title: "IRL & branded", text: "Cinematic but real: brand integration, colour, music sync, motion logos." },
];

/** The timeline ruler across the Work track — part of the same route. */
export const RULER: Pt[] = [
  [1.43, 1.08],
  [clipLeft(4) + TRACK.clipWidth + 0.02, 1.08],
];

// ── Camera timeline ────────────────────────────────────────────────────────

type Move =
  | { kind: "dwell"; at: Pt; len: number; station: StationId }
  | { kind: "travel"; pts: Pt[]; len: number; connector?: string; dip: number; ease: (t: number) => number; station: StationId };

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

const C = (id: StationId) => STATION_BY_ID[id].center;
const conn = (id: string) => CONNECTORS.find((c) => c.id === id)!.pts;

/**
 * `len` is scroll distance in viewport heights. Long moves get more scroll
 * so camera speed stays calm; `dip` is how far the camera pulls back mid-move.
 */
const MOVES: Move[] = [
  { kind: "dwell", at: C("hero"), len: 0.55, station: "hero" },
  { kind: "travel", pts: [C("hero"), ...conn("hero-work"), C("work")], len: 1.0, connector: "hero-work", dip: 0.12, ease: easeInOutCubic, station: "work" },
  { kind: "dwell", at: C("work"), len: 0.4, station: "work" },
  { kind: "travel", pts: [C("work"), [TRACK.panEnd, TRACK.y]], len: 1.9, connector: "ruler", dip: 0, ease: easeInOutSine, station: "work" },
  { kind: "dwell", at: [TRACK.panEnd, TRACK.y], len: 0.25, station: "work" },
  { kind: "travel", pts: [[TRACK.panEnd, TRACK.y], ...conn("work-proof"), C("proof")], len: 1.5, connector: "work-proof", dip: 0.24, ease: easeInOutCubic, station: "proof" },
  { kind: "dwell", at: C("proof"), len: 0.7, station: "proof" },
  { kind: "travel", pts: [C("proof"), ...conn("proof-about"), C("about")], len: 2.5, connector: "proof-about", dip: 0.3, ease: easeInOutCubic, station: "about" },
  { kind: "dwell", at: C("about"), len: 0.7, station: "about" },
  { kind: "travel", pts: [C("about"), ...conn("about-contact"), C("contact")], len: 1.5, connector: "about-contact", dip: 0.26, ease: easeInOutCubic, station: "contact" },
  { kind: "dwell", at: C("contact"), len: 0.6, station: "contact" },
];

/** Total scroll distance of the camera journey, in viewport heights. */
export const JOURNEY_VH = MOVES.reduce((s, m) => s + m.len, 0);

const MOVE_RANGES = (() => {
  let cursor = 0;
  return MOVES.map((m) => {
    const start = cursor / JOURNEY_VH;
    cursor += m.len;
    return { move: m, start, end: cursor / JOURNEY_VH };
  });
})();

// ── Curves ─────────────────────────────────────────────────────────────────

interface Seg {
  p1: Pt;
  c1: Pt;
  c2: Pt;
  p2: Pt;
  len: number;
}

/** Catmull-Rom through the points, as cubic Bézier segments. */
function toSegments(pts: Pt[]): Seg[] {
  const segs: Seg[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    const seg = { p1, c1, c2, p2, len: 0 };
    seg.len = approxLen(seg);
    segs.push(seg);
  }
  return segs;
}

function bez(s: Seg, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return [
    a * s.p1[0] + b * s.c1[0] + c * s.c2[0] + d * s.p2[0],
    a * s.p1[1] + b * s.c1[1] + c * s.c2[1] + d * s.p2[1],
  ];
}

function approxLen(s: Seg) {
  let len = 0;
  let prev = s.p1;
  for (let i = 1; i <= 16; i++) {
    const p = bez(s, i / 16);
    len += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
    prev = p;
  }
  return len;
}

/** Point at arc-length fraction u along a segment chain. */
function along(segs: Seg[], u: number): Pt {
  const total = segs.reduce((s, g) => s + g.len, 0);
  let target = Math.min(Math.max(u, 0), 1) * total;
  for (const g of segs) {
    if (target <= g.len || g === segs[segs.length - 1]) return bez(g, g.len ? Math.min(target / g.len, 1) : 0);
    target -= g.len;
  }
  return segs[segs.length - 1].p2;
}

/** SVG path data in world units. */
export function pathD(pts: Pt[]) {
  const segs = toSegments(pts);
  const f = (p: Pt) => `${p[0].toFixed(4)},${p[1].toFixed(4)}`;
  return `M${f(segs[0].p1)}` + segs.map((s) => ` C${f(s.c1)} ${f(s.c2)} ${f(s.p2)}`).join("");
}

const TRAVEL_SEGS = new Map<Move, Seg[]>(
  MOVES.filter((m): m is Extract<Move, { kind: "travel" }> => m.kind === "travel").map((m) => [m, toSegments(m.pts)])
);

// ── Camera evaluation ──────────────────────────────────────────────────────

export interface CameraState {
  x: number;
  y: number;
  scale: number;
  station: StationId;
  /** Drawn fraction for every connector (0-1). */
  drawn: Record<string, number>;
  /** 0-1 progress through the Work timeline pan (for the playhead). */
  track: number;
}

export function cameraAt(progress: number): CameraState {
  const p = Math.min(Math.max(progress, 0), 1);
  const drawn: Record<string, number> = {};
  let state: Omit<CameraState, "drawn" | "track"> | null = null;
  let track = 0;

  for (const { move, start, end } of MOVE_RANGES) {
    const local = end > start ? (p - start) / (end - start) : 1;
    const clamped = Math.min(Math.max(local, 0), 1);

    if (move.kind === "travel") {
      const t = move.ease(clamped);
      if (move.connector) drawn[move.connector] = p >= end ? 1 : p <= start ? 0 : t;
      if (move.connector === "ruler") track = p >= end ? 1 : p <= start ? 0 : t;
      if (!state && p <= end) {
        const [x, y] = along(TRAVEL_SEGS.get(move)!, t);
        state = { x, y, scale: 1 - move.dip * Math.sin(Math.PI * t), station: t < 0.5 ? prevStation(move) : move.station };
      }
    } else if (!state && p <= end) {
      state = { x: move.at[0], y: move.at[1], scale: 1, station: move.station };
    }
  }

  // The playhead draws the timeline: the ruler is inked exactly up to the camera's x on the track.
  const panX = state && track > 0 && track < 1 ? state.x : C("work")[0] + (TRACK.panEnd - C("work")[0]) * track;
  const rulerFrac = (panX - RULER[0][0]) / (RULER[1][0] - RULER[0][0]);
  drawn.ruler = (drawn["hero-work"] ?? 0) >= 1 ? Math.min(Math.max(rulerFrac, 0), 1) : 0;
  if (track >= 1) drawn.ruler = 1;

  return { ...(state ?? { x: C("contact")[0], y: C("contact")[1], scale: 1, station: "contact" }), drawn, track };
}

function prevStation(move: Move): StationId {
  const i = MOVES.indexOf(move);
  for (let j = i - 1; j >= 0; j--) if (MOVES[j].kind === "dwell") return MOVES[j].station;
  return "hero";
}

/** Scroll progress (0-1) at which the camera rests on a station. */
export function progressForStation(id: StationId): number {
  const r = MOVE_RANGES.find(({ move }) => move.kind === "dwell" && move.station === id)!;
  return id === "hero" ? 0 : r.start + (r.end - r.start) * 0.35;
}

/** Scroll progress that brings a world point closest to the camera centre (for keyboard focus). */
export function progressNearest(pt: Pt): number {
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i <= 600; i++) {
    const p = i / 600;
    const c = cameraAt(p);
    const d = Math.hypot(c.x - pt[0], (c.y - pt[1]) * 1.2) + (1 - c.scale) * 2;
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  return best;
}
