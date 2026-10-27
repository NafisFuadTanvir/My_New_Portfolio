import type { Metadata } from "next";
import { Fraunces, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SkipLink } from "@/components/SkipLink";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AnimatedBackground } from "@/components/AnimatedBackground";

// ─── Fonts — self-hosted via next/font ────────────────────────────────────────
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://nafisfuadtanvir.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Nafis Fuad Tanvir — Technology & Operations Professional",
    template: "%s | Nafis Fuad Tanvir",
  },
  description:
    "CSE graduate and Technology & Operations professional based in Chattogram, Bangladesh. Experienced in SQA, MIS operations, AI-powered workflows, n8n automation, and WordPress solutions. Open to Officer, Junior Officer, and Executive-level roles.",
  keywords: [
    "Nafis Fuad Tanvir",
    "SQA Engineer",
    "MIS Officer",
    "Test Automation",
    "Playwright",
    "Selenium",
    "n8n automation",
    "Bangladesh",
    "Officer",
    "Executive",
    "CSE Graduate",
  ],
  authors: [{ name: "Nafis Fuad Tanvir" }],
  robots: "index, follow",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nafis Fuad Tanvir",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@NafisFuadTanvir",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
    <head>
        {/* JSON-LD Person schema — PRD §10 SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nafis Fuad Tanvir",
              url: BASE_URL,
              jobTitle: "Technology & Operations Professional | SQA Engineer",
              worksFor: { "@type": "Organization", name: "MGH Group" },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Green University of Bangladesh",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chattogram",
                addressCountry: "BD",
              },
              sameAs: [
                "https://github.com/NafisFuadTanvir",
                "https://www.linkedin.com/in/nafis-fuad-tanvir-2a17bb232/",
              ],
              knowsAbout: [
                "Software Quality Assurance",
                "Test Automation",
                "Playwright",
                "Selenium",
                "Postman",
                "REST Assured",
                "JMeter",
              ],
            }),
          }}
        />
      </head>
      <body style={{ position: "relative" }}>
        <ThemeProvider>
          <AnimatedBackground />
          <SmoothScroll>
            <SkipLink />
            <div style={{ position: "relative", zIndex: 1 }}>
              {children}
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
