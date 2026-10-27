import { ImageResponse } from "next/og";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects()
    .filter((p) => p.featured)
    .map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title ?? "Project";
  const outcome = project?.outcome ?? "";
  const stack = project?.stack?.slice(0, 4) ?? [];
  const role = project?.role ?? "";

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

        {/* Breadcrumb */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#6B6B5E",
            marginBottom: 24,
            display: "flex",
          }}
        >
          nafisfuadtanvir.com · case study
        </div>

        {/* Project title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#141414",
            marginBottom: 28,
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Role */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#E8481C",
            marginBottom: 16,
            display: "flex",
          }}
        >
          {role}
        </div>

        {/* Outcome */}
        <div
          style={{
            fontSize: 20,
            color: "#6B6B5E",
            lineHeight: 1.45,
            maxWidth: "680px",
            marginBottom: 32,
            display: "flex",
          }}
        >
          {outcome}
        </div>

        {/* Stack chips */}
        <div style={{ display: "flex", gap: 8 }}>
          {stack.map((s) => (
            <div
              key={s}
              style={{
                padding: "4px 12px",
                background: "#ECEAE2",
                border: "1px solid #D4CFC5",
                borderRadius: 4,
                fontFamily: "monospace",
                fontSize: 13,
                color: "#6B6B5E",
                display: "flex",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
