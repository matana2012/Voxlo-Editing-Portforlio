import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/_voxlo_/" },
  { label: "TikTok", href: "https://www.tiktok.com/@_voxlo_" },
  { label: "X", href: "https://x.com/clypz__" },
];

const pageLinks = [
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Services", href: "/services" },
  { label: "Softwares", href: "/softwares" },
  { label: "About", href: "/about" },
  { label: "Social", href: "/social" },
  { label: "Contact", href: "/contact" },
];

const label = "font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground";

/** Footer as a drawing's title block: a ruled grid of facts, nothing shouting. */
export function Footer() {
  return (
    <footer className="border-t border-line/25 bg-navy">
      <div className="grid grid-cols-1 border-b border-line/20 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="border-line/20 px-6 py-10 sm:px-[3vw] lg:border-r">
          <Image src="/voxlo-logo.png" alt="Voxlo Editing" width={640} height={132} className="h-8 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Cuts that keep people watching — gaming, 3D &amp; motion, IRL and branded work.
          </p>
        </div>
        <div className="border-t border-line/20 px-6 py-10 sm:border-l sm:border-t-0 sm:px-[3vw] lg:border-l-0 lg:border-r">
          <p className={label}>Pages</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {pageLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-cream/80 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-line/20 px-6 py-10 sm:px-[3vw] lg:border-r lg:border-t-0">
          <p className={label}>Follow</p>
          <ul className="mt-4 space-y-2">
            {socialLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-cream/80 transition-colors hover:text-gold">
                  {l.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-line/20 px-6 py-10 sm:border-l sm:px-[3vw] lg:border-l-0 lg:border-t-0">
          <p className={label}>Contact</p>
          <a href="mailto:griersonanakin@gmail.com" className="mt-4 block break-all text-sm text-cream/80 transition-colors hover:text-gold">
            griersonanakin@gmail.com
          </a>
          <Link href="/contact" className="mt-3 inline-block text-sm text-gold underline-offset-4 hover:underline">
            Start a project
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 px-6 py-5 sm:flex-row sm:px-[3vw]">
        <p className={label}>© {new Date().getFullYear()} Voxlo Editing</p>
        <p className={label}>Drawn by Anakin Matthew · voxlo.org</p>
      </div>
    </footer>
  );
}
