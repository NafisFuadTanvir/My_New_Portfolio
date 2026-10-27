import { ImageResponse } from "next/og";

export const alt = "Nafis Fuad Tanvir — SQA Engineer & Test Automation Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F3EFE6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#E8481C",
          }}
        />

        {/* Mono label */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6B6B5E",
            marginBottom: 28,
            display: "flex",
          }}
        >
          00 — portfolio · build 2026.10
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "#141414",
            marginBottom: 36,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Nafis Fuad</span>
          <span>Tanvir</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#E8481C",
            marginBottom: 16,
            display: "flex",
          }}
        >
          SQA Engineer · Test Automation Specialist
        </div>

        {/* Value statement */}
        <div
          style={{
            fontSize: 20,
            color: "#6B6B5E",
            lineHeight: 1.5,
            maxWidth: "700px",
            display: "flex",
          }}
        >
          I find the bugs before your users do — then I build the tools to make sure they stay found.
        </div>

        {/* Bottom: location */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 72,
            fontFamily: "monospace",
            fontSize: 14,
            color: "#6B6B5E",
            letterSpacing: "0.06em",
            display: "flex",
          }}
        >
          Chattogram, Bangladesh
        </div>
      </div>
    ),
    { ...size }
  );
}
