import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        navy: { DEFAULT: "rgb(var(--navy) / <alpha-value>)", deep: "rgb(var(--navy-deep) / <alpha-value>)" },
        gold: "rgb(var(--gold) / <alpha-value>)",
        cream: "rgb(var(--cream) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        // RGB-channel tokens so Tailwind opacity modifiers (bg-accent/10 etc.) work.
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        border: "var(--border)",
        // Two-surface-anchor lift tiers (canvas -> surface-1 -> surface-2), never opacity tricks.
        surface: {
          1: "rgb(var(--surface-1) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
        },
        // Technical-blue hairline grid. Decorative structural wallpaper only — never interactive.
        grid: "rgb(var(--grid) / <alpha-value>)",
        // Gold — the one brand accent: primary CTAs and brand moments only.
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
          strong: "rgb(var(--accent-strong) / <alpha-value>)",
          soft: "var(--accent-soft)",
        },
        // Royal blue — the one interactive-signal accent: links, hover, focus. Never decorative.
        signal: {
          DEFAULT: "rgb(var(--signal) / <alpha-value>)",
          hover: "rgb(var(--signal-hover) / <alpha-value>)",
          soft: "var(--signal-soft)",
        },
      },
      screens: {
        xs: "375px",
      },
      // Drafted, not bubbly: corners are barely softened everywhere except true circles.
      borderRadius: {
        sm: "1px",
        DEFAULT: "2px",
        md: "2px",
        lg: "2px",
        xl: "3px",
        "2xl": "3px",
        "3xl": "4px",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        chevron: "chevronBounce 2s ease-in-out infinite",
        grain: "grain 0.6s steps(2) infinite",
        "glow-pulse": "glowPulse 5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        chevronBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-3%, 2%)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
