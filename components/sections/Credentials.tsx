"use client";

import type { Profile } from "@/types/content";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerList, StaggerItem } from "@/components/motion/StaggerList";
import { RevealBlock } from "@/components/motion/RevealBlock";

interface CredentialsProps {
  profile: Profile;
}

/** Full-screen image lightbox */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          background: "rgba(0,0,0,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "zoom-out",
          padding: "2rem",
        }}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            maxWidth: "600px",
            width: "100%",
            cursor: "default",
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: "8px",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close certificate"
            style={{
              position: "absolute",
              top: "-2.5rem",
              right: 0,
              background: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontFamily: "var(--font-jetbrains, monospace)",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              padding: "0.3em 0.8em",
              cursor: "pointer",
              borderRadius: "var(--radius-chip)",
            }}
          >
            ESC / CLOSE ✕
          </button>
          <Image
            src={src}
            alt={alt}
            width={720}
            height={1020}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
              display: "block",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Credentials({ profile }: CredentialsProps) {
  const { education, certifications, publications, leadership } = profile;
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="credentials" aria-label="Education, certifications, publications and leadership" className="section">
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}

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
          <span>Background</span>
        </RevealText>

        {/* ── Education ── */}
        <RevealBlock delay={0.08}>
          <p style={{
            fontFamily: "var(--font-jetbrains, monospace)",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-fg-muted)",
            marginBottom: "1rem",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid var(--color-border)",
          }}>
            Education
          </p>
        </RevealBlock>

        <StaggerList staggerDelay={0.07} style={{ marginBottom: "3rem" }}>
          {education.map((edu) => {
            const isBsc = edu.degree === "B.Sc.";
            const levelLabel =
              edu.degree === "B.Sc." ? "University" :
              edu.degree === "HSC" ? "Higher Secondary (HSC)" :
              "Secondary School (SSC)";
            return (
              <StaggerItem key={edu.id}>
                <div
                  className="card"
                  style={{
                    padding: "1.5rem 1.75rem",
                    marginBottom: "0.75rem",
                    borderLeft: isBsc
                      ? "3px solid var(--color-accent)"
                      : "1px solid var(--color-border)",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "start" }}>
                    <div>
                      <p style={{
                        fontFamily: "var(--font-jetbrains, monospace)",
                        color: "var(--color-fg-muted)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "0.35rem",
                      }}>
                        {levelLabel}
                      </p>
                      <h4 style={{
                        fontFamily: "var(--font-fraunces, Georgia, serif)",
                        fontSize: isBsc ? "var(--text-subheading)" : "var(--text-small)",
                        margin: "0 0 0.2rem",
                        lineHeight: 1.2,
                      }}>
                        {edu.degree} in {edu.field}
                      </h4>
                      <p style={{ fontSize: "var(--text-small)", color: "var(--color-fg-muted)", margin: 0 }}>
                        {edu.institution}
                      </p>
                      {edu.note && (
                        <p className="mono" style={{ fontSize: "0.62rem", color: "var(--color-accent)", marginTop: "0.4rem" }}>
                          ✓ {edu.note}
                        </p>
                      )}
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p className="mono" style={{ color: "var(--color-fg-muted)", fontSize: "0.68rem", margin: "0 0 0.4rem" }}>
                        {edu.startYear
                          ? `${edu.startYear}–${edu.endYear ?? "present"}`
                          : `Passed: ${edu.endYear}`}
                      </p>
                      {edu.cgpa && <span className="chip">{edu.cgpa}</span>}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerList>

        {/* ── Certifications — image showcase grid ── */}
        {certifications.length > 0 && (
          <>
            <RevealBlock delay={0.08}>
              <p style={{
                fontFamily: "var(--font-jetbrains, monospace)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-fg-muted)",
                marginBottom: "1.25rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid var(--color-border)",
              }}>
                Certifications
              </p>
            </RevealBlock>

            <StaggerList staggerDelay={0.07} style={{ marginBottom: "3rem" }}>
              <div className="cert-grid">
                {certifications.map((cert) => (
                  <StaggerItem key={cert.id}>
                    <div
                      className="cert-card"
                      onClick={() => cert.image && setLightbox({ src: cert.image, alt: cert.name })}
                      style={{ cursor: cert.image ? "zoom-in" : "default" }}
                      role={cert.image ? "button" : undefined}
                      tabIndex={cert.image ? 0 : undefined}
                      aria-label={cert.image ? `View ${cert.name} certificate` : undefined}
                      onKeyDown={(e) => e.key === "Enter" && cert.image && setLightbox({ src: cert.image, alt: cert.name })}
                    >
                      {/* Certificate image thumbnail */}
                      {cert.image && (
                        <div className="cert-thumb">
                          <Image
                            src={cert.image}
                            alt={`${cert.name} certificate`}
                            width={400}
                            height={280}
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                          />
                          <div className="cert-thumb-overlay">
                            <span style={{
                              fontFamily: "var(--font-jetbrains, monospace)",
                              fontSize: "0.65rem",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "#fff",
                            }}>
                              View Certificate ↗
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Info row */}
                      <div style={{ padding: "1rem 1.25rem" }}>
                        <h4 style={{
                          fontFamily: "var(--font-fraunces, Georgia, serif)",
                          fontSize: "0.95rem",
                          margin: "0 0 0.3rem",
                          lineHeight: 1.3,
                        }}>
                          {cert.name}
                        </h4>
                        <p style={{ fontSize: "0.72rem", color: "var(--color-fg-muted)", margin: "0 0 0.75rem" }}>
                          {cert.issuer}{cert.batch ? ` · ${cert.batch}` : ""} · {cert.year}
                        </p>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              fontSize: "0.65rem",
                              fontFamily: "var(--font-jetbrains, monospace)",
                              color: "var(--color-accent)",
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              textDecoration: "none",
                              border: "1px solid var(--color-accent)",
                              padding: "0.3em 0.7em",
                              borderRadius: "var(--radius-chip)",
                            }}
                          >
                            View Certificate →
                          </a>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerList>
          </>
        )}

        {/* ── Publications ── */}
        {publications.length > 0 && (
          <>
            <RevealBlock delay={0.08}>
              <p style={{
                fontFamily: "var(--font-jetbrains, monospace)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-fg-muted)",
                marginBottom: "1.25rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid var(--color-border)",
              }}>
                Publications
              </p>
            </RevealBlock>
            <StaggerList staggerDelay={0.07} style={{ marginBottom: "3rem" }}>
              {publications.map((pub) => (
                <StaggerItem key={pub.id}>
                  <div className="card" style={{ padding: "1.5rem", marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <p style={{ fontFamily: "var(--font-jetbrains, monospace)", fontSize: "0.62rem", margin: 0, color: "var(--color-fg-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Publication</p>
                      {pub.quartile && (
                        <span className="chip" style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}>{pub.quartile}</span>
                      )}
                    </div>
                    <h4 style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontSize: "var(--text-small)", margin: "0 0 0.25rem", lineHeight: 1.3 }}>
                      {pub.title}
                    </h4>
                    <p style={{ fontSize: "var(--text-small)", color: "var(--color-fg-muted)", margin: "0 0 0.5rem" }}>
                      {pub.venue} · {pub.year}
                    </p>
                    {pub.url && (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.68rem", fontFamily: "var(--font-jetbrains, monospace)", color: "var(--color-accent)" }}>
                        Read paper →
                      </a>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
          </>
        )}

        {/* ── Leadership Experience — image showcase ── */}
        {leadership.length > 0 && (
          <>
            <RevealBlock delay={0.08}>
              <p style={{
                fontFamily: "var(--font-jetbrains, monospace)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-fg-muted)",
                marginBottom: "1.25rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid var(--color-border)",
              }}>
                Leadership Experience
              </p>
            </RevealBlock>

            <StaggerList staggerDelay={0.07}>
              {leadership.map((lead) => (
                <StaggerItem key={lead.id}>
                  <div className="lead-card">
                    {/* Image panel — clickable lightbox */}
                    {lead.image && (
                      <div
                        className="lead-img-wrap"
                        onClick={() => setLightbox({ src: lead.image!, alt: `${lead.role} — ${lead.organization}` })}
                        role="button"
                        tabIndex={0}
                        aria-label={`View ${lead.role} certificate`}
                        onKeyDown={(e) => e.key === "Enter" && setLightbox({ src: lead.image!, alt: `${lead.role}` })}
                        style={{ cursor: "zoom-in" }}
                      >
                        <Image
                          src={lead.image}
                          alt={`${lead.role} — ${lead.organization}`}
                          width={300}
                          height={240}
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                        />
                        <div className="lead-img-overlay">
                          <span style={{
                            fontFamily: "var(--font-jetbrains, monospace)",
                            fontSize: "0.62rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#fff",
                          }}>
                            View ↗
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Content panel */}
                    <div style={{ padding: "1.5rem 1.75rem", flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.5rem" }}>
                        <div>
                          <h4 style={{
                            fontFamily: "var(--font-fraunces, Georgia, serif)",
                            fontSize: "1.05rem",
                            fontWeight: 600,
                            margin: "0 0 0.2rem",
                            lineHeight: 1.2,
                          }}>
                            {lead.role}
                          </h4>
                          <p style={{
                            fontSize: "0.68rem",
                            color: "var(--color-accent)",
                            margin: 0,
                            fontFamily: "var(--font-jetbrains, monospace)",
                          }}>
                            {lead.organization}
                          </p>
                        </div>
                        <span className="mono" style={{
                          color: "var(--color-fg-muted)",
                          fontSize: "0.65rem",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          background: "var(--color-surface-1)",
                          border: "1px solid var(--color-border)",
                          padding: "0.2em 0.6em",
                          borderRadius: "var(--radius-chip)",
                        }}>
                          {lead.startYear}–{lead.endYear ?? "present"}
                        </span>
                      </div>

                      {lead.description && (
                        <p style={{ fontSize: "0.72rem", color: "var(--color-fg-muted)", margin: "0.5rem 0 0.75rem", fontStyle: "italic" }}>
                          {lead.description}
                        </p>
                      )}

                      {lead.bullets && lead.bullets.length > 0 && (
                        <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                          {lead.bullets.map((bullet, bi) => (
                            <li key={bi} style={{ fontSize: "var(--text-small)", color: "var(--color-fg-muted)", lineHeight: 1.55 }}>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
          </>
        )}
      </div>

      <style>{`
        /* Certificate grid */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 0;
        }
        @media (max-width: 900px) { .cert-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .cert-grid { grid-template-columns: 1fr; } }

        .cert-card {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          background: var(--color-card-bg);
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .cert-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(255,90,43,0.12);
        }
        .cert-thumb {
          position: relative;
          height: 180px;
          overflow: hidden;
          background: #1a1714;
        }
        .cert-thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255,90,43,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cert-card:hover .cert-thumb-overlay { opacity: 1; }

        /* Leadership card */
        .lead-card {
          display: grid;
          grid-template-columns: 260px 1fr;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          background: var(--color-card-bg);
          overflow: hidden;
          margin-bottom: 1.25rem;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .lead-card:hover {
          border-color: var(--color-accent);
          box-shadow: 0 8px 40px rgba(255,90,43,0.10);
        }
        .lead-img-wrap {
          position: relative;
          overflow: hidden;
          background: #111;
        }
        .lead-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .lead-img-wrap:hover .lead-img-overlay { opacity: 1; }

        @media (max-width: 767px) {
          .lead-card { grid-template-columns: 1fr; }
          .lead-img-wrap { height: 200px; }
        }
      `}</style>
    </section>
  );
}
