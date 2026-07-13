import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/_voxlo_/" },
  { label: "TikTok", href: "https://www.tiktok.com/@_voxlo_" },
  { label: "X", href: "https://x.com/clypz__" },
];

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Social", href: "/social" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      {/* warm floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-40"
        style={{ background: "linear-gradient(to bottom, rgba(232,98,10,0.06), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* CTA row */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 border-b border-border pb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Let&apos;s make something
            </p>
            <h2 className="font-display text-4xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-6xl">
              Ready when
              <br />
              you are.
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#0B0A09] transition-all duration-200 hover:scale-[1.03] hover:bg-accent-hover"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Brand */}
          <div className="max-w-xs space-y-4">
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Voxlo <span className="text-ember">Editing</span>
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Cinematic editing for creators who refuse to be skipped. Gaming, retention-first
              long-form, and branded work.
            </p>
            <p className="text-sm text-muted-foreground">
              <a
                href="mailto:griersonanakin@gmail.com"
                className="transition-colors hover:text-accent"
              >
                griersonanakin@gmail.com
              </a>
            </p>
          </div>

          {/* Nav */}
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
              Pages
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
              Follow
            </p>
            <ul className="space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Voxlo Editing. All rights reserved.</p>
          <p>voxloediting.com</p>
        </div>
      </div>
    </footer>
  );
}
