import { Hero } from "@/components/home/Hero";
import { CapabilityStrip } from "@/components/home/CapabilityStrip";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <ProcessSection />
      <TestimonialsSection />
    </>
  );
}
