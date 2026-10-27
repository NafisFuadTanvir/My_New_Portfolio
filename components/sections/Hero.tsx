"use client";

import type { Profile } from "@/types/content";
import { LoadSequence } from "@/components/LoadSequence";
import { motion, useReducedMotion } from "framer-motion";
import { useMagnet } from "@/components/motion/useMagnet";
import Image from "next/image";

interface HeroProps {
  profile: Profile;
}

function MagneticLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnet(0.3);
  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      className={className}
      aria-label={ariaLabel}
      onMouseMove={onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}

export function Hero({ profile }: HeroProps) {
  const { name, tagline, valueStatement, location, availability, social } = profile;
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");
  const shouldReduce = useReducedMotion();

  const maskVariant = (delay: number) => ({
    hidden: { y: "105%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay },
    },
  });

  const fadeVariant = (delay: number) => ({
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number], delay },
    },
  });

  const initial = shouldReduce ? "visible" : "hidden";
  const animate = "visible";

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderBottom: "1px solid var(--color-border)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "5rem", /* clear the sticky nav */
      }}
    >
      {/* Accent glow behind the name */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "55%",
          height: "70%",
          background: "radial-gradient(ellipse at top right, rgba(255,90,43,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main area */}
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "center",
          paddingTop: "2rem",
          paddingBottom: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: label + name */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <motion.p
            className="mono"
            style={{ marginBottom: "2rem", color: "var(--color-fg-muted)", fontSize: "0.68rem", letterSpacing: "0.1em" }}
            variants={fadeVariant(0.2)}
            initial={initial}
            animate={animate}
          >
            CSE Graduate &nbsp;·&nbsp; Chattogram, Bangladesh
          </motion.p>

          <h1
            aria-label={name}
            style={{
              fontFamily: "var(--font-fraunces, Georgia, serif)",
              fontSize: "var(--text-hero)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "var(--color-fg)",
              margin: 0,
            }}
          >
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span
                style={{ display: "block" }}
                variants={maskVariant(0.05)}
                initial={initial}
                animate={animate}
              >
                {firstName}
              </motion.span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span
                style={{ display: "block" }}
                variants={maskVariant(0.18)}
                initial={initial}
                animate={animate}
              >
                {lastName}
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Right: Profile photo */}
        <motion.div
          className="hidden-mobile"
          style={{
            alignSelf: "flex-end",
            position: "relative",
          }}
          variants={fadeVariant(0.35)}
          initial={initial}
          animate={animate}
        >
          <div
            style={{
              width: "clamp(160px, 18vw, 280px)",
              height: "clamp(160px, 18vw, 280px)",
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid var(--color-border-hi)",
              position: "relative",
              boxShadow: "0 0 0 1px var(--color-border), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,90,43,0.06)",
            }}
          >
            <Image
              src="/nafis-photo.jpg"
              alt="Nafis Fuad Tanvir"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
              sizes="(max-width: 768px) 0px, 280px"
            />
          </div>
          {/* Accent corner decoration */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: -8,
              right: -8,
              width: 40,
              height: 40,
              border: "2px solid var(--color-accent)",
              borderRadius: "2px",
              opacity: 0.4,
            }}
          />
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
        className="container"
        style={{
          borderTop: "1px solid var(--color-border)",
          paddingBlock: "1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: tagline + value + CTAs */}
        <motion.div
          variants={fadeVariant(0.45)}
          initial={initial}
          animate={animate}
        >
          <p
            className="mono"
            style={{
              color: "var(--color-accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            {tagline}
          </p>
          <p
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-fg-muted)",
              maxWidth: "52ch",
              lineHeight: 1.55,
              marginBottom: "1.5rem",
            }}
          >
            {valueStatement}
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <MagneticLink href="#work" className="btn-primary" aria-label="View my work">
              View work ↓
            </MagneticLink>
            <MagneticLink href="/resume" className="btn-secondary" aria-label="Download CV">
              Download CV
            </MagneticLink>
          </div>
        </motion.div>

        {/* Right: location + social */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-end" }}
          className="hidden-mobile"
          variants={fadeVariant(0.6)}
          initial={initial}
          animate={animate}
        >
          <p className="mono" style={{ color: "var(--color-fg-muted)" }}>{location}</p>
          <p className="mono" style={{ color: "var(--color-accent)", textAlign: "right", maxWidth: "24ch" }}>
            {availability}
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            {social.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer"
                className="underline-draw mono"
                style={{ color: "var(--color-fg-muted)", fontSize: "0.72rem", letterSpacing: "0.08em" }}
                aria-label="GitHub profile">github</a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                className="underline-draw mono"
                style={{ color: "var(--color-fg-muted)", fontSize: "0.72rem", letterSpacing: "0.08em" }}
                aria-label="LinkedIn profile">linkedin</a>
            )}
            {social.email && (
              <a href="#contact" className="underline-draw mono"
                style={{ color: "var(--color-fg-muted)", fontSize: "0.72rem", letterSpacing: "0.08em" }}>
                email
              </a>
            )}
          </div>
        </motion.div>
      </div>

      <LoadSequence />
    </section>
  );
}
