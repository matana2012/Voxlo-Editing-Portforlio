"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Settings, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCanvasState } from "@/lib/canvas/store";
import { STATION_BY_ID } from "@/lib/canvas/world";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const menuLinks = [...navLinks.slice(0, 3), { href: "/softwares", label: "Softwares" }, { href: "/social", label: "Social" }, navLinks[3]];

/**
 * Chrome for the board: a thin rail across the top of the viewfinder rather
 * than a bar pasted over it. On the homepage it reads out where the camera is.
 */
export function Navbar() {
  const pathname = usePathname();
  const { station } = useCanvasState();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const onBoard = pathname === "/" && station !== null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
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
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled && !onBoard ? "border-b border-line/20 bg-navy/90 backdrop-blur-md" : "border-b border-transparent"
        )}
      >
        <nav aria-label="Primary" className="flex h-14 items-center justify-between px-5 sm:px-[3vw]">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex shrink-0 items-center" aria-label="Voxlo Editing, home">
              <Image src="/voxlo-logo.png" alt="Voxlo Editing" width={640} height={132} priority className="h-[22px] w-auto sm:h-[26px]" />
            </Link>
            {onBoard && station && (
              <span aria-live="polite" className="hidden items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.16em] lg:flex">
                <span aria-hidden className="h-px w-6 bg-line/50" />
                <span className="text-gold">{STATION_BY_ID[station].index}</span>
                <span className="text-cream/70">{STATION_BY_ID[station].label}</span>
                <span className="text-line">/ 05</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <ul className="mr-4 hidden items-center gap-7 md:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={cn(
                      "font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200",
                      pathname === link.href ? "text-gold" : "text-cream/75 hover:text-cream"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="group hidden h-9 items-center gap-2 border border-gold/70 px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-navy sm:inline-flex"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/dashboard"
              className="p-2 text-cream/30 transition-colors hover:text-cream/70"
              aria-label="Admin dashboard"
            >
              <Settings className="h-4 w-4" />
            </Link>
            <button
              className="p-2 text-cream md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="world-grid fixed inset-0 z-40 flex flex-col bg-navy pt-14"
          >
            <ul className="flex flex-col px-6 py-8">
              {menuLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line/20"
                >
                  <Link href={link.href} className="flex items-baseline gap-5 py-4">
                    <span className="font-mono text-[10.5px] tracking-[0.16em] text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-4xl text-cream">{link.label}</span>
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
