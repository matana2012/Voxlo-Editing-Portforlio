import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Newsreader, Schibsted_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Editorial serif for display, a precise grotesk for reading, a plex mono for
// everything that measures or annotates. Three registers, three jobs.
const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});
const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voxlo.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Voxlo Editing — Freelance Creative Editing by Anakin Matthew",
    template: "%s | Voxlo Editing",
  },
  description:
    "Premium freelance video editing specializing in 3D motion, gaming, branded content, and IRL lifestyle. Editing that earns attention.",
  keywords: ["video editing", "freelance editor", "3D editing", "gaming edits", "branded content", "Anakin Matthew", "Voxlo"],
  authors: [{ name: "Anakin Matthew" }],
  creator: "Anakin Matthew",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Voxlo Editing",
    title: "Voxlo Editing — Freelance Creative Editing",
    description: "Premium freelance video editing. 3D motion, gaming, branded content, lifestyle.",
    images: [
      {
        url: `${SITE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: "Voxlo Editing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voxlo Editing",
    description: "Premium freelance video editing by Anakin Matthew.",
    images: [`${SITE_URL}/api/og`],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Reduced-motion visitors can opt into the spatial board; apply it before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('voxlo-motion')==='on')document.documentElement.classList.add('force-motion')}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-16 bg-accent px-4 py-2 text-sm font-semibold text-background transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
