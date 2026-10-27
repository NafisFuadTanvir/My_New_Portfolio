import { z } from "zod";

// ─── Experience ────────────────────────────────────────────────────────────────
export const ExperienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  location: z.string().optional(),
  startDate: z.string(), // ISO YYYY-MM
  endDate: z.string().nullable(), // null = present
  bullets: z.array(z.string()).min(1).max(6),
  type: z.enum(["full-time", "part-time", "internship", "contract", "freelance"]),
});
export type Experience = z.infer<typeof ExperienceSchema>;

// ─── Education ────────────────────────────────────────────────────────────────
export const EducationSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  startYear: z.number().int().nullable(),
  endYear: z.number().int().nullable(),
  cgpa: z.string().optional(),
  credentialUrl: z.string().url().optional(),
  note: z.string().optional(), // e.g. "Final result published Oct 2024"
});
export type Education = z.infer<typeof EducationSchema>;

// ─── Certification ────────────────────────────────────────────────────────────
export const CertificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  year: z.number().int(),
  credentialUrl: z.string().url().optional(),
  batch: z.string().optional(),
  image: z.string().optional(), // path to actual certificate scan
});
export type Certification = z.infer<typeof CertificationSchema>;

// ─── Publication ──────────────────────────────────────────────────────────────
export const PublicationSchema = z.object({
  id: z.string(),
  title: z.string(),
  venue: z.string(),
  year: z.number().int(),
  url: z.string().url().optional(),
  doi: z.string().optional(),
  quartile: z.enum(["Q1", "Q2", "Q3", "Q4"]).optional(),
});
export type Publication = z.infer<typeof PublicationSchema>;

// ─── Leadership ───────────────────────────────────────────────────────────────
export const LeadershipSchema = z.object({
  id: z.string(),
  role: z.string(),
  organization: z.string(),
  startYear: z.number().int(),
  endYear: z.number().int().nullable(),
  description: z.string().optional(),
  bullets: z.array(z.string()).optional(),
  image: z.string().optional(), // path to leadership certificate/card image
});
export type Leadership = z.infer<typeof LeadershipSchema>;

// ─── Skill Group ──────────────────────────────────────────────────────────────
export const SkillProficiency = z.enum(["Daily", "Comfortable", "Familiar"]);
export const SkillItemSchema = z.object({
  name: z.string(),
  proficiency: SkillProficiency.optional(),
});
export const SkillGroupSchema = z.object({
  group: z.string(),
  skills: z.array(SkillItemSchema).min(1),
});
export type SkillGroup = z.infer<typeof SkillGroupSchema>;

// ─── Social Links ─────────────────────────────────────────────────────────────
export const SocialLinksSchema = z.object({
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  email: z.string().email().optional(),
  bdjobs: z.string().url().optional(),
});
export type SocialLinks = z.infer<typeof SocialLinksSchema>;

// ─── Profile (root) ───────────────────────────────────────────────────────────
// Privacy note: phone, home address, DOB, NID, passport, father/mother names,
// religion, marital status and photo metadata are EXCLUDED per PRD section 4.3.
export const ProfileSchema = z.object({
  name: z.string(),
  tagline: z.string().max(160),
  valueStatement: z.string().max(500),
  location: z.string(),
  availability: z.string().max(120),
  bio: z.array(z.string()).min(1).max(3),
  quickFacts: z.object({
    basedIn: z.string(),
    focus: z.string(),
    currentlyLearning: z.string(),
    languages: z.array(z.string()),
  }),
  social: SocialLinksSchema,
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  certifications: z.array(CertificationSchema),
  publications: z.array(PublicationSchema),
  leadership: z.array(LeadershipSchema),
  skillGroups: z.array(SkillGroupSchema),
  testingApproach: z.object({
    body: z.string().min(80).max(400),
    example: z.string().max(500),
  }),
});
export type Profile = z.infer<typeof ProfileSchema>;

// ─── Project ──────────────────────────────────────────────────────────────────
export const ProjectStatusSchema = z.enum([
  "active",
  "maintained",
  "archived",
  "wip",
]);

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  outcome: z.string().max(160),
  role: z.string(),
  stack: z.array(z.string()).min(1),
  status: ProjectStatusSchema,
  featured: z.boolean().default(false),
  githubSlug: z.string().optional(),
  liveUrl: z.string().url().optional(),
  thumbnail: z.string().optional(),
  problem: z.string().optional(),
  approach: z.string().optional(),
  architectureDiagram: z.string().optional(),
  keyFeatures: z.array(z.string()).optional(),
  testingStrategy: z
    .object({
      types: z.array(z.string()),
      tools: z.array(z.string()),
      coverageNote: z.string().optional(),
      bugsFound: z.string().optional(),
    })
    .optional(),
  improvements: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const ProjectsFileSchema = z.object({
  featuredSlugs: z.array(z.string()),
  projects: z.array(ProjectSchema),
});
export type ProjectsFile = z.infer<typeof ProjectsFileSchema>;

// ─── GitHub Repo (API response shape we care about) ───────────────────────────
export const GitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  topics: z.array(z.string()),
  stargazers_count: z.number(),
  forks_count: z.number(),
  pushed_at: z.string(),
  fork: z.boolean(),
  archived: z.boolean(),
  visibility: z.string(),
});
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

export const GitHubSnapshotSchema = z.object({
  fetchedAt: z.string(),
  repos: z.array(GitHubRepoSchema),
});
export type GitHubSnapshot = z.infer<typeof GitHubSnapshotSchema>;
