"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { featuredPieces, CATEGORY_LABELS, type PortfolioPiece } from "@/lib/data/portfolioPieces";
import { REN, ytThumb } from "@/lib/data/ren";
import { TRACK, clipLeft } from "@/lib/canvas/world";
import { TOOL_LOGOS } from "@/components/work/ToolTag";
import { useConstructInView, useConstructOnActive } from "../construct";
import { Mono, StationTag } from "../primitives";
import { VideoDialog, type DialogVideo } from "../VideoDialog";
import type { Variant } from "./HeroStation";

// Slot 01 is Ren (the main channel, shown as a bin of his best edits);
// the rest are real client pieces, in timeline order.
const ORDER = ["klentbolt-showcase", "cilua-showcase", "rustyoldman-showcase", "vincent-global-showcase"];
const PIECES = ORDER.map((id) => featuredPieces.find((p) => p.id === id)).filter((p): p is PortfolioPiece => Boolean(p));
/** Entries on the timeline, in order. Length drives the playhead's lit-clip logic. */
export const TIMELINE_PIECES: ("ren" | PortfolioPiece)[] = ["ren", ...PIECES];

const TOOL_SHORT: Record<string, string> = { "DaVinci Resolve": "Resolve", "DaVinci Fusion": "Fusion" };

// The founder's own framing for a piece, taken from the Work page.
const TAGLINES: Record<string, string> = {
  "klentbolt-showcase": "The one I'm proudest of — storytelling, Fusion effects, colour grading and 4K footage.",
};

/** Descriptive line: the founder's framing, a real title, or the first thing that was done. */
function describe(p: PortfolioPiece) {
  return TAGLINES[p.id] ?? (p.title.startsWith("Edited for") ? p.whatWasDone[0] : p.title);
}

/** Focus falls off with distance from the playhead: lit, adjacent, further. */
const FOCUS = ["opacity-100", "opacity-45", "opacity-25"];

const W = (n: number) => `calc(var(--W) * ${n})`;
const H = (n: number) => `calc(var(--H) * ${n})`;
const ORIGIN_X = 1.35;
const ORIGIN_Y = 0.95;
const pad = (n: number) => String(n).padStart(2, "0");

type OnPlay = (v: DialogVideo) => void;

/**
 * 02 — Work, drawn as an edit timeline / archive. The route line becomes the
 * ruler, each entry is a clip on the track, and the camera pans along it like
 * a playhead. The clip under the playhead is lit; the rest wait.
 */
