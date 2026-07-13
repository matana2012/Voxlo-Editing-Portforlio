import { Hero } from "@/components/home/Hero";
import { TimelineBackground } from "@/components/home/TimelineBackground";
import { Showreel } from "@/components/home/Showreel";
import { CapabilityStrip } from "@/components/home/CapabilityStrip";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <TimelineBackground />
      <Hero />
      <Showreel />
      <CapabilityStrip />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
