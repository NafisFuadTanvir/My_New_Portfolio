import { getProfile } from "@/lib/profile";
import { getFeaturedProjects } from "@/lib/projects";
import { fetchGitHubRepos } from "@/lib/github";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { TestingApproach } from "@/components/sections/TestingApproach";
import { Credentials } from "@/components/sections/Credentials";
import { Repos } from "@/components/sections/Repos";
import { Contact } from "@/components/sections/Contact";
import { PageTransition } from "@/components/motion/PageTransition";

// revalidate is configured via fetch() options in lib/github.ts

export default async function HomePage() {
  const profile = getProfile();
  const featured = getFeaturedProjects();
  const { repos, fromCache } = await fetchGitHubRepos();

  return (
    <>
      <Nav name={profile.name} />

      <PageTransition>
        <main id="main-content">
          <Hero profile={profile} />
          <Work projects={featured} />
          <About profile={profile} />
          <Experience profile={profile} />
          <Skills profile={profile} />
          <TestingApproach profile={profile} />
          <Credentials profile={profile} />
          <Repos repos={repos} fromCache={fromCache} />
          <Contact profile={profile} />
        </main>
      </PageTransition>

      <Footer profile={profile} />
    </>
  );
}