export function WorkStation({ variant, active = false, activeClip = 0 }: { variant: Variant; active?: boolean; activeClip?: number }) {
  const canvasRef = useConstructOnActive(active, { delay: 150 });
  const stackRef = useConstructInView();
  const [video, setVideo] = useState<DialogVideo | null>(null);
  const play = useCallback<OnPlay>((v) => setVideo(v), []);
  const dialog = <VideoDialog video={video} onClose={() => setVideo(null)} />;

  const entry = (e: (typeof TIMELINE_PIECES)[number], i: number, distance: number, board: boolean) =>
    e === "ren" ? (
      <RenBin distance={distance} board={board} onPlay={play} />
    ) : (
      <Clip piece={e} index={i} distance={distance} board={board} onPlay={play} />
    );

  if (variant === "stack") {
    return (
      <div ref={stackRef} className="is-pending px-6 py-20">
        <Intro board={false} />
        <ol className="mt-14 space-y-16">
          {TIMELINE_PIECES.map((e, i) => (
            <li key={e === "ren" ? "ren" : e.id}>{entry(e, i, 0, false)}</li>
          ))}
        </ol>
        {dialog}
      </div>
    );
  }

  const end = clipLeft(TIMELINE_PIECES.length - 1) + TRACK.clipWidth;
  const rulerY = H(1.08 - ORIGIN_Y);
  const outX = W(end + 0.02 - ORIGIN_X);

  return (
    <div
      ref={canvasRef}
      className="is-pending absolute"
      style={{ left: W(ORIGIN_X), top: H(ORIGIN_Y), width: W(end - ORIGIN_X + 0.1), height: H(1) }}
    >
      {/* Timeline ruler ticks — minor every ~2% of a viewport */}
      <div
        aria-hidden
        data-reveal
        className="absolute h-2"
        style={{
          left: W(1.43 - ORIGIN_X),
          width: W(end - 1.43 + 0.02),
          top: rulerY,
          backgroundImage: "repeating-linear-gradient(90deg, rgb(var(--line) / 0.45) 0 1px, transparent 1px calc(var(--W) * 0.021))",
        }}
      />
      {/* The reel has an in and an out */}
      <div aria-hidden className="absolute -translate-y-full pb-2" style={{ left: W(1.43 - ORIGIN_X), top: rulerY }}>
        <Mono className="text-line">In · Archive</Mono>
      </div>
      <div aria-hidden className="absolute -translate-x-full -translate-y-full pb-2" style={{ left: outX, top: rulerY }}>
        <Mono className={cn("transition-colors duration-500", activeClip === TIMELINE_PIECES.length - 1 ? "text-gold" : "text-line")}>
          Out · End of archive
        </Mono>
      </div>
      <div aria-hidden className="absolute h-4 w-px -translate-y-1/2 bg-line/70" style={{ left: outX, top: rulerY }} />

      <div className="absolute" style={{ left: W(0.08), top: H(0.25), width: W(0.5) }}>
        <Intro board />
      </div>

      <ol>
        {TIMELINE_PIECES.map((e, i) => (
          <li key={e === "ren" ? "ren" : e.id} className="absolute" style={{ left: W(clipLeft(i) - ORIGIN_X), top: rulerY }}>
            {/* In-point marker on the ruler */}
            <div aria-hidden className="absolute -top-7 left-0">
              <Mono className={cn("transition-colors duration-500", activeClip === i ? "text-gold" : "text-line")}>V1 · {pad(i + 1)}</Mono>
            </div>
            <div aria-hidden className={cn("absolute -top-1 left-0 h-6 w-px transition-colors duration-500", activeClip === i ? "bg-gold" : "bg-line/60")} />
            <div style={{ width: W(TRACK.clipWidth), paddingTop: H(0.07) }}>{entry(e, i, Math.abs(activeClip - i), true)}</div>
          </li>
        ))}
      </ol>
      {dialog}
    </div>
  );
}

function Intro({ board }: { board: boolean }) {
  return (
    <div>
      <StationTag id="work" />
      <h2 data-reveal className="mt-8 font-display text-[clamp(2.6rem,4.6vw,5rem)] font-normal leading-[0.95] tracking-[-0.02em] text-cream">
        Real cuts.
        <br />
        <em className="font-light italic text-gold">Real channels.</em>
      </h2>
      <p data-reveal className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-muted-foreground">
        Five channels laid out on one timeline.{" "}
        {board ? "Keep scrolling and the playhead runs through them — click any frame to watch." : "Tap any frame to watch."}
      </p>
      <dl data-reveal className="mt-7 grid max-w-[300px] grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-line/25 pt-4">
        <dt>
          <Mono>Archive</Mono>
        </dt>
        <dd>
          <Mono className="text-cream/80">Selected edits</Mono>
        </dd>
        <dt>
          <Mono>Entries</Mono>
        </dt>
        <dd>
          <Mono className="text-cream/80">{pad(TIMELINE_PIECES.length)} channels</Mono>
        </dd>
      </dl>
      <Link
        data-reveal
        href="/work"
        className="group mt-7 inline-flex items-center gap-2 border-b border-cream/30 pb-1 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
      >
        The full archive
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

/** Registration marks: corner ticks plus centre ticks, on the lit clip only. Never a full border. */
function RegMarks({ on }: { on: boolean }) {
  const c = "absolute h-2.5 w-2.5 border-gold";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute -inset-[7px] transition-opacity duration-700", on ? "opacity-100" : "opacity-0")}>
      <span className={cn(c, "left-0 top-0 border-l border-t")} />
      <span className={cn(c, "right-0 top-0 border-r border-t")} />
      <span className={cn(c, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(c, "bottom-0 right-0 border-b border-r")} />
      <span className="absolute left-1/2 top-0 h-1.5 w-px bg-gold/70" />
      <span className="absolute bottom-0 left-1/2 h-1.5 w-px bg-gold/70" />
    </div>
  );
}

/** Thumbnail with focus treatment: the lit clip gets full contrast; the rest desaturate under a navy veil. */
function Thumb({ src, lit, sizes, eager }: { src: string; lit: boolean; sizes: string; eager: boolean }) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className={cn("object-cover transition-[filter] duration-700", lit ? "contrast-[1.06] saturate-[1.05]" : "grayscale-[0.85]")}
      />
      <span className={cn("absolute inset-0 transition-colors duration-500", lit ? "bg-navy/0 group-hover:bg-navy/15" : "bg-navy/30")} />
    </>
  );
}

