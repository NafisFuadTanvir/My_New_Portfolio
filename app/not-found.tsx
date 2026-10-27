import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "The page you were looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        {/* Big 404 */}
        <p
          className="section-num"
          style={{ marginBottom: "1rem", color: "var(--color-accent)" }}
        >
          error 404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontSize: "var(--text-hero)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            margin: "0 0 2rem",
            color: "var(--color-fg)",
          }}
        >
          Not<br />found.
        </h1>

        <p
          style={{
            fontSize: "var(--text-body)",
            color: "var(--color-fg-muted)",
            maxWidth: "44ch",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has moved. It happens.
          Let&apos;s get you back.
        </p>

        {/* Mono hint — the "quality report" personality touch */}
        <p
          className="mono"
          style={{
            color: "var(--color-fg-muted)",
            marginBottom: "2.5rem",
            letterSpacing: "0.06em",
          }}
        >
          <span style={{ color: "var(--color-accent)" }}>✗</span> 404 — route
          not matched
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" aria-label="Go back home">
            ← go home
          </Link>
          <Link
            href="/#work"
            className="btn-secondary"
            aria-label="View projects"
          >
            view work
          </Link>
        </div>
      </div>
    </main>
  );
}
