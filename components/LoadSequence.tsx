"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "initialising portfolio.spec.ts …",
  "✓ design-tokens … PASS",
  "✓ schema-validation … PASS",
  "✓ github-fetch … PASS",
  "✓ accessibility … PASS",
  "running 12 tests … 12 passed",
];

/**
 * One-per-session load sequence ticker.
 * Shows a fake-test-run sequence then fades out.
 * Respects prefers-reduced-motion — skips entirely if set.
 */
export function LoadSequence() {
  const [visible, setVisible] = useState(false);
  const [line, setLine] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only run once per session
    if (sessionStorage.getItem("nft-intro-played")) return;

    // Skip if user prefers reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    sessionStorage.setItem("nft-intro-played", "1");
    setVisible(true);

    let current = 0;
    const advance = () => {
      current++;
      if (current < STEPS.length) {
        setLine(current);
        setTimeout(advance, 320);
      } else {
        // Fade out
        setTimeout(() => {
          setFading(true);
          setTimeout(() => setVisible(false), 600);
        }, 800);
      }
    };

    setTimeout(advance, 300);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        background: "var(--color-card-bg)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-card)",
        padding: "0.75rem 1.25rem",
        minWidth: "280px",
        animation: fading
          ? "ticker-out 0.6s ease forwards"
          : "ticker-in 0.3s ease both",
      }}
    >
      {STEPS.slice(0, line + 1).map((s, i) => (
        <p
          key={i}
          className="mono"
          style={{
            color:
              s.startsWith("✓")
                ? "var(--color-accent)"
                : "var(--color-fg-muted)",
            margin: 0,
            lineHeight: 1.6,
            fontSize: "0.72rem",
          }}
        >
          {s}
        </p>
      ))}
    </div>
  );
}