function PlayTag({ label = "Play", external }: { label?: string; external?: boolean }) {
  return (
    <span className="absolute bottom-0 left-0 flex h-7 items-center gap-2 bg-navy/90 px-2.5 text-cream transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
      {external ? <ArrowUpRight className="h-3 w-3" /> : <Play className="h-2.5 w-2.5" fill="currentColor" />}
      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em]">{label}</span>
    </span>
  );
}

function Tools({ tools }: { tools: string[] }) {
  return (
    <ul aria-label="Made with" className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      {tools.slice(0, 4).map((t) => (
        <li key={t} className="flex items-center gap-1.5">
          {TOOL_LOGOS[t] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={TOOL_LOGOS[t]} alt="" aria-hidden className="h-3.5 w-3.5 object-contain" />
          )}
          <Mono className="text-line">{TOOL_SHORT[t] ?? t}</Mono>
        </li>
      ))}
    </ul>
  );
}

function ChannelLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-auto inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream/80 underline-offset-4 transition-colors hover:text-gold hover:underline"
    >
      Channel <ArrowUpRight className="h-3 w-3" />
      <span className="sr-only">for {name} (opens in a new tab)</span>
    </a>
  );
}

/** Number + name, with the body text indented to the name's left edge. */
function Meta({ index, name, lit, children }: { index: number; name: string; lit: boolean; children: React.ReactNode }) {
  return (
    <div className="mt-6 grid grid-cols-[28px_1fr]">
      <span className={cn("pt-2 font-mono text-[11px] tracking-[0.1em] transition-colors duration-500", lit ? "text-gold" : "text-line")}>
        {pad(index + 1)}
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-[clamp(1.5rem,2.1vw,2.1rem)] leading-tight text-cream">{name}</h3>
        {children}
      </div>
    </div>
  );
}

