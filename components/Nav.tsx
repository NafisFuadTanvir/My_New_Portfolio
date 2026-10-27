"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollHide } from "@/components/motion/useScrollHide";

interface NavProps {
  name: string;
}

const NAV_LINKS = [
  { href: "#work",       label: "Work" },
  { href: "#about",      label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills",     label: "Skills" },
  { href: "#repos",      label: "GitHub" },
  { href: "#contact",    label: "Contact" },
];

export function Nav({ name }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { hidden } = useScrollHide();

  return (
    <>
      <motion.header
        role="banner"
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg)",
          willChange: "transform",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "3.5rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${name} — home`}
            style={{
              fontFamily: "var(--font-fraunces, Georgia, serif)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              letterSpacing: "-0.01em",
              color: "var(--color-fg)",
              textDecoration: "none",
              fontWeight: 400,
            }}
          >
            Nafis Fuad Tanvir
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden-mobile">
            <ul
              style={{
                display: "flex",
                gap: "2rem",
                listStyle: "none",
                padding: 0,
                margin: 0,
                alignItems: "center",
              }}
            >
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="underline-draw"
                    style={{
                      fontFamily: "var(--font-jetbrains, monospace)",
                      fontSize: "var(--text-mono)",
                      letterSpacing: "0.06em",
                      color: "var(--color-fg-muted)",
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile: hamburger only */}
          <div
            className="hidden-desktop"
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            <button
              id="mobile-menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                background: "transparent",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-btn)",
                padding: "0.3em 0.6em",
                cursor: "pointer",
                fontFamily: "var(--font-jetbrains, monospace)",
                fontSize: "var(--text-mono)",
                color: "var(--color-fg-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {menuOpen ? "close" : "menu"}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay — animated */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              backgroundColor: "var(--color-bg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <nav aria-label="Mobile navigation">
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      borderBottom:
                        i < NAV_LINKS.length - 1
                          ? "1px solid var(--color-border)"
                          : "none",
                    }}
                  >
                    <a
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "block",
                        paddingBlock: "1.25rem",
                        fontFamily: "var(--font-fraunces, Georgia, serif)",
                        fontSize: "clamp(2rem, 8vw, 3.5rem)",
                        lineHeight: 1,
                        color: "var(--color-fg)",
                        textDecoration: "none",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
