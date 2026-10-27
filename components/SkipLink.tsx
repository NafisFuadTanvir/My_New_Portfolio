"use client";

/**
 * Accessible skip-to-content link.
 * Visually hidden until focused — satisfies WCAG 2.4.1.
 */
export function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}
