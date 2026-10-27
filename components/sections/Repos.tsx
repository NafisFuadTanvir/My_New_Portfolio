"use client";

import { useState, useMemo, useEffect } from "react";
import type { GitHubRepo } from "@/types/content";
import { RevealText } from "@/components/motion/RevealText";
import { RevealBlock } from "@/components/motion/RevealBlock";

interface ReposProps {
  repos: GitHubRepo[];
  fromCache: boolean;
}

// Language → dot color (subset of popular ones)
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Java: "#b07219",
  Go: "#00add8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};

const PAGE_SIZE = 12;

export function Repos({ repos, fromCache }: ReposProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showAll, setShowAll] = useState(false);
  // nowMs is set after mount so Date.now() never runs during SSR prerender
  const [nowMs, setNowMs] = useState<number>(0);
  useEffect(() => { setNowMs(Date.now()); }, []);

  // Build unique language list
  const languages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => { if (r.language) langs.add(r.language); });
    return Array.from(langs).sort();
  }, [repos]);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return repos;
    return repos.filter((r) => r.language === activeFilter);
  }, [repos, activeFilter]);

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const hasMore = filtered.length > PAGE_SIZE && !showAll;

  function relativeTime(iso: string): string {
    if (!nowMs) return "";
    const diff = nowMs - new Date(iso).getTime();
    const days = Math.floor(diff / 86_400_000);
    if (days < 1) return "today";
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  }

  return (
    <section id="repos" aria-label="All GitHub repositories" className="section">
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "flex-end",
            marginBottom: "2rem",
            gap: "1rem",
          }}
        >
          <div>

            <RevealText
              delay={0.08}
              style={{
                fontFamily: "var(--font-fraunces, Georgia, serif)",
                fontSize: "var(--text-display)",
                lineHeight: 0.95,
              }}
            >
              <span>GitHub</span>
            </RevealText>
          </div>
          <RevealBlock delay={0.12}>
          <p
            className="mono"
            style={{
              color: fromCache ? "var(--color-fg-muted)" : "var(--color-accent)",
              fontSize: "0.68rem",
              paddingBottom: "0.2rem",
            }}
            title={fromCache ? "Loaded from cached snapshot" : "Live from GitHub API"}
          >
            {fromCache ? "cached" : "live"} · {repos.length} repos
          </p>
          </RevealBlock>
        </div>

        {/* Language filter pills */}
        <div
          role="group"
          aria-label="Filter by language"
          style={{
            display: "flex",
            gap: "0.4rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <button
            onClick={() => { setActiveFilter("all"); setShowAll(false); }}
            className={activeFilter === "all" ? "btn-primary" : "btn-secondary"}
            style={{ padding: "0.3em 0.75em", fontSize: "0.68rem" }}
          >
            all
          </button>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => { setActiveFilter(lang); setShowAll(false); }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.3em 0.75em",
                background: activeFilter === lang ? "var(--color-fg)" : "transparent",
                color: activeFilter === lang ? "var(--color-bg)" : "var(--color-fg-muted)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-chip)",
                cursor: "pointer",
                fontFamily: "var(--font-jetbrains, monospace)",
                fontSize: "0.68rem",
                letterSpacing: "0.06em",
                transition: "background 0.12s, color 0.12s",
              }}
            >
              <span
                aria-hidden="true"
                className="lang-dot"
                style={{
                  background: LANG_COLORS[lang] ?? "var(--color-fg-muted)",
                }}
              />
              {lang}
            </button>
          ))}
        </div>

        {/* Repos grid */}
        <ul
          aria-live="polite"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {visible.map((repo) => (
            <li key={repo.id} className="card">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  padding: "1.25rem",
                  height: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
                aria-label={`${repo.name} on GitHub`}
              >
                {/* Name */}
                <p
                  className="underline-draw"
                  style={{
                    fontFamily: "var(--font-jetbrains, monospace)",
                    fontSize: "var(--text-small)",
                    fontWeight: 500,
                    margin: 0,
                    color: "var(--color-fg)",
                    lineHeight: 1.3,
                  }}
                >
                  {repo.name}
                </p>

                {/* Description */}
                {repo.description && (
                  <p
                    style={{
                      fontSize: "var(--text-small)",
                      color: "var(--color-fg-muted)",
                      margin: 0,
                      lineHeight: 1.45,
                      flex: 1,
                    }}
                  >
                    {repo.description}
                  </p>
                )}

                {/* Topics */}
                {repo.topics.length > 0 && (
                  <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                    {repo.topics.slice(0, 4).map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "center",
                    marginTop: "auto",
                    paddingTop: "0.5rem",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  {repo.language && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.68rem",
                        fontFamily: "var(--font-jetbrains, monospace)",
                        color: "var(--color-fg-muted)",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="lang-dot"
                        style={{ background: LANG_COLORS[repo.language] ?? "var(--color-fg-muted)" }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span
                      className="mono"
                      style={{ fontSize: "0.68rem", color: "var(--color-fg-muted)" }}
                    >
                      {repo.stargazers_count} stars
                    </span>
                  )}
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--color-fg-muted)",
                      marginLeft: "auto",
                    }}
                  >
                    {relativeTime(repo.pushed_at)}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* Show more */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              onClick={() => setShowAll(true)}
              className="btn-secondary"
            >
              Show {filtered.length - PAGE_SIZE} more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
