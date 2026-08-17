import { TimelineBackground } from "@/components/home/TimelineBackground";
import { Hero } from "@/components/home/Hero";
import { PortfolioReveal } from "@/components/home/PortfolioReveal";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { ProcessScrubber } from "@/components/home/ProcessScrubber";
import { About } from "@/components/home/About";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactStrip } from "@/components/home/ContactStrip";

export default function HomePage() {
  return (
    <TimelineBackground>
      <Hero />
      <PortfolioReveal />
      <BeforeAfter />
      <ProcessScrubber />
      <About />
      <TestimonialsSection />
      <ContactStrip />
    </TimelineBackground>
  );
}