/** 01 — Ren: the main channel, as a bin of three edits plus the before/after proof. */
function RenBin({ distance, board, onPlay }: { distance: number; board: boolean; onPlay: OnPlay }) {
  const lit = distance === 0;
  const [a, b, c] = REN.best;
  const cmp = REN.comparison;
  const open = (id: string, title: string) => onPlay({ id, title, label: "V1 · 01 — Ren" });

  const frame = (v: { id: string; title: string }, n: number, big?: boolean) => (
    <button
      key={v.id}
      type="button"
      onClick={() => open(v.id, v.title)}
      aria-label={`Play Ren: ${v.title}`}
      className={cn("group relative overflow-hidden bg-navy-deep", big && "row-span-2")}
    >
      <Thumb src={ytThumb(v.id)} lit={lit} sizes={big ? "(max-width: 1024px) 70vw, 26vw" : "(max-width: 1024px) 34vw, 13vw"} eager={board} />
      <span className="absolute right-1.5 top-1.5 bg-navy/85 px-1.5 py-1 font-mono text-[9px] tracking-[0.12em] text-cream/80">{pad(n)}</span>
      {big && <PlayTag />}
    </button>
  );

  return (
    <div data-reveal>
      <article className={cn("transition-opacity duration-700", FOCUS[Math.min(distance, 2)])} aria-label="Ren: best edits from the Road to GC series">
        <div className="relative">
          <RegMarks on={lit && board} />
          <div className="grid aspect-video grid-cols-[2fr_1fr] grid-rows-2 gap-1 outline outline-1 outline-line/25">
            {frame(a, 1, true)}
            {frame(b, 2)}
            {frame(c, 3)}
          </div>
        </div>

        <Meta index={0} name="Ren" lit={lit}>
          <p className="mt-1.5 max-w-[46ch] text-[14px] leading-snug text-muted-foreground">
            Main channel — I edit his {REN.series} uploads. Three of the best.
          </p>

          {/* Proof: same channel, same series */}
          <div className="mt-4 max-w-[46ch] border-l border-gold/50 pl-4">
            <Mono className="text-gold">Same channel · same series</Mono>
            <ul className="mt-2.5 space-y-2">
              {[
                { v: cmp.without, note: "Not my edit", strong: false },
                { v: cmp.with, note: "My edit", strong: true },
              ].map(({ v, note, strong }) => (
                <li key={note}>
                  <button
                    type="button"
                    onClick={() => open(v.id, v.title)}
                    className="group flex w-full items-center gap-3 text-left"
                    aria-label={`Play Ren: ${v.title} (${note}, ${v.views} views)`}
                  >
                    <span className="relative block aspect-video w-14 shrink-0 overflow-hidden bg-navy-deep outline outline-1 outline-line/30">
                      <Thumb src={ytThumb(v.id)} lit={lit} sizes="56px" eager={board} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <Mono className={strong ? "text-cream/90" : undefined}>{note}</Mono>
                      <span className="mt-1 block truncate text-[13px] text-cream/70 group-hover:text-cream">{v.title}</span>
                    </span>
                    <span className={cn("shrink-0 font-display text-lg tabular-nums", strong ? "text-gold" : "text-cream/60")}>
                      {v.views}
                      <span className="sr-only"> views</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-2xl leading-none text-gold">{cmp.multiple}</span>
              <Mono className="text-cream/80">the views · {cmp.increase}</Mono>
              <Mono>as of {cmp.asOf}</Mono>
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/20 pt-3">
            <Mono className="text-cream/70">Gaming · {REN.series}</Mono>
            <ChannelLink href={REN.url} name="Ren" />
          </div>
          <Tools tools={REN.tools} />
        </Meta>
      </article>
    </div>
  );
}

function Clip({ piece, index, distance, board, onPlay }: { piece: PortfolioPiece; index: number; distance: number; board: boolean; onPlay: OnPlay }) {
  const lit = distance === 0;
  const label = `${piece.client}: ${describe(piece)}`;
  const tags = piece.tags.map((t) => CATEGORY_LABELS[t]).join(" · ");
  const poster = piece.thumbnailUrl && <Thumb src={piece.thumbnailUrl} lit={lit} sizes="(max-width: 1024px) 100vw, 38vw" eager={board} />;

  return (
    <div data-reveal>
      <article className={cn("transition-opacity duration-700", FOCUS[Math.min(distance, 2)])} aria-label={label}>
        <div className="relative">
          <RegMarks on={lit && board} />
          <div className="relative aspect-video w-full overflow-hidden bg-navy-deep outline outline-1 outline-line/25">
            {piece.videoUrl ? (
              // Shorts open on YouTube: their cover frame doesn't render in the embed.
              <a href={piece.videoUrl} target="_blank" rel="noopener noreferrer" className="group absolute inset-0" aria-label={`Watch ${label} on YouTube (opens in a new tab)`}>
                {poster}
                <PlayTag label="Watch short" external />
              </a>
            ) : (
              piece.youtubeId && (
                <button
                  type="button"
                  onClick={() => onPlay({ id: piece.youtubeId!, title: describe(piece), label: `V1 · ${pad(index + 1)} — ${piece.client}` })}
                  className="group absolute inset-0"
                  aria-label={`Play ${label}`}
                >
                  {poster}
                  <PlayTag />
                </button>
              )
            )}
          </div>
        </div>

        <Meta index={index} name={piece.client} lit={lit}>
          <p className="mt-1.5 line-clamp-2 max-w-[46ch] text-[14px] leading-snug text-muted-foreground">{describe(piece)}</p>
          <ul className="mt-4 max-w-[46ch] space-y-1.5 border-l border-line/30 pl-4">
            {piece.whatWasDone
              .filter((w) => w !== describe(piece))
              .slice(0, 3)
              .map((w) => (
                <li key={w} className="text-[13px] leading-snug text-cream/70">
                  {w}
                </li>
              ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/20 pt-3">
            <Mono className="text-cream/70">{tags}</Mono>
            {piece.runtime && <Mono>{piece.runtime}</Mono>}
            {piece.clientUrl && <ChannelLink href={piece.clientUrl} name={piece.client} />}
          </div>
          <Tools tools={piece.tools} />
        </Meta>
      </article>
    </div>
  );
}
