"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/softwares", label: "Softwares" },
  { href: "/about", label: "About" },
  { href: "/social", label: "Social" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <VoxloLogo className="h-7 w-auto" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors duration-200",
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="text-muted-foreground/40 hover:text-muted-foreground transition-colors p-2"
              aria-label="Admin dashboard"
            >
              <Settings className="h-4 w-4" />
            </Link>
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background pt-16 flex flex-col"
          >
            <ul className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-4xl font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function VoxloLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Voxlo"
    >
      {/* v */}
      <path d="M4 10L16 38L28 10" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* o with play icon */}
      <circle cx="51" cy="24" r="14" stroke="currentColor" strokeWidth="4.5" fill="none" />
      <polygon points="47,18 47,30 60,24" fill="currentColor" />
      {/* x */}
      <path d="M74 10L94 38M94 10L74 38" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      {/* amber accent diamond between x and l */}
      <path d="M100 16L108 24L100 32L92 24Z" className="fill-accent" />
      {/* l */}
      <line x1="116" y1="8" x2="116" y2="38" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      {/* o */}
      <circle cx="148" cy="24" r="14" stroke="currentColor" strokeWidth="4.5" fill="none" />
    </svg>
  );
}
