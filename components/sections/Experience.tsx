"use client";

import type { Profile } from "@/types/content";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { RevealText } from "@/components/motion/RevealText";
import { RevealBlock } from "@/components/motion/RevealBlock";

interface ExperienceProps {
  profile: Profile;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const [year, month] = dateStr.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  if (month) {
    return `${months[parseInt(month, 10) - 1]} ${year}`;
  }
  return year;
}

const TYPE_LABEL: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  internship: "Internship",
  contract: "Contract",
  freelance: "Freelance",
};

/** Animated vertical timeline line that draws down on scroll entry */
function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "0px 0px -100px 0px" });
  const shouldReduce = useReducedMotion();

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: 0,
        top: "0.6rem",
        bottom: 0,
        width: "1px",
        background: "var(--color-border)",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          background: "var(--color-border)",
        }}
        initial={{ height: shouldReduce ? "100%" : "0%" }}
        animate={{ height: inView ? "100%" : shouldReduce ? "100%" : "0%" }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
      />
    </div>
  );
}

export function Experience({ profile }: ExperienceProps) {
  const { experience } = profile;

  return (
    <section id="experience" aria-label="Experience" className="section">
      <div className="container">

        <RevealText
          delay={0.05}
          style={{
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontSize: "var(--text-heading)",
            lineHeight: 0.95,
            marginBottom: "3rem",
          }}
        >
          <span>Where I&apos;ve worked</span>
        </RevealText>

        {/* Timeline */}
        <div className="timeline" style={{ position: "relative", paddingLeft: "1.5rem" }}>
          {/* Animated line */}
          <TimelineLine />

          {experience.map((job, idx) => (
            <RevealBlock key={job.id} delay={idx * 0.1} className="timeline-item">
              {/* Header row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "0.25rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-fraunces, Georgia, serif)",
                      fontSize: "var(--text-subheading)",
                      margin: "0 0 0.15rem",
                      lineHeight: 1.1,
                    }}
                  >
                    {job.role}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--text-small)",
                      color: "var(--color-fg-muted)",
                      margin: 0,
                    }}
                  >
                    {job.company}
                    {job.location && ` · ${job.location}`}
                  </p>
                </div>

                {/* Date + type badge */}
                <div style={{ textAlign: "right" }}>
                  <p
                    className="mono"
                    style={{
                      color: "var(--color-fg-muted)",
                      fontSize: "0.68rem",
                      margin: "0 0 0.2rem",
                    }}
                  >
                    {formatDate(job.startDate)} — {formatDate(job.endDate)}
                  </p>
                  <span className="chip">{TYPE_LABEL[job.type] ?? job.type}</span>
                </div>
              </div>

              {/* Bullets */}
              <ul
                style={{
                  margin: "1rem 0 0",
                  paddingLeft: "1.2rem",
                  listStyleType: "none",
                }}
              >
                {job.bullets.map((bullet, bi) => (
                  <li
                    key={bi}
                    style={{
                      position: "relative",
                      fontSize: "var(--text-small)",
                      color: "var(--color-fg-muted)",
                      lineHeight: 1.55,
                      marginBottom: bi < job.bullets.length - 1 ? "0.5rem" : 0,
                      paddingLeft: "0.75rem",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.55em",
                        display: "inline-block",
                        width: "4px",
                        height: "1px",
                        background: "var(--color-accent)",
                      }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
