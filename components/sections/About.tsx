"use client";

import type { Profile } from "@/types/content";
import { RevealText } from "@/components/motion/RevealText";
import { RevealBlock } from "@/components/motion/RevealBlock";
import { StaggerList, StaggerItem } from "@/components/motion/StaggerList";

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  const { bio, quickFacts } = profile;

  return (
    <section id="about" aria-label="About" className="section">
      <div className="container">

        {/* Asymmetric grid: bio 7 cols, quick facts 5 cols */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "7fr 5fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Bio */}
          <div>
            <RevealText
              delay={0.05}
              style={{
                fontFamily: "var(--font-fraunces, Georgia, serif)",
                fontSize: "var(--text-heading)",
                lineHeight: 1,
                marginBottom: "2rem",
              }}
            >
              <span>Who I am</span>
            </RevealText>
            {bio.map((para, i) => (
              <RevealBlock key={i} delay={0.1 + i * 0.08}>
                <p
                  style={{
                    fontSize: "var(--text-body)",
                    lineHeight: 1.65,
                    color: i === 0 ? "var(--color-fg)" : "var(--color-fg-muted)",
                    marginBottom: i < bio.length - 1 ? "1.25rem" : 0,
                    maxWidth: "60ch",
                  }}
                >
                  {para}
                </p>
              </RevealBlock>
            ))}
          </div>

          {/* Quick facts — dense definition list */}
          <RevealBlock delay={0.2}>
            <div
              style={{
                paddingLeft: "2rem",
                borderLeft: "1px solid var(--color-border)",
              }}
            >
              <p className="section-num" style={{ marginBottom: "1.25rem", display: "block" }}>
                Quick facts
              </p>
              <dl style={{ margin: 0 }}>
                {[
                  { dt: "Based in", dd: quickFacts.basedIn },
                  { dt: "Focus", dd: quickFacts.focus },
                  { dt: "Learning", dd: quickFacts.currentlyLearning },
                  { dt: "Languages", dd: quickFacts.languages.join(", ") },
                ].map(({ dt, dd }) => (
                  <div
                    key={dt}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "7rem 1fr",
                      gap: "0.5rem",
                      paddingBlock: "0.75rem",
                      borderBottom: "1px solid var(--color-border)",
                      alignItems: "baseline",
                    }}
                  >
                    <dt
                      className="mono"
                      style={{
                        color: "var(--color-fg-muted)",
                        fontSize: "0.68rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {dt}
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        fontSize: "var(--text-small)",
                        color: "var(--color-fg)",
                        lineHeight: 1.4,
                      }}
                    >
                      {dd}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </RevealBlock>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-grid > div:last-child {
            padding-left: 0 !important;
            border-left: none !important;
            border-top: 1px solid var(--color-border);
            padding-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
