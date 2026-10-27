"use client";

import type { Profile } from "@/types/content";
import { RevealText } from "@/components/motion/RevealText";
import { RevealBlock } from "@/components/motion/RevealBlock";

interface TestingApproachProps {
  profile: Profile;
}

export function TestingApproach({ profile }: TestingApproachProps) {
  const { testingApproach } = profile;

  return (
    <section id="testing-approach" aria-label="Testing approach">
      {/* Full-bleed inverted band — the "one full-bleed band" layout variation */}
      <div className="band-invert" style={{ width: "100%" }}>
        <div className="container" style={{ paddingBlock: "var(--section-gap)" }}>


          {/* Large-format quote body — mask reveal on the h2 */}
          <RevealText
            delay={0.08}
            style={{
              fontFamily: "var(--font-fraunces, Georgia, serif)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: "32em",
              marginBottom: "3rem",
              fontWeight: 400,
            }}
          >
            <span>&ldquo;{testingApproach.body}&rdquo;</span>
          </RevealText>

          {/* Bug-caught callout — fades in after heading */}
          <RevealBlock delay={0.25}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "1.5rem",
                padding: "1.5rem",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "var(--radius-card)",
                maxWidth: "64ch",
              }}
            >
              <div
                style={{
                  paddingRight: "1.5rem",
                  borderRight: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <p
                  className="mono"
                  style={{
                    color: "var(--color-accent)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    margin: 0,
                    textTransform: "uppercase",
                    writingMode: "vertical-lr",
                    transform: "rotate(180deg)",
                    whiteSpace: "nowrap",
                  }}
                >
                  bug found
                </p>
              </div>
              <p
                style={{
                  fontSize: "var(--text-small)",
                  lineHeight: 1.65,
                  margin: 0,
                  opacity: 0.85,
                }}
              >
                {testingApproach.example}
              </p>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
