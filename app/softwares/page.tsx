import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SoftwareLogo } from "@/components/software/SoftwareLogo";

export const metadata: Metadata = {
  title: "Softwares",
  description:
    "The software toolkit behind every Voxlo edit — editing, motion graphics, design, capture, and development tools.",
};

interface Software {
  name: string;
  slug: string;
  note?: string;
}

interface Category {
  title: string;
  blurb: string;
  items: Software[];
}

// Logos load from /logos/<slug>.png; missing files fall back to a name tile.
const categories: Category[] = [
  {
    title: "Editing & Motion Graphics",
    blurb: "Where the cut, the color, and the motion come together.",
    items: [
      { name: "DaVinci Resolve", slug: "davinci-resolve" },
      { name: "DaVinci Fusion", slug: "davinci-fusion" },
      { name: "Fairlight", slug: "fairlight" },
      { name: "Blender", slug: "blender" },
      { name: "Premiere Pro", slug: "premiere-pro", note: "On request" },
      { name: "After Effects", slug: "after-effects", note: "On request" },
    ],
  },
  {
    title: "Design & Graphics",
    blurb: "Thumbnails, overlays, and everything that has to look sharp.",
    items: [
      { name: "Photopea", slug: "photopea" },
    ],
  },
  {
    title: "Recording & Capture",
    blurb: "Getting the footage in, clean and high quality.",
    items: [
      { name: "OBS", slug: "obs" },
      { name: "Flashback", slug: "flashback", note: "Minecraft" },
    ],
  },
  {
    title: "Development",
    blurb: "Building and automating the workflow behind the scenes.",
    items: [
      { name: "Claude (Anthropic)", slug: "claude" },
    ],
  },
];

export default function SoftwaresPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <AnimatedSection className="mb-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            The toolkit
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[0.9] tracking-tight text-foreground md:text-7xl">
            The tools behind
            <br />
            every <span className="text-ember">cut.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            These are all the softwares I use — from raw footage to final render.
          </p>
        </AnimatedSection>

        {/* Categories */}
        <div className="space-y-16">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.title} delay={i * 0.05}>
              <section aria-labelledby={`cat-${i}`}>
                <h2
                  id={`cat-${i}`}
                  className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                >
                  {cat.title}
                </h2>
                <p className="mt-2 mb-8 max-w-md text-muted-foreground">{cat.blurb}</p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.slug}
                      className="flex items-center gap-5 rounded-2xl border border-border bg-muted/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                    >
                      <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background p-3.5">
                        <SoftwareLogo src={`/logos/${item.slug}.png`} name={item.name} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-xl font-semibold text-foreground">
                          {item.name}
                        </p>
                        {item.note && (
                          <span className="mt-1 inline-block rounded-full border border-accent/25 bg-accent-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground/70">
                            {item.note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedSection>
          ))}
        </div>

        {/* Footnote */}
        <AnimatedSection delay={0.1} className="mt-16">
          <p className="text-sm text-muted-foreground/60">
            Premiere Pro and After Effects are available on request.
          </p>
        </AnimatedSection>

      </div>
    </div>
  );
}
