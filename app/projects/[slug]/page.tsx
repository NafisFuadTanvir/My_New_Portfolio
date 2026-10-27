import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CaseStudy } from "./CaseStudy";
import { getProfile } from "@/lib/profile";
import { PageTransition } from "@/components/motion/PageTransition";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects()
    .filter((p) => p.featured)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.outcome,
    openGraph: {
      title: project.title,
      description: project.outcome,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  // notFound() throws, but TS doesn't know that — narrow the type:
  const resolvedProject = project!;

  const profile = getProfile();
  const allFeatured = getAllProjects().filter((p) => p.featured);
  const currentIndex = allFeatured.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? allFeatured[currentIndex - 1] : null;
  const next =
    currentIndex < allFeatured.length - 1
      ? allFeatured[currentIndex + 1]
      : null;

  return (
    <>
      <Nav name={profile.name} />
      <PageTransition>
        <main id="main-content">
          <CaseStudy project={resolvedProject} prev={prev} next={next} />
        </main>
      </PageTransition>
      <Footer profile={profile} />
    </>
  );
}
