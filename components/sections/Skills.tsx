"use client";

import type { Profile } from "@/types/content";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerList, StaggerItem } from "@/components/motion/StaggerList";
import { RevealBlock } from "@/components/motion/RevealBlock";

interface SkillsProps {
  profile: Profile;
}

const PROFICIENCY_COLORS: Record<string, string> = {
  Daily: "var(--color-accent)",
  Comfortable: "var(--color-fg-muted)",
  Familiar: "var(--color-border)",
};

// Groups that go in the main "core" panel
const CORE_GROUPS = new Set(["Test automation", "API & performance", "Data & operations", "Practices"]);

// Groups that go in the "digital & soft skills" panel
const DIGITAL_GROUPS = new Set(["AI literacy", "Workflow & automation", "Soft skills"]);

export function Skills({ profile }: SkillsProps) {
  const { skillGroups } = profile;

  const coreGroups = skillGroups.filter((g) => CORE_GROUPS.has(g.group));
  const digitalGroups = skillGroups.filter((g) => DIGITAL_GROUPS.has(g.group));

  return (
    <section id="skills" aria-label="Skills and toolbox" className="section">
      <div className="container">
        <RevealText
          delay={0.05}
          style={{
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontSize: "var(--text-heading)",
            lineHeight: 0.95,
            marginBottom: "0.75rem",
          }}
        >
          <span>What I use</span>
        </RevealText>
        <RevealBlock delay={0.08}>
          <p style={{ color: "var(--color-fg-muted)", fontSize: "var(--text-small)", marginBottom: "3rem" }}>
            Tools, technologies and skills I work with daily.
          </p>
        </RevealBlock>

        {/* Two-column layout: Core Technical | AI & Digital + Soft Skills */}
        <div className="skills-grid">

          {/* ── Left: Core Technical Skills ── */}
          <div>
            <RevealBlock delay={0.1}>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains, monospace)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-fg-muted)",
                  marginBottom: "1.25rem",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                Core Technical
              </p>
            </RevealBlock>

            <StaggerList staggerDelay={0.06}>
              {coreGroups.map((group, gi) => (
                <StaggerItem key={group.group}>
                  <div
                    style={{
                      paddingBlock: "0.9rem",
                      borderBottom: gi < coreGroups.length - 1 ? "1px solid var(--color-border)" : "none",
                    }}
                    className="skill-row"
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-jetbrains, monospace)",
                        color: "var(--color-fg-muted)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        margin: "0 0 0.5rem",
                      }}
                    >
                      {group.group}
                    </p>
                    <div style={{ display: "flex", gap: "0.4rem 0.9rem", flexWrap: "wrap" }}>
                      {group.skills.map((skill) => (
                        <span
                          key={skill.name}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "var(--text-small)",
                            color: "var(--color-fg)",
                          }}
                        >
                          {skill.proficiency && (
                            <span
                              aria-label={skill.proficiency}
                              style={{
                                display: "inline-block",
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                background: PROFICIENCY_COLORS[skill.proficiency],
                                flexShrink: 0,
                              }}
                            />
                          )}
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>

          {/* ── Right: AI & Digital Tools + Soft Skills ── */}
          <div>
            <RevealBlock delay={0.1}>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains, monospace)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-fg-muted)",
                  marginBottom: "1.25rem",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                AI, Digital & Soft Skills
              </p>
            </RevealBlock>

            <StaggerList staggerDelay={0.06}>
              {digitalGroups.map((group, gi) => (
                <StaggerItem key={group.group}>
                  <div
                    style={{
                      paddingBlock: "0.9rem",
                      borderBottom: gi < digitalGroups.length - 1 ? "1px solid var(--color-border)" : "none",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-jetbrains, monospace)",
                        color: group.group === "Soft skills" ? "var(--color-amber)" : "var(--color-accent)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        margin: "0 0 0.5rem",
                      }}
                    >
                      {group.group}
                    </p>
                    <div style={{ display: "flex", gap: "0.4rem 0.75rem", flexWrap: "wrap" }}>
                      {group.skills.map((skill) => (
                        <span
                          key={skill.name}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "var(--text-small)",
                            color: "var(--color-fg)",
                            background: group.group === "Soft skills"
                              ? "rgba(245,166,35,0.07)"
                              : "rgba(255,90,43,0.06)",
                            border: `1px solid ${group.group === "Soft skills" ? "rgba(245,166,35,0.18)" : "rgba(255,90,43,0.15)"}`,
                            borderRadius: "var(--radius-chip)",
                            padding: "0.15em 0.55em",
                          }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </div>

        {/* Proficiency legend */}
        <RevealBlock delay={0.3}>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginTop: "2.5rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            {(["Daily", "Comfortable"] as const).map((p) => (
              <span
                key={p}
                className="mono"
                style={{
                  fontSize: "0.65rem",
                  color: "var(--color-fg-muted)",
                  letterSpacing: "0.08em",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: PROFICIENCY_COLORS[p],
                    flexShrink: 0,
                  }}
                />
                {p}
              </span>
            ))}
          </div>
        </RevealBlock>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 4rem;
        }
        @media (max-width: 767px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 3rem 0;
          }
        }
      `}</style>
    </section>
  );
}
