import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get a quote from Voxlo Editing. Tell me about your project and I'll get back to you within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-6 flex-1 flex flex-col justify-center">
        <div className="mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">Get a Quote</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Let&apos;s talk about your <span className="text-ember">project.</span>
          </h1>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
