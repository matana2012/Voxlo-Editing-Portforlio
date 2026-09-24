"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { REN, ytThumb } from "@/lib/data/ren";
import { VideoDialog, type DialogVideo } from "@/components/canvas/VideoDialog";
import { ToolTag } from "@/components/work/ToolTag";

const mono = "font-mono text-[10.5px] uppercase tracking-[0.16em]";

function Frame({ id, title, n, big, onOpen }: { id: string; title: string; n: number; big?: boolean; onOpen: (id: string, title: string) => void }) {
  return (
    <figure className={big ? "lg:row-span-2" : undefined}>
      <button
        type="button"
        onClick={() => onOpen(id, title)}
        aria-label={`Play Ren: ${title}`}
        className="group relative block aspect-video w-full overflow-hidden bg-navy-deep outline outline-1 outline-line/25"
      >
        <Image src={ytThumb(id)} alt="" fill sizes={big ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 30vw"} className="object-cover" />
        <span className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/20" />
        <span className="absolute bottom-0 left-0 flex h-8 items-center gap-2 bg-navy/90 px-3 text-cream transition-colors group-hover:bg-gold group-hover:text-navy">
          <Play className="h-3 w-3" fill="currentColor" />
          <span className={mono}>Play</span>
        </span>
      </button>
      <figcaption className="mt-3 flex items-baseline gap-3">
        <span className={`${mono} text-gold`}>{String(n).padStart(2, "0")}</span>
        <span className="text-sm text-cream/85">{title}</span>
      </figcaption>
    </figure>
  );
}

/** Ren, first on the Work page: a clean bin of his best edits and the proof an edit makes. */
export function RenShowcase() {
  const [video, setVideo] = useState<DialogVideo | null>(null);
  const open = (id: string, title: string) => setVideo({ id, title, label: "Ren — " + REN.series });
  const cmp = REN.comparison;
  const [a, ...rest] = REN.best;

  return (
    <section aria-labelledby="ren-heading" className="mb-24">
      <div className="flex flex-col justify-between gap-6 border-b border-line/25 pb-8 md:flex-row md:items-end">
        <div>
          <p className={`${mono} flex items-center gap-3 text-gold`}>
            01 <span aria-hidden className="h-px w-7 bg-gold/70" /> <span className="text-cream/70">Main channel</span>
          </p>
          <h2 id="ren-heading" className="mt-6 font-display text-5xl font-normal leading-[0.95] tracking-[-0.02em] text-cream md:text-6xl">
            Ren <em className="font-light italic text-gold">— {REN.series}.</em>
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">I edit Ren&apos;s uploads. These three are the best of the series.</p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex flex-wrap gap-2">
            {REN.tools.map((t) => (
              <ToolTag key={t} name={t} />
            ))}
          </div>
          <a href={REN.url} target="_blank" rel="noopener noreferrer" className={`${mono} inline-flex items-center gap-1.5 text-cream/80 hover:text-gold`}>
            Ren&apos;s channel <ArrowUpRight className="h-3.5 w-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Frame id={a.id} title={a.title} n={1} big onOpen={open} />
        {rest.map((v, i) => (
          <Frame key={v.id} id={v.id} title={v.title} n={i + 2} onOpen={open} />
        ))}
      </div>

      {/* The difference an edit makes: same channel, same series */}
      <div className="mt-14 border-y border-gold/40 py-8">
        <p className={`${mono} text-gold`}>Same channel · same series · the edit is the difference</p>
        <div className="mt-6 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          {[
            { v: cmp.without, note: "Not edited by me", strong: false },
            null,
            { v: cmp.with, note: "Edited by me", strong: true },
          ].map((row, i) =>
            row ? (
              <button key={row.note} type="button" onClick={() => open(row.v.id, row.v.title)} className="group flex items-center gap-5 text-left">
                <span className="relative block aspect-video w-36 shrink-0 overflow-hidden bg-navy-deep outline outline-1 outline-line/30 sm:w-44">
                  <Image src={ytThumb(row.v.id)} alt="" fill sizes="176px" className={row.strong ? "object-cover" : "object-cover grayscale-[0.6]"} />
                </span>
                <span className="min-w-0">
                  <span className={`${mono} block ${row.strong ? "text-cream" : "text-muted-foreground"}`}>{row.note}</span>
                  <span className="mt-1 block truncate text-sm text-cream/70 group-hover:text-cream">{row.v.title}</span>
                  <span className={`mt-2 block font-display text-4xl tabular-nums ${row.strong ? "text-gold" : "text-cream/60"}`}>
                    {row.v.views} <span className="font-sans text-sm text-muted-foreground">views</span>
                  </span>
                </span>
              </button>
            ) : (
              <div key={i} aria-hidden className="flex items-center gap-3 text-gold md:flex-col">
                <ArrowRight className="h-5 w-5" />
              </div>
            )
          )}
        </div>
        <p className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="font-display text-5xl leading-none text-gold">{cmp.multiple}</span>
          <span className="text-cream/80">the views — {cmp.increase}</span>
          <span className={`${mono} text-muted-foreground`}>View counts as of {cmp.asOf}</span>
        </p>
      </div>

      <VideoDialog video={video} onClose={() => setVideo(null)} />
    </section>
  );
}
