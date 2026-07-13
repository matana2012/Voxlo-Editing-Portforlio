import type { Metadata } from "next";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "3D editing, gaming edits, and IRL lifestyle content. No pricing on the site — let's talk.",
};

const services = [
  {
    id: "3d",
    label: "3D Editing",
    tagline: "Where motion meets reality.",
    description:
      "Motion graphics, 3D renders, and VFX compositing seamlessly integrated into your footage. The kind of content that makes people screenshot and ask 'how did they do that?'",
    includes: [
      "3D asset compositing into live footage",
      "Motion tracking & camera matching",
      "Particle and fluid simulation overlays",
      "Depth-of-field and lighting match",
      "Custom motion graphics and lower thirds",
      "Render cleanup and color integration",
    ],
    deliverables: ["Final export (4K/1080p)", "Project files on request", "Revision rounds included"],
    idealClient: "Brands, creators, and agencies wanting content that looks unlike anything else in their niche.",
  },
  {
    id: "gaming",
    label: "Gaming Editing",
    tagline: "Built for the algorithm. Built for the audience.",
    description:
      "High-energy cuts that keep viewers locked in — from FPS montages to commentary-driven long-form. Editing that understands gaming culture, not just editing software.",
    includes: [
      "Highlight reel & montage editing",
      "Commentary sync and pacing",
      "Clip selection and flow optimization",
      "Sound design and music sync",
      "On-screen effects and text overlays",
      "Thumbnail consultation",
    ],
    deliverables: ["YouTube-ready export", "Shorts/Reels cut on request", "Optimized for engagement"],
    idealClient: "Gaming content creators who want to grow their channel with cuts that actually retain viewers.",
  },
  {
    id: "irl",
    label: "IRL / Lifestyle",
    tagline: "Real moments, cinematic execution.",
    description:
      "Vlogs, branded content, and lifestyle pieces that feel cinematic without feeling staged. Story-first editing that respects both the moment and the audience's time.",
    includes: [
      "Multi-cam sync and selects",
      "Narrative structure and pacing",
      "Color grading (custom LUTs)",
      "Licensed or royalty-free music sync",
      "B-roll integration and cutaways",
      "Caption and text overlay packages",
    ],
    deliverables: ["Platform-specific exports (YouTube, Instagram, TikTok)", "Vertical recut on request", "Raw selects log"],
    idealClient: "Creators and brands building a lifestyle presence who need an editor who understands the format inside out.",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="mb-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">Services</p>
          <h1 className="font-display text-5xl font-semibold leading-[0.9] tracking-tight text-foreground md:text-7xl">
            What I <span className="text-ember">do.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            Three disciplines. No cookie-cutter packages. Pricing is discussed in the conversation — where it belongs.
          </p>
        </AnimatedSection>

        {/* Service sections */}
        <div className="space-y-32">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={0.05} id={service.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent mb-4 font-medium">0{i + 1}</p>
                  <h2 className="mb-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    {service.label}
                  </h2>
                  <p className="text-xl text-muted-foreground mb-6 font-medium">{service.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">{service.description}</p>
                  <div className="text-sm text-muted-foreground/60 bg-white/3 border border-border rounded-xl px-5 py-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground/40 mb-2 font-medium">Ideal for</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.idealClient}</p>
                  </div>
                </div>

                {/* Right */}
                <StaggerContainer className="space-y-8">
                  <StaggerItem>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground/40 mb-4 font-medium">What&apos;s included</p>
                      <ul className="space-y-3">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground/40 mb-4 font-medium">Deliverables</p>
                      <ul className="space-y-2">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="mt-32 border-t border-border pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="mb-2 font-display text-2xl font-semibold text-foreground md:text-3xl">Ready to start a project?</p>
            <p className="text-muted-foreground">Let&apos;s talk about what you need. No pitch decks required.</p>
          </div>
          <Link
            href="/contact"
            className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#0B0A09] transition-colors hover:bg-accent-hover active:scale-[0.98]"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
