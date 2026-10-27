import type { Metadata } from "next";
import Link from "next/link";
import { getProfile } from "@/lib/profile";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Download or view the CV of Nafis Fuad Tanvir — SQA Engineer and Test Automation Specialist based in Chattogram, Bangladesh.",
};

export default function ResumePage() {
  const profile = getProfile();

  return (
    <>
      <Nav name={profile.name} />
      <main id="main-content">
        <section
          aria-label="Résumé"
          style={{
            minHeight: "80dvh",
            paddingTop: "8rem",
            paddingBottom: "6rem",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="container">
            {/* Breadcrumb */}
            <Link
              href="/"
              className="underline-draw mono"
              style={{
                color: "var(--color-fg-muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                marginBottom: "3rem",
                textDecoration: "none",
              }}
            >
              ← home
            </Link>

            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "flex-end",
                gap: "2rem",
                marginBottom: "3rem",
              }}
            >
              <div>
                <p className="section-num" style={{ marginBottom: "0.75rem" }}>
                  résumé
                </p>
                <h1
                  style={{
                    fontFamily: "var(--font-fraunces, Georgia, serif)",
                    fontSize: "var(--text-display)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    margin: 0,
                  }}
                >
                  Nafis Fuad Tanvir
                </h1>
              </div>

              {/* Download CTA */}
              <a
                href="/Nafis_Fuad_Tanvir_CV.pdf"
                download
                className="btn-primary"
                id="resume-download"
                aria-label="Download CV as PDF"
              >
                ↓ Download PDF
              </a>
            </div>

            {/* Notice — PDF embed */}
            <div
              style={{
                background: "var(--color-card-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "4px",
                padding: "1rem 1.5rem",
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <p
                className="mono"
                style={{
                  color: "var(--color-fg-muted)",
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                The PDF viewer below requires a modern browser. If it does not
                render, use the download button above.
              </p>
              <a
                href="/Nafis_Fuad_Tanvir_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ flexShrink: 0 }}
                aria-label="Open CV in new tab"
              >
                ↗ Open in new tab
              </a>
            </div>

            {/* PDF embed */}
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "4px",
                overflow: "hidden",
                background: "var(--color-card-bg)",
              }}
            >
              <object
                data="/Nafis_Fuad_Tanvir_CV.pdf"
                type="application/pdf"
                width="100%"
                style={{ height: "80vh", display: "block" }}
                aria-label="Nafis Fuad Tanvir CV PDF"
              >
                <p style={{ padding: "2rem", color: "var(--color-fg-muted)" }}>
                  Your browser does not support inline PDF viewing.{" "}
                  <a
                    href="/Nafis_Fuad_Tanvir_CV.pdf"
                    className="underline-draw"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Download the PDF
                  </a>{" "}
                  instead.
                </p>
              </object>
            </div>
          </div>
        </section>
      </main>
      <Footer profile={profile} />
    </>
  );
}
