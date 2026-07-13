"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3D } from "@/components/home/hero3d/Hero3D";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  Tagline options — pick one and set as TAGLINE:
  1. "Editing that plays like cinema."
  2. "Every frame, intentional."
  3. "Cut like it's cinema."
*/
const TAGLINE = "Editing that plays like cinema.";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      {/* Interactive 3D film scene */}
      <Hero3D />

      {/* Warm key-light glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 38%, rgba(245,166,35,0.12), transparent 72%)",
        }}
      />
      {/* Legibility scrim behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 42% at 50% 47%, rgba(11,10,9,0.70), transparent 78%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow-pulse" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Freelance Creative Editing
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="font-display font-semibold leading-[0.9] tracking-[-0.02em] text-foreground text-[clamp(3.5rem,11vw,9.5rem)]"
        >
          Voxlo
          <br />
          <span className="text-ember">Editing.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
          className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto"
        >
          {TAGLINE}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.56 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg">
            <Link href="/work">
              View Work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground/50 animate-chevron" />
      </motion.div>
    </section>
  );
}
