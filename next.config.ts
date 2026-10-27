import type { NextConfig } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://nafisfuadtanvir.com";

// ─── Security headers (PRD §10) ───────────────────────────────────────────────
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Content-Security-Policy — permissive enough for Next.js + fonts + Framer Motion
    // Tighten once the exact domains for Resend, analytics etc. are confirmed.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // needed for Next.js dev + Framer Motion
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.resend.com https://api.github.com",
      "frame-src 'none'",
      "object-src 'self'",  // allow PDF object embed
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Canonical base URL used by sitemap & OG
  env: {
    NEXT_PUBLIC_BASE_URL: baseUrl,
  },
};

export default nextConfig;
