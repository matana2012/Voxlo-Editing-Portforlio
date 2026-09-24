"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CONNECTORS,
  JOURNEY_VH,
  RULER,
  STATIONS,
  STATION_BY_ID,
  TRACK,
  WAYPOINTS,
  WORLD,
  cameraAt,
  clipLeft,
  pathD,
  progressForStation,
  progressNearest,
  type Pt,
  type StationId,
} from "@/lib/canvas/world";
import { setCanvasState } from "@/lib/canvas/store";
import { cn } from "@/lib/utils";
import { HeroStation } from "./stations/HeroStation";
import { WorkStation, TIMELINE_PIECES } from "./stations/WorkStation";
import { ProofStation } from "./stations/ProofStation";
import { AboutStation } from "./stations/AboutStation";
import { ContactStation } from "./stations/ContactStation";
import { Mono } from "./primitives";
import { MotionOptIn } from "./MotionOptIn";

const ROUTE_PTS = [...CONNECTORS.map((c) => ({ id: c.id, pts: c.pts })), { id: "ruler", pts: RULER }];
const ROUTES = ROUTE_PTS.map((r) => ({ id: r.id, d: pathD(r.pts) }));
// Route in pixel space: Catmull-Rom is affine-invariant, so scaling the points
// per axis gives exactly the curve the camera travels — with true stroke lengths.
const routesPx = (w: number, h: number) => ROUTE_PTS.map((r) => ({ id: r.id, d: pathD(r.pts.map(([x, y]) => [x * w, y * h] as Pt)) }));
const NODES: Pt[] = CONNECTORS.flatMap((c) => [c.pts[0], c.pts[c.pts.length - 1]]);
const COLS = ["A", "B", "C", "D", "E", "F"];

/**
 * The board. A tall spacer supplies the scroll; a sticky, clipped frame is
 * the camera's viewfinder; inside it one world element — the whole drawing —
 * is translated and scaled so the camera travels through it in two
 * dimensions. Everything per-frame is written straight to the DOM from a
 * single rAF loop; React only re-renders when the station or clip changes.
 */
