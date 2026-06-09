import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "About",
  description: "Anakin Grierson — freelance video editor behind Voxlo Editing.",
};

const values = [
  {
    label: "Craft over speed",
    description: "Every project gets the time it needs to be genuinely good. Not done-fast. Done-right.",
  },
  {
    label: "Edit with intent",
    description: "Every cut, every transition, every hold has a reason. If it doesn't add meaning, it doesn't make the final cut.",
  },
  {
    label: "Think like the audience",
    description: "I edit for whoever's watching, not whoever's paying. If it doesn't hold their attention, it needs to change.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4 font-medium">About</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[0.95]">
            Anakin
            <br />
            Grierson.
          </h1>
        </AnimatedSection>

        {/* Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <AnimatedSection>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a freelance video editor with a focus on content that moves people — literally and figuratively.
                Voxlo is the name I work under. The work ranges from 3D motion integration and gaming edits to
                cinematic branded content and podcast polish.
              </p>
              <p>
                I got into editing because I was obsessed with the gap between raw footage and a finished piece.
                That gap is where the real work happens. Anyone can cut clips together. Making those cuts feel
                inevitable — like the video couldn&apos;t have been any other way — that&apos;s the goal every time.
              </p>
              <p>
                I work with a small number of clients at a time. That&apos;s intentional. Each project gets real
                attention, not a template and an export.
              </p>
            </div>
          </AnimatedSection>

          {/* Values */}
          <AnimatedSection delay={0.1}>
            <p className="text-xs uppercase tracking-widest text-muted-foreground/40 mb-8 font-medium">How I work</p>
            <StaggerContainer className="space-y-6">
              {values.map((v) => (
                <StaggerItem key={v.label}>
                  <div className="border-l-2 border-accent pl-5">
                    <p className="font-semibold text-foreground mb-1">{v.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>
        </div>

        {/* CTA */}
        <AnimatedSection className="border-t border-border pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-2xl font-bold text-foreground mb-2">Want to work together?</p>
            <p className="text-muted-foreground">Tell me what you&apos;re building. I&apos;ll tell you if I can help.</p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors group active:scale-[0.98]"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
