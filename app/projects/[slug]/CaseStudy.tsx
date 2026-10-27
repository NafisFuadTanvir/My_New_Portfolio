"use client";

import type { Project } from "@/types/content";
import Link from "next/link";

interface CaseStudyProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

const STATUS_LABEL: Record<string, string> = {
  active: "active",
  maintained: "maintained",
  wip: "in progress",
  archived: "archived",
};

function SectionBlock({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingTop: "3rem",
        paddingBottom: "3rem",
        display: "grid",
        gridTemplateColumns: "clamp(5rem, 12vw, 10rem) 1fr",
        gap: "clamp(1.5rem, 4vw, 4rem)",
        alignItems: "start",
      }}
      className="case-study-block"
    >
      <div>
        <p
          className="section-num"
          style={{ marginBottom: "0.25rem", color: "var(--color-accent)" }}
        >
          {num}
        </p>
        <p
          className="mono"
          style={{
            color: "var(--color-fg-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function CaseStudy({ project, prev, next }: CaseStudyProps) {
  const {
    title,
    outcome,
    role,
    stack,
    status,
    problem,
    approach,
    keyFeatures,
    testingStrategy,
    improvements,
    githubSlug,
    liveUrl,
  } = project;

  const githubUrl = githubSlug
    ? `https://github.com/NafisFuadTanvir/${githubSlug}`
    : null;

  return (
    <>
      {/* ── Hero band ────────────────────────────────────────────────────── */}
      <section
        aria-label={`${title} case study`}
        id="case-study-hero"
        style={{
          borderBottom: "1px solid var(--color-border)",
          paddingTop: "8rem",
          paddingBottom: "4rem",
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <Link
            href="/#work"
            className="underline-draw mono"
            style={{
              color: "var(--color-fg-muted)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "3rem",
              textDecoration: "none",
            }}
            aria-label="Back to all projects"
          >
            ← back to work
          </Link>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <span
              className="mono"
              style={{
                color: "var(--color-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <span
                className={`status-dot status-${status}`}
                aria-hidden="true"
              />
              {STATUS_LABEL[status] ?? status}
            </span>
            <span className="mono" style={{ color: "var(--color-border)" }}>
              ·
            </span>
            <span
              className="mono"
              style={{ color: "var(--color-fg-muted)", textTransform: "uppercase" }}
            >
              {role}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-fraunces, Georgia, serif)",
              fontSize: "var(--text-display)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
              maxWidth: "18ch",
            }}
          >
            {title}
          </h1>

          {/* Outcome / one-liner */}
          <p
            style={{
              fontSize: "var(--text-subheading)",
              color: "var(--color-fg-muted)",
              maxWidth: "56ch",
              lineHeight: 1.45,
              marginBottom: "2rem",
            }}
          >
            {outcome}
          </p>

          {/* Stack chips */}
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            {stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>

          {/* External links */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label={`View ${title} repository on GitHub`}
              >
                ↗ GitHub repo
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label={`View ${title} live demo`}
              >
                ↗ Live demo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Body sections ────────────────────────────────────────────────── */}
      <article className="container" aria-label="Case study body">
        {/* 01 — Problem */}
        {problem && (
          <SectionBlock num="01" label="problem">
            <p
              style={{
                fontSize: "var(--text-subheading)",
                lineHeight: 1.5,
                color: "var(--color-fg)",
              }}
            >
              {problem}
            </p>
          </SectionBlock>
        )}

        {/* 02 — Approach */}
        {approach && (
          <SectionBlock num="02" label="approach">
            <p
              style={{
                fontSize: "var(--text-body)",
                lineHeight: 1.65,
                color: "var(--color-fg)",
              }}
            >
              {approach}
            </p>
          </SectionBlock>
        )}

        {/* 03 — Key features */}
        {keyFeatures && keyFeatures.length > 0 && (
          <SectionBlock num="03" label="key features">
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {keyFeatures.map((f, i) => (
                <li
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.5rem 1fr",
                    gap: "0.75rem",
                    alignItems: "start",
                    borderBottom: "1px solid var(--color-border)",
                    paddingBottom: "1rem",
                  }}
                >
                  <span
                    className="mono"
                    style={{ color: "var(--color-accent)", paddingTop: "0.15rem" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>
          </SectionBlock>
        )}

        {/* 04 — Testing strategy */}
        {testingStrategy && (
          <SectionBlock num="04" label="testing strategy">
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Test types + tools */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                }}
                className="testing-grid"
              >
                <div>
                  <p
                    className="mono"
                    style={{
                      color: "var(--color-fg-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Test types
                  </p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {testingStrategy.types.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p
                    className="mono"
                    style={{
                      color: "var(--color-fg-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Tools
                  </p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {testingStrategy.tools.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coverage note */}
              {testingStrategy.coverageNote && (
                <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.6 }}>
                  {testingStrategy.coverageNote}
                </p>
              )}

              {/* Bug found callout — the SQA differentiator */}
              {testingStrategy.bugsFound && (
                <div
                  id="bug-callout"
                  style={{
                    borderLeft: "3px solid var(--color-accent)",
                    paddingLeft: "1.5rem",
                    paddingBlock: "0.5rem",
                  }}
                >
                  <p
                    className="mono"
                    style={{
                      color: "var(--color-accent)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    bug found
                  </p>
                  <p style={{ lineHeight: 1.6, color: "var(--color-fg)" }}>
                    {testingStrategy.bugsFound}
                  </p>
                </div>
              )}
            </div>
          </SectionBlock>
        )}

        {/* 05 — Improvements */}
        {improvements && (
          <SectionBlock num="05" label="what I'd improve">
            <p style={{ lineHeight: 1.65, color: "var(--color-fg-muted)" }}>
              {improvements}
            </p>
          </SectionBlock>
        )}
      </article>

      {/* ── Prev / Next navigation ───────────────────────────────────────── */}
      <nav
        aria-label="Project navigation"
        style={{
          borderTop: "1px solid var(--color-border)",
          marginTop: "2rem",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: prev ? (next ? "1fr 1fr" : "1fr") : "1fr",
            paddingBlock: "3rem",
          }}
        >
          {prev && (
            <Link
              href={`/projects/${prev.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
              aria-label={`Previous project: ${prev.title}`}
            >
              <span
                className="mono"
                style={{
                  color: "var(--color-fg-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                ← prev
              </span>
              <span
                style={{
                  fontFamily: "var(--font-fraunces, serif)",
                  fontSize: "var(--text-subheading)",
                }}
              >
                {prev.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                alignItems: prev ? "flex-end" : "flex-start",
                borderLeft: prev ? "1px solid var(--color-border)" : "none",
                paddingLeft: prev ? "2rem" : "0",
              }}
              aria-label={`Next project: ${next.title}`}
            >
              <span
                className="mono"
                style={{
                  color: "var(--color-fg-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                next →
              </span>
              <span
                style={{
                  fontFamily: "var(--font-fraunces, serif)",
                  fontSize: "var(--text-subheading)",
                }}
              >
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>

      <style>{`
        @media (max-width: 640px) {
          .case-study-block {
            grid-template-columns: 1fr !important;
          }
          .testing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