export function SpatialHome() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const routeRefs = useRef<Record<string, SVGPathElement | null>>({});
  const mapCamRef = useRef<SVGRectElement>(null);
  const mapRouteRefs = useRef<Record<string, SVGPathElement | null>>({});
  const coordRef = useRef<HTMLSpanElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const size = useRef({ w: 0, h: 0 });
  const smooth = useRef(0);
  const cam = useRef({ s: 1 });

  const [station, setStation] = useState<StationId>("hero");
  const [visited, setVisited] = useState<Set<StationId>>(() => new Set<StationId>(["hero"]));
  const [clip, setClip] = useState(0);
  const [dims, setDims] = useState({ w: 1440, h: 900 });

  const scrollToProgress = useCallback((p: number, behavior: ScrollBehavior = "smooth") => {
    const spacer = spacerRef.current;
    if (!spacer) return;
    const top = spacer.getBoundingClientRect().top + window.scrollY;
    const range = spacer.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + p * range, behavior });
  }, []);

  const goto = useCallback((id: StationId) => scrollToProgress(progressForStation(id)), [scrollToProgress]);

  useEffect(() => {
    const frame = frameRef.current!;
    const world = worldRef.current!;
    const spacer = spacerRef.current!;
    // Only one of the two homepage layouts is displayed; do nothing when this one isn't.
    const mq = window.matchMedia("(min-width: 1024px)");
    const isBoard = () => getComputedStyle(spacer.parentElement!).display !== "none";
    let raf = 0;
    let last = performance.now();
    let lastStation: StationId = "hero";
    let lastClip = 0;

    const measure = () => {
      size.current = { w: frame.clientWidth, h: frame.clientHeight };
      world.style.setProperty("--W", `${size.current.w}px`);
      world.style.setProperty("--H", `${size.current.h}px`);
      setDims((d) => (d.w === size.current.w && d.h === size.current.h ? d : { ...size.current }));
    };

    const rawProgress = () => {
      const range = spacer.offsetHeight - window.innerHeight;
      return range > 0 ? Math.min(Math.max(-spacer.getBoundingClientRect().top / range, 0), 1) : 0;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = now - last;
      last = now;
      const target = rawProgress();
      // Critically-damped follow: smooths wheel steps without spring overshoot.
      smooth.current += (target - smooth.current) * (1 - Math.exp(-dt / 95));
      if (Math.abs(target - smooth.current) < 0.00002) smooth.current = target;

      const c = cameraAt(smooth.current);
      const { w, h } = size.current;
      cam.current.s = c.scale;
      const tx = w / 2 - c.x * w * c.scale;
      const ty = h / 2 - c.y * h * c.scale;
      world.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${c.scale.toFixed(4)})`;

      for (const id in routeRefs.current) {
        const off = String(1 - (c.drawn[id] ?? 0));
        routeRefs.current[id]?.style.setProperty("stroke-dashoffset", off);
        mapRouteRefs.current[id]?.style.setProperty("stroke-dashoffset", off);
      }

      const vw = 1 / c.scale;
      mapCamRef.current?.setAttribute("x", String(c.x - vw / 2));
      mapCamRef.current?.setAttribute("y", String(c.y - vw / 2));
      mapCamRef.current?.setAttribute("width", String(vw));
      mapCamRef.current?.setAttribute("height", String(vw));
      if (coordRef.current) coordRef.current.textContent = `X ${c.x.toFixed(2)}  Y ${c.y.toFixed(2)}  ${(c.scale * 100).toFixed(0)}%`;

      // Playhead: present only while the camera rides the Work track.
      const onTrack = c.x > 1.7 && c.x < TRACK.panEnd + 0.2 ? Math.max(0, 1 - Math.abs(c.y - TRACK.y) * 6) * (c.scale > 0.97 ? 1 : 0) : 0;
      if (playheadRef.current) playheadRef.current.style.opacity = onTrack.toFixed(3);

      if (c.station !== lastStation) {
        lastStation = c.station;
        setStation(c.station);
        setVisited((v) => (v.has(c.station) ? v : new Set(v).add(c.station)));
        setCanvasState({ station: c.station });
      }
      // The lit clip is whichever sits closest to the playhead (screen centre).
      let nearest = 0;
      let best = Infinity;
      TIMELINE_PIECES.forEach((_, i) => {
        const d = Math.abs(clipLeft(i) + TRACK.clipWidth / 2 - c.x);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      if (nearest !== lastClip) {
        lastClip = nearest;
        setClip(nearest);
      }
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (!mq.matches || !isBoard()) {
        setCanvasState({ station: null, goto: null });
        return;
      }
      measure();
      smooth.current = rawProgress();
      setCanvasState({ goto, station: lastStation });
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    // Keyboard focus inside the board moves the camera to what was focused.
    const onFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      const r = el.getBoundingClientRect();
      const fr = frame.getBoundingClientRect();
      const inView = r.left >= fr.left && r.right <= fr.right && r.top >= fr.top + 56 && r.bottom <= fr.bottom;
      if (inView && cam.current.s > 0.98) return;
      // Inside a one-screen station: rest the camera on that station.
      const host = el.closest<HTMLElement>("[data-station]")?.dataset.station as StationId | undefined;
      if (host) return scrollToProgress(progressForStation(host), "auto");
      const wr = world.getBoundingClientRect();
      const s = cam.current.s;
      const pt: Pt = [((r.left + r.width / 2 - wr.left) / s) / size.current.w, ((r.top + r.height / 2 - wr.top) / s) / size.current.h];
      scrollToProgress(progressNearest(pt), "auto");
    };

    const onHash = () => {
      const id = window.location.hash.slice(1) as StationId;
      if (id in STATION_BY_ID) scrollToProgress(progressForStation(id), "auto");
    };

    start();
    onHash();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    mq.addEventListener("change", start);
    frame.addEventListener("focusin", onFocus);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mq.removeEventListener("change", start);
      frame.removeEventListener("focusin", onFocus);
      window.removeEventListener("hashchange", onHash);
      setCanvasState({ station: null, goto: null });
    };
  }, [goto, scrollToProgress]);

  const active = (id: StationId) => visited.has(id);

  return (
    <div ref={spacerRef} className="relative" style={{ height: `${(JOURNEY_VH + 1) * 100}vh` }}>
      <div ref={frameRef} className="overflow-clip-both sticky top-0 h-[100svh] bg-navy-deep">
        {/* ── The world ─────────────────────────────────────────────── */}
        <div
          ref={worldRef}
          className="world-grid absolute left-0 top-0 origin-top-left bg-navy"
          style={
            {
              "--W": "100vw",
              "--H": "100svh",
              width: `calc(var(--W) * ${WORLD.w})`,
              height: `calc(var(--H) * ${WORLD.h})`,
              willChange: "transform",
            } as React.CSSProperties
          }
        >
          {/* Sheet border and grid references */}
          <div aria-hidden className="pointer-events-none absolute inset-[10px] border border-line/25" />
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {COLS.slice(0, Math.ceil(WORLD.w)).map((c, i) => (
              <GridBubble key={c} label={c} style={{ left: `calc(var(--W) * ${i + 0.5})`, bottom: 26 }} />
            ))}
            {Array.from({ length: Math.ceil(WORLD.h) }, (_, i) => (
              <GridBubble key={i} label={String(i + 1)} style={{ top: `calc(var(--H) * ${i + 0.5})`, left: 26 }} />
            ))}
          </div>

          {/* Route: faint planned line underneath, gold drawn line on top */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${WORLD.w * dims.w} ${WORLD.h * dims.h}`}
            preserveAspectRatio="none"
          >
            {routesPx(dims.w, dims.h).map((r) => (
              <path key={`p-${r.id}`} d={r.d} fill="none" stroke="rgb(var(--line) / 0.4)" strokeWidth="1" strokeDasharray="3 7" />
            ))}
            {routesPx(dims.w, dims.h).map((r) => (
              <path
                key={r.id}
                ref={(el) => {
                  routeRefs.current[r.id] = el;
                }}
                d={r.d}
                fill="none"
                stroke="rgb(var(--gold))"
                strokeWidth="1.5"
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={1}
              />
            ))}
          </svg>
          {NODES.map(([x, y], i) => (
            <span
              key={i}
              aria-hidden
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-navy"
              style={{ left: `calc(var(--W) * ${x})`, top: `calc(var(--H) * ${y})` }}
            />
          ))}

          {/* Stations, in reading order */}
          <Place id="hero" label="Voxlo">
            <HeroStation variant="canvas" />
          </Place>
          <section aria-label="Work">
            <WorkStation variant="canvas" active={active("work")} activeClip={clip} />
          </section>
          <Place id="proof" label="Testimonials">
            <ProofStation variant="canvas" active={active("proof")} />
          </Place>
          {/* Disciplines, pinned along the bottom swoop */}
          <section aria-label="Disciplines">
            {WAYPOINTS.map((w, i) => (
              <div
                key={w.title}
                className="absolute w-[min(22vw,320px)]"
                style={{ left: `calc(var(--W) * ${w.x})`, top: `calc(var(--H) * ${w.line - 0.1})`, transform: "translate(-12px, -100%)" }}
              >
                <Mono className="text-gold">Discipline {String(i + 1).padStart(2, "0")}</Mono>
                <h3 className="mt-3 font-display text-[clamp(1.8rem,2.6vw,2.8rem)] leading-none text-cream">{w.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{w.text}</p>
                <span aria-hidden className="absolute left-3 top-full h-[calc(var(--H)*0.1)] w-px bg-gold/50" />
              </div>
            ))}
          </section>

          <Place id="about" label="Who I am">
            <AboutStation variant="canvas" active={active("about")} />
          </Place>
          <Place id="contact" label="Get in touch">
            <ContactStation variant="canvas" active={active("contact")} />
          </Place>
        </div>

        {/* ── Viewfinder chrome (fixed to the camera, not the world) ─── */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div ref={playheadRef} className="absolute left-1/2 top-[13vh] h-[7vh] w-px bg-gold opacity-0">
            <span className="absolute -left-[5px] -top-[6px] block h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-gold" />
          </div>
        </div>

        <nav aria-label="Board map" className="absolute bottom-6 right-6 z-10">
          <div className="relative border border-line/30 bg-navy/85 p-2" style={{ width: 176 }}>
            <svg viewBox={`0 0 ${WORLD.w} ${WORLD.h}`} className="block w-full" aria-hidden>
              {STATIONS.map((s) =>
                s.id === "work" ? (
                  <rect key={s.id} x={1.4} y={1.05} width={clipLeft(4) + TRACK.clipWidth - 1.4} height={0.8} fill="none" stroke="rgb(var(--line) / 0.55)" strokeWidth="0.02" />
                ) : (
                  <rect key={s.id} x={s.center[0] - 0.42} y={s.center[1] - 0.36} width={0.84} height={0.72} fill="none" stroke="rgb(var(--line) / 0.55)" strokeWidth="0.02" />
                )
              )}
              {ROUTES.map((r) => (
                <path
                  key={r.id}
                  ref={(el) => {
                    mapRouteRefs.current[r.id] = el;
                  }}
                  d={r.d}
                  fill="none"
                  stroke="rgb(var(--gold))"
                  strokeWidth="0.035"
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={1}
                />
              ))}
              <rect ref={mapCamRef} x={0} y={0} width={1} height={1} fill="rgb(var(--cream) / 0.06)" stroke="rgb(var(--cream))" strokeWidth="0.03" />
            </svg>
            {STATIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goto(s.id)}
                aria-label={`Go to ${s.label}`}
                aria-current={station === s.id ? "location" : undefined}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 px-1 font-mono text-[9px] leading-none tracking-[0.1em] transition-colors",
                  station === s.id ? "text-gold" : "text-cream/60 hover:text-cream"
                )}
                style={{ left: 8 + (s.center[0] / WORLD.w) * 160, top: 8 + (s.center[1] / WORLD.h) * 160 * (WORLD.h / WORLD.w) }}
              >
                {s.index}
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between gap-4">
            <Mono className="text-cream/80">
              {STATION_BY_ID[station].index} — {STATION_BY_ID[station].label}
            </Mono>
            <Mono aria-hidden>
              <span ref={coordRef} className="whitespace-pre">
                X 0.50  Y 0.50  100%
              </span>
            </Mono>
          </div>
          <div className="mt-2">
            <MotionOptIn mode="disable" />
          </div>
        </nav>
      </div>
    </div>
  );
}

/** Positions a one-viewport station frame at its world coordinates. */
function Place({ id, label, children }: { id: StationId; label: string; children: React.ReactNode }) {
  const [x, y] = STATION_BY_ID[id].center;
  const Tag = id === "hero" ? "header" : "section";
  return (
    <Tag
      aria-label={label}
      data-station={id}
      className="absolute"
      style={{ left: `calc(var(--W) * ${x - 0.5})`, top: `calc(var(--H) * ${y - 0.5})`, width: "var(--W)", height: "var(--H)" }}
    >
      {children}
    </Tag>
  );
}

function GridBubble({ label, style }: { label: string; style: React.CSSProperties }) {
  return (
    <span
      className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line/40 font-mono text-[10px] text-line/80"
      style={{ ...style, transform: style.bottom !== undefined ? "translate(-50%, 50%)" : undefined }}
    >
      {label}
    </span>
  );
}
