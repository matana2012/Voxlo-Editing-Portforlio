/**
 * Site-wide cinematic overlay: a subtle warm vignette + animated film grain.
 * Fixed, pointer-events-none, sits above content but never blocks interaction.
 * Grain animation is disabled automatically under prefers-reduced-motion
 * (handled globally in globals.css).
 */

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E";

export function FilmGrain() {
  return (
    <>
      {/* Warm cinematic vignette — darkens the corners like a lens */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{
          background:
            "radial-gradient(130% 130% at 50% 45%, transparent 58%, rgba(0,0,0,0.38) 100%)",
        }}
      />
      {/* Animated film grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-[-50%] z-[61] opacity-[0.055] animate-grain mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE}")`,
          backgroundSize: "160px 160px",
        }}
      />
    </>
  );
}
