import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilmGrain } from "@/components/ui/FilmGrain";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voxloediting.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Voxlo Editing — Freelance Creative Editing by Anakin Grierson",
    template: "%s | Voxlo Editing",
  },
  description:
    "Premium freelance video editing specializing in 3D motion, gaming, branded content, and IRL lifestyle. Editing that earns attention.",
  keywords: ["video editing", "freelance editor", "3D editing", "gaming edits", "branded content", "Anakin Grierson", "Voxlo"],
  authors: [{ name: "Anakin Grierson" }],
  creator: "Anakin Grierson",
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
    description: "Premium freelance video editing by Anakin Grierson.",
    images: [`${SITE_URL}/api/og`],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (t === 'light') document.documentElement.classList.remove('dark');
                else document.documentElement.classList.add('dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <FilmGrain />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
