import { cn } from "@/lib/utils";
import { STATION_BY_ID, type StationId } from "@/lib/canvas/world";

/** Monospace annotation register: labels, references, measurements. */
export function Mono({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("font-mono text-[10.5px] uppercase leading-none tracking-[0.16em] text-muted-foreground", className)} {...props}>
      {children}
    </span>
  );
}

/** Station identifier: "02 — Work", with its grid reference on the board. */
export function StationTag({ id, className }: { id: StationId; className?: string }) {
  const s = STATION_BY_ID[id];
  return (
    <div data-reveal className={cn("flex items-center gap-3", className)}>
      <Mono className="text-gold">{s.index}</Mono>
      <svg aria-hidden width="28" height="1" className="overflow-visible">
        <line data-draw x1="0" y1="0.5" x2="28" y2="0.5" className="stroke-gold/70" strokeWidth="1" />
      </svg>
      <Mono className="text-cream/80">{s.label}</Mono>
      <Mono aria-hidden className="text-line/80">
        [{s.ref}]
      </Mono>
    </div>
  );
}

/** Crop marks at the four corners of a frame — drawn in, never boxed. */
export function CropMarks({ className, size = 18, inset = 0 }: { className?: string; size?: number; inset?: number }) {
  const corners = [
    { c: "left-0 top-0", d: `M0 ${size} V0 H${size}` },
    { c: "right-0 top-0", d: `M0 0 H${size} V${size}` },
    { c: "left-0 bottom-0", d: `M0 0 V${size} H${size}` },
    { c: "right-0 bottom-0", d: `M0 ${size} H${size} V0` },
  ];
  return (
    <div aria-hidden className={cn("pointer-events-none absolute", className)} style={{ inset }}>
      {corners.map(({ c, d }) => (
        <svg key={c} width={size} height={size} className={cn("absolute overflow-visible", c)}>
          <path data-draw d={d} fill="none" className="stroke-line/60" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}

/** Horizontal dimension line with end ticks; the line breaks around its label rather than masking it. */
export function Dimension({ label, className }: { label: string; className?: string }) {
  const side = (flip: boolean) => (
    <svg className={cn("h-3 flex-1 overflow-visible", flip && "-scale-x-100")} preserveAspectRatio="none" viewBox="0 0 100 12">
      <path data-draw d="M0 0 V12 M0 6 H100" fill="none" className="stroke-gold/60" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
  return (
    <div aria-hidden className={cn("flex items-center gap-3", className)}>
      {side(false)}
      <span data-reveal>
        <Mono className="text-gold">{label}</Mono>
      </span>
      {side(true)}
    </div>
  );
}
