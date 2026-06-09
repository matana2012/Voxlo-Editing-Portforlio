"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

const capabilities = [
  {
    label: "3D Editing",
    description: "Motion graphics, 3D renders, and VFX compositing that push the frame beyond reality.",
    href: "/services#3d",
    accent: true,
  },
  {
    label: "Gaming Edits",
    description: "High-energy highlight reels, montages, and commentary cuts built for gaming audiences.",
    href: "/services#gaming",
    accent: false,
  },
  {
    label: "IRL / Lifestyle",
    description: "Vlogs, branded content, and lifestyle videos that feel cinematic without feeling staged.",
    href: "/services#irl",
    accent: false,
  },
];

export function CapabilityStrip() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
        {capabilities.map((cap) => (
          <StaggerItem key={cap.label}>
            <Link
              href={cap.href}
              className="group flex flex-col justify-between p-10 md:p-12 bg-background hover:bg-white/[0.02] transition-colors duration-300 h-full min-h-[280px]"
            >
              <div>
                {cap.accent && (
                  <span className="inline-block text-xs uppercase tracking-widest text-accent mb-4 font-medium">
                    Signature
                  </span>
                )}
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
                  {cap.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-accent transition-colors duration-200">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
