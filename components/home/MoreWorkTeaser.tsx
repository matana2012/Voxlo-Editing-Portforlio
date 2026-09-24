"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Annotation } from "@/components/ui/Annotation";
import { featuredPieces, morePieces } from "@/lib/data/portfolioPieces";
import { HOMEPAGE_ORDER } from "./PortfolioReveal";

const totalPieces = featuredPieces.length + morePieces.length;

export function MoreWorkTeaser() {
  return (
    <section className="border-t border-border px-6 py-20">
      <AnimatedSection className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
        <Annotation variant="index">MORE ON RECORD</Annotation>
        <p className="text-lg text-muted-foreground">
          That&apos;s {HOMEPAGE_ORDER.length} of {totalPieces} pieces — the rest is in the archive.
        </p>
        <Link
          href="/work"
          className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-signal transition-colors hover:text-signal-hover"
        >
          See the full archive
          <ArrowRight className="h-4 w-4" />
        </Link>
      </AnimatedSection>
    </section>
  );
}
