import { GitHubRepo, GitHubSnapshot, GitHubSnapshotSchema, GitHubRepoSchema } from "@/types/content";
import snapshotData from "@/content/github-snapshot.json";

const GITHUB_USER = "NafisFuadTanvir";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed&type=owner`;

const REVALIDATE_SECONDS = 21600; // 6 hours — passed to fetch() next.revalidate

function parseSnapshot(): GitHubSnapshot {
  return GitHubSnapshotSchema.parse(snapshotData);
}

/**
 * Fetch GitHub repos at build time (ISR).
 * Falls back to the last cached github-snapshot.json if the API fails or rate-limits.
 * Excludes forks and archived repos by default.
 */
export async function fetchGitHubRepos(): Promise<{
  repos: GitHubRepo[];
  fromCache: boolean;
  fetchedAt: string;
}> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(GITHUB_API, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.warn(`GitHub API returned ${res.status}; using cached snapshot.`);
      const snapshot = parseSnapshot();
      return {
        repos: filterRepos(snapshot.repos),
        fromCache: true,
        fetchedAt: snapshot.fetchedAt,
      };
    }

    const raw = await res.json();
    const repos = (raw as unknown[])
      .map((r) => {
        const parsed = GitHubRepoSchema.safeParse(r);
        return parsed.success ? parsed.data : null;
      })
      .filter((r): r is GitHubRepo => r !== null);

    return {
      repos: filterRepos(repos),
      fromCache: false,
      fetchedAt: "live", // actual timestamp unavailable at prerender time
    };
  } catch (err) {
    console.error("GitHub fetch failed, using cached snapshot:", err);
    const snapshot = parseSnapshot();
    return {
      repos: filterRepos(snapshot.repos),
      fromCache: true,
      fetchedAt: snapshot.fetchedAt,
    };
  }
}

function filterRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return repos.filter((r) => !r.fork && !r.archived);
}
