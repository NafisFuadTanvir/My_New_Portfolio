import { Project, ProjectsFile, ProjectsFileSchema } from "@/types/content";
import projectsData from "@/content/projects.json";

let _data: ProjectsFile | null = null;

function getData(): ProjectsFile {
  if (_data) return _data;
  _data = ProjectsFileSchema.parse(projectsData);
  return _data;
}

export function getAllProjects(): Project[] {
  return getData().projects;
}

export function getFeaturedProjects(): Project[] {
  const { featuredSlugs, projects } = getData();
  const map = new Map(projects.map((p) => [p.slug, p]));
  return featuredSlugs
    .map((slug) => map.get(slug))
    .filter((p): p is Project => p !== null && p !== undefined);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getData().projects.find((p) => p.slug === slug);
}
