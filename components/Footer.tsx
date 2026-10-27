"use client";

import type { Profile } from "@/types/content";

interface FooterProps {
  profile: Profile;
}

const GITHUB_REPO = "NafisFuadTanvir/nafis-portfolio";

export function Footer({ profile }: FooterProps) {
  const { name, social } = profile;

  return (
    <footer
      id="testing-note"
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingBlock: "2.5rem",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {/* Left: name + build info + CI badge */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-fraunces, Georgia, serif)",
              fontSize: "var(--text-small)",
              margin: "0 0 0.4rem",
            }}
          >
            {name}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <p
              className="mono"
              style={{
                color: "var(--color-fg-muted)",
                fontSize: "0.65rem",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              build 2026.10 &nbsp;·&nbsp; Next.js 16 &nbsp;·&nbsp; Tailwind v4
              &nbsp;·&nbsp;{" "}
              <a
                href={`https://github.com/${GITHUB_REPO}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-draw"
                style={{ color: "inherit" }}
              >
                How this site is tested
              </a>{" "}
              &nbsp;·&nbsp; Playwright E2E · axe-core · Lighthouse CI
            </p>

            {/* GitHub Actions CI badge */}
            <a
              href={`https://github.com/${GITHUB_REPO}/actions/workflows/ci.yml`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CI status"
              style={{ flexShrink: 0, lineHeight: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github.com/${GITHUB_REPO}/actions/workflows/ci.yml/badge.svg`}
                alt="CI status"
                height="20"
                width="auto"
                style={{ display: "block", height: "20px", width: "auto" }}
              />
            </a>
          </div>
        </div>

        {/* Right: social links */}
        <nav aria-label="Social links">
          <ul
            style={{
              display: "flex",
              gap: "1.25rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {social.github && (
              <li>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-draw mono"
                  style={{
                    color: "var(--color-fg-muted)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.08em",
                  }}
                  aria-label="GitHub"
                >
                  github
                </a>
              </li>
            )}
            {social.linkedin && (
              <li>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-draw mono"
                  style={{
                    color: "var(--color-fg-muted)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.08em",
                  }}
                  aria-label="LinkedIn"
                >
                  linkedin
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
