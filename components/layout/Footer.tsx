import Link from "next/link";
import { cn } from "@/lib/utils";

const socialLinks = [
  { label: "TikTok", href: "https://tiktok.com/@voxloediting" },
  { label: "YouTube", href: "https://youtube.com/@voxloediting" },
  { label: "Instagram", href: "https://instagram.com/voxloediting" },
  { label: "X", href: "https://x.com/voxloediting" },
];

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Brand */}
          <div className="space-y-3 max-w-xs">
            <p className="font-semibold text-lg tracking-tight">Voxlo Editing</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Freelance creative editing by Anakin Grierson. 3D, gaming, branded, and lifestyle content.
            </p>
            <p className="text-sm text-muted-foreground">
              <a href="mailto:griersonanakin@gmail.com" className="hover:text-foreground transition-colors">
                griersonanakin@gmail.com
              </a>
            </p>
          </div>

          {/* Nav */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium">Pages</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium">Follow</p>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/50">
          <p>© {new Date().getFullYear()} Voxlo Editing. All rights reserved.</p>
          <p>voxloediting.com</p>
        </div>
      </div>
    </footer>
  );
}
