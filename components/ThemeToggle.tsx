"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Light / dark theme toggle.
 * Uses monospace text labels (no emoji) per PRD §7.
 * Only renders client-side to avoid hydration mismatch.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Prevent layout shift — render a fixed-width placeholder
    return (
      <button
        aria-label="Toggle theme"
        className="theme-toggle"
        disabled
        style={{ opacity: 0 }}
      >
        ·
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      id="theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-toggle"
    >
      <span className="mono" aria-hidden="true">
        {isDark ? "light" : "dark"}
      </span>
    </button>
  );
}
