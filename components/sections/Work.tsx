"use client";

import type { Project } from "@/types/content";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RevealText } from "@/components/motion/RevealText";
import { RevealBlock } from "@/components/motion/RevealBlock";

interface WorkProps {
  projects: Project[];
}

const STATUS_LABEL: Record<string, string> = {
  active: "active",
  maintained: "maintained",
  wip: "in progress",
  archived: "archived",
};

/** Cursor-follow "View →" label — desktop only, pointer devices only */
function CursorLabel({ visible, pos }: { visible: boolean; pos: { x: number; y: number } }) {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted || shouldReduce) return null;

  return (
    <motion.span
      aria-hidden="true"
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.8,
        x: pos.x + 16,
        y: pos.y - 16,
      }}
      transition={{ type: "spring", stiffness: 600, damping: 40 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 50,
        background: "var(--color-fg)",
        color: "var(--color-bg)",
        fontFamily: "var(--font-jetbrains, monospace)",
        fontSize: "0.68rem",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "0.35em 0.75em",
        borderRadius: "var(--radius-btn)",
        whiteSpace: "nowrap",
      }}
    >
      View →
    </motion.span>
  );
}

function WorkRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const rowRef = useRef<HTMLLIElement>(null);
  const isPointer =
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  const onMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      {isPointer && (
        <CursorLabel visible={hovered} pos={cursorPos} />
      )}
      <li
        ref={rowRef}
        style={{ borderTop: "1px solid var(--color-border)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={onMouseMove}
      >
        <Link
          href={`/projects/${project.slug}`}
          style={{ textDecoration: "none", color: "inherit", display: "block" }}
          aria-label={`View case study: ${project.title}`}
        >
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "2.5rem 1fr auto",
              gap: "1.5rem",
              padding: "1.75rem 0",
              alignItems: "start",
            }}
            animate={{ opacity: hovered ? 0.7 : 1 }}
            transition={{ duration: 0.15 }}
            className="work-row"
          >
            {/* Index */}
            <span
              className="mono"
              style={{
                color: "var(--color-fg-muted)",
                paddingTop: "0.2rem",
                fontSize: "var(--text-mono)",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Content */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginBottom: "0.4rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces, Georgia, serif)",
                    fontSize: "var(--text-subheading)",
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {project.title}
                </h3>
                <span className="mono" style={{ color: "var(--color-fg-muted)", fontSize: "0.68rem" }}>
                  <span className={`status-dot status-${project.status}`} aria-hidden="true" />
                  {STATUS_LABEL[project.status] ?? project.status}
                </span>
              </div>

              <p
                style={{
                  fontSize: "var(--text-small)",
                  color: "var(--color-fg-muted)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.45,
                  maxWidth: "64ch",
                }}
              >
                {project.outcome}
              </p>

              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {project.stack.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>

            {/* Arrow — dims on hover since cursor label takes over */}
            <motion.span
              className="hidden-mobile"
              animate={{ opacity: hovered ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              style={{
                fontFamily: "var(--font-fraunces, Georgia, serif)",
                fontSize: "1.5rem",
                color: "var(--color-fg-muted)",
                paddingTop: "0.1rem",
              }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.div>
        </Link>
      </li>
    </>
  );
}

export function Work({ projects }: WorkProps) {
  return (
    <section id="work" aria-label="Selected work" className="section">
      <div className="container">
        {/* Section header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "flex-end",
            marginBottom: "3rem",
            gap: "1rem",
          }}
        >
          <div>

            <RevealText
              delay={0.1}
              style={{
                fontFamily: "var(--font-fraunces, Georgia, serif)",
                fontSize: "var(--text-display)",
                lineHeight: 0.95,
              }}
            >
              <span>Projects</span>
            </RevealText>
          </div>
          <RevealBlock delay={0.15}>
            <p className="mono hidden-mobile" style={{ color: "var(--color-fg-muted)", paddingBottom: "0.2rem" }}>
              {projects.length} featured
            </p>
          </RevealBlock>
        </div>

        {/* Project rows */}
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {projects.map((project, i) => (
            <WorkRow key={project.slug} project={project} index={i} />
          ))}
        </ol>

        <div style={{ borderTop: "1px solid var(--color-border)" }} />
      </div>
    </section>
  );
}
