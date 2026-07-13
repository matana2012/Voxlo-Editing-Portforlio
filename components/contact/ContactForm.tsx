"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EASE = [0.16, 1, 0.3, 1] as const;

type FormData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

const projectOptions = ["YouTube long-form", "Shorts / Reels", "Gaming", "3D / Motion", "Podcast", "Branded", "Other"];
const budgetOptions = ["< $200", "$200 – $500", "$500 – $1k", "$1k – $2k", "$2k+", "Not sure yet"];
const timelineOptions = ["ASAP", "This week", "2 – 4 weeks", "Flexible"];

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const TOTAL_STEPS = 6;

  function advance() {
    setDirection(1);
    setStep((s) => s + 1);
  }

  function back() {
    if (step === 0) return;
    setDirection(-1);
    setStep((s) => s - 1);
  }

  function canAdvance() {
    if (step === 0) return formData.name.trim().length > 0;
    if (step === 1) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (step === 2) return formData.projectType.length > 0;
    if (step === 3) return formData.budget.length > 0;
    if (step === 4) return formData.timeline.length > 0;
    return true;
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey && canAdvance() && step < TOTAL_STEPS) {
      e.preventDefault();
      advance();
    }
  }

  async function handleSubmit() {
    if (!canSubmit()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Try emailing directly at griersonanakin@gmail.com");
    } finally {
      setSubmitting(false);
    }
  }

  function canSubmit() {
    return (
      formData.name.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.projectType.length > 0
    );
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Got it.
        </h2>
        <p className="text-lg text-muted-foreground max-w-sm">
          I&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-16 h-px bg-border overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>

      {/* Step counter */}
      <p className="text-xs uppercase tracking-widest text-muted-foreground/40 mb-8">
        {step + 1} / {TOTAL_STEPS + 1}
      </p>

      {/* Question area */}
      <div className="min-h-[280px] flex flex-col justify-between">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: EASE }}
          >
            {step === 0 && (
              <div className="space-y-6">
                <label className="block text-2xl md:text-3xl font-bold text-foreground">
                  What&apos;s your name?
                </label>
                <Input
                  ref={inputRef}
                  autoFocus
                  placeholder="Anakin Skywalker"
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  onKeyDown={handleKey}
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <label className="block text-2xl md:text-3xl font-bold text-foreground">
                  What&apos;s your email?
                </label>
                <Input
                  ref={inputRef}
                  autoFocus
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  onKeyDown={handleKey}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <label className="block text-2xl md:text-3xl font-bold text-foreground">
                  What kind of project?
                </label>
                <div className="flex flex-wrap gap-3">
                  {projectOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setFormData((d) => ({ ...d, projectType: opt })); }}
                      className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                        formData.projectType === opt
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted-foreground hover:border-white/30 hover:text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <label className="block text-2xl md:text-3xl font-bold text-foreground">
                  What&apos;s your budget range?
                </label>
                <div className="flex flex-wrap gap-3">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFormData((d) => ({ ...d, budget: opt }))}
                      className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                        formData.budget === opt
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted-foreground hover:border-white/30 hover:text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <label className="block text-2xl md:text-3xl font-bold text-foreground">
                  When do you need it done?
                </label>
                <div className="flex flex-wrap gap-3">
                  {timelineOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFormData((d) => ({ ...d, timeline: opt }))}
                      className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                        formData.timeline === opt
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted-foreground hover:border-white/30 hover:text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <label className="block text-2xl md:text-3xl font-bold text-foreground">
                  Tell me a bit more.
                  <span className="ml-3 text-base font-normal text-muted-foreground/50">(optional)</span>
                </label>
                <Textarea
                  ref={textareaRef}
                  autoFocus
                  placeholder="Any context about the project, platform, audience, or style references..."
                  value={formData.message}
                  onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                />
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Almost there.
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="text-foreground font-medium">Name:</span> {formData.name}</p>
                  <p><span className="text-foreground font-medium">Email:</span> {formData.email}</p>
                  <p><span className="text-foreground font-medium">Project:</span> {formData.projectType}</p>
                  <p><span className="text-foreground font-medium">Budget:</span> {formData.budget}</p>
                  <p><span className="text-foreground font-medium">Timeline:</span> {formData.timeline}</p>
                  {formData.message && <p><span className="text-foreground font-medium">Notes:</span> {formData.message}</p>}
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12">
        <button
          onClick={back}
          className={`flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ${step === 0 ? "invisible" : ""}`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {step < 5 && (
          <button
            onClick={advance}
            disabled={!canAdvance()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              canAdvance()
                ? "bg-accent text-[#0B0A09] hover:bg-accent-hover active:scale-[0.98]"
                : "bg-white/5 text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            OK
            <ArrowRight className="h-4 w-4" />
          </button>
        )}

        {step === 5 && (
          <button
            onClick={advance}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-accent text-[#0B0A09] hover:bg-accent-hover active:scale-[0.98] transition-all duration-200"
          >
            Review
            <ArrowRight className="h-4 w-4" />
          </button>
        )}

        {step === 6 && (
          <button
            onClick={handleSubmit}
            disabled={submitting || !canSubmit()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-accent text-[#0B0A09] hover:bg-accent-hover active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Enter hint */}
      {step < 2 && (
        <p className="mt-4 text-xs text-muted-foreground/30 text-right">
          Press Enter ↵ to continue
        </p>
      )}
    </div>
  );
}
