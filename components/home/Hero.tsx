"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3D } from "@/components/home/hero3d/Hero3D";

const EASE = [0.16, 1, 0.3, 1] as const;

const TAGLINE = "Every frame, intentional.";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden">
      {/* Interactive 3D film scene (static fallback on mobile / reduced-motion) */}
      <Hero3D />

      {/* Warm key-light glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(55% 50% at 50% 38%, rgba(245,166,35,0.12), transparent 72%)",
        }}
      />
      {/* Legibility vignette behind the headline column — gives the text weight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(42% 46% at 50% 52%, rgba(11,10,9,0.62), transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(26% 60% at 50% 50%, rgba(11,10,9,0.5), transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-accent" />
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Freelance Creative Editing
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          style={{ textShadow: "0 4px 45px rgba(11,10,9,0.7)" }}
          className="font-display text-[clamp(3.5rem,11vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.02em] text-foreground"
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
          className="mx-auto mt-8 max-w-xl text-xl text-muted-foreground md:text-2xl"
          style={{ textShadow: "0 2px 20px rgba(11,10,9,0.7)" }}
        >
          {TAGLINE}
        </motion.p>

        {/* Audience filter */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          className="mt-4 text-xs font-medium uppercase tracking-[0.25em] text-accent"
        >
          Built for creators from 1K to 10K subs
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          className="mt-12 flex flex-col justify-center gap-4 sm:flex-row"
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
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-chevron text-muted-foreground/50" />
      </motion.div>
    </section>
  );
}
