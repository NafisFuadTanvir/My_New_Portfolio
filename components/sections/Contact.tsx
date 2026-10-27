"use client";

import { useState, useRef } from "react";
import type { Profile } from "@/types/content";
import { RevealText } from "@/components/motion/RevealText";

interface ContactProps {
  profile: Profile;
}

type FormState = "idle" | "submitting" | "success" | "error";

export function Contact({ profile }: ContactProps) {
  const { social } = profile;
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailRevealed, setEmailRevealed] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot check
    if (honeypotRef.current?.value) return;

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error ?? "Something went wrong. Try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  }

  // Split email to deter scrapers — reassemble client-side
  const emailParts = social.email?.split("@") ?? [];

  return (
    <section id="contact" aria-label="Contact" className="section">
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
          <span>Get in touch</span>
        </RevealText>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot — invisible to humans */}
            <input
              ref={honeypotRef}
              name="website"
              type="text"
              tabIndex={-1}
              aria-hidden="true"
              style={{ display: "none" }}
              autoComplete="off"
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  autoComplete="name"
                  disabled={state === "submitting"}
                />
              </div>

              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  autoComplete="email"
                  disabled={state === "submitting"}
                />
              </div>

              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What would you like to discuss?"
                  disabled={state === "submitting"}
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={state === "submitting"}
                  style={{ minWidth: "10rem" }}
                >
                  {state === "submitting" ? "Sending…" : "Send message"}
                </button>
              </div>

              {/* Status */}
              {state === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    padding: "1rem",
                    border: "1px solid #3a8a50",
                    borderRadius: "var(--radius-card)",
                    background: "rgba(58,138,80,0.08)",
                  }}
                >
                  <p
                    className="mono"
                    style={{
                      color: "#3a8a50",
                      fontSize: "var(--text-mono)",
                      margin: 0,
                    }}
                  >
                    PASS — message received. I&apos;ll reply within 24 hours.
                  </p>
                </div>
              )}

              {state === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  style={{
                    padding: "1rem",
                    border: "1px solid var(--color-accent)",
                    borderRadius: "var(--radius-card)",
                    background: "rgba(232,72,28,0.08)",
                  }}
                >
                  <p
                    className="mono"
                    style={{
                      color: "var(--color-accent)",
                      fontSize: "var(--text-mono)",
                      margin: 0,
                    }}
                  >
                    FAIL — {errorMsg}
                  </p>
                </div>
              )}
            </div>
          </form>

          {/* Direct links */}
          <div
            style={{
              paddingLeft: "2rem",
              borderLeft: "1px solid var(--color-border)",
            }}
          >
            <p
              className="mono"
              style={{
                color: "var(--color-fg-muted)",
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Or reach me directly
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Email obfuscated */}
              {social.email && (
                <div>
                  <p
                    className="mono"
                    style={{
                      color: "var(--color-fg-muted)",
                      fontSize: "0.65rem",
                      marginBottom: "0.25rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Email
                  </p>
                  {emailRevealed ? (
                    <a
                      href={`mailto:${social.email}`}
                      className="underline-draw"
                      style={{
                        fontSize: "var(--text-small)",
                        color: "var(--color-fg)",
                      }}
                    >
                      {social.email}
                    </a>
                  ) : (
                    <button
                      onClick={() => setEmailRevealed(true)}
                      className="btn-secondary"
                      style={{ padding: "0.3em 0.75em", fontSize: "0.68rem" }}
                      aria-label="Reveal email address"
                    >
                      {emailParts[0]}@···
                    </button>
                  )}
                </div>
              )}

              {social.linkedin && (
                <div>
                  <p
                    className="mono"
                    style={{
                      color: "var(--color-fg-muted)",
                      fontSize: "0.65rem",
                      marginBottom: "0.25rem",
                      textTransform: "uppercase",
                    }}
                  >
                    LinkedIn
                  </p>
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-draw"
                    style={{ fontSize: "var(--text-small)", color: "var(--color-fg)" }}
                  >
                    Nafis Fuad Tanvir
                  </a>
                </div>
              )}

              {social.github && (
                <div>
                  <p
                    className="mono"
                    style={{
                      color: "var(--color-fg-muted)",
                      fontSize: "0.65rem",
                      marginBottom: "0.25rem",
                      textTransform: "uppercase",
                    }}
                  >
                    GitHub
                  </p>
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-draw"
                    style={{ fontSize: "var(--text-small)", color: "var(--color-fg)" }}
                  >
                    NafisFuadTanvir
                  </a>
                </div>
              )}

              <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--color-border)" }}>
                <a
                  href="/resume"
                  className="btn-secondary"
                  style={{ width: "100%", justifyContent: "center" }}
                  id="cv-download"
                >
                  Download CV ↓
                </a>
              </div>
            </div>

            {/* Testing note */}
            <p
              className="mono"
              style={{
                marginTop: "2rem",
                fontSize: "0.65rem",
                color: "var(--color-fg-muted)",
                lineHeight: 1.5,
              }}
            >
              <a
                href="#testing-note"
                className="underline-draw"
                style={{ color: "var(--color-fg-muted)" }}
              >
                How this site is tested
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .contact-grid > div:last-child {
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
