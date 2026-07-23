// Maps a tool name to its logo in /public/logos. Names must match the strings
// used in portfolioPieces tools[] and the Work page tool lists.
const TOOL_LOGOS: Record<string, string> = {
  "DaVinci Resolve": "/logos/davinci-resolve.png",
  "DaVinci Fusion": "/logos/davinci-fusion.png",
  Fairlight: "/logos/fairlight.png",
  Photopea: "/logos/photopea.png",
  OBS: "/logos/obs.png",
  Flashback: "/logos/flashback.png",
  Blender: "/logos/blender.png",
  Claude: "/logos/claude.png",
  "Premiere Pro": "/logos/premiere-pro.png",
  "After Effects": "/logos/after-effects.png",
};

/** A tool pill with a small software logo on the left. */
export function ToolTag({ name }: { name: string }) {
  const logo = TOOL_LOGOS[name];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/5 px-2.5 py-1.5 text-xs text-foreground/80">
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="h-4 w-4 flex-shrink-0 rounded-[3px] object-contain"
        />
      )}
      {name}
    </span>
  );
}
