import { Hero } from "@/components/home/Hero";
import { Showreel } from "@/components/home/Showreel";
import { CapabilityStrip } from "@/components/home/CapabilityStrip";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Showreel />
      <CapabilityStrip />
      <ProcessSection />
      <TestimonialsSection />
    </>
  );
}
