# Nafis Fuad Tanvir — Portfolio

Personal portfolio website built with **Next.js 16 App Router**, TypeScript, and vanilla CSS.
Live on Netlify → *(add URL after first deploy)*

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Vanilla CSS (design tokens via CSS variables) |
| Animation | Framer Motion |
| Content | `content/profile.json` (single source of truth) |
| Validation | Zod schemas in `types/content.ts` |

---

## Getting Started on a New Laptop

```bash
# 1 - Clone
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>/portfolio

# 2 - Install dependencies
npm install

# 3 - Run dev server
npm run dev
# Open http://localhost:3000
```

> Node 18+ required.

---

## Project Structure

```
portfolio/
├── app/                         # Next.js App Router pages
│   ├── layout.tsx               # Root layout, metadata, fonts
│   ├── page.tsx                 # Home page (all sections)
│   ├── projects/[id]/           # Project case-study pages
│   ├── resume/                  # /resume redirect page
│   ├── robots.ts                # SEO robots.txt
│   └── sitemap.ts               # SEO sitemap.xml
│
├── components/
│   ├── AnimatedBackground.tsx   # Canvas floating orbs animation
│   ├── Nav.tsx                  # Sticky navbar
│   ├── motion/                  # Reusable animation wrappers
│   └── sections/                # Page sections
│       ├── Hero.tsx
│       ├── Work.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx           # Two-column: Core Tech + AI/Digital/Soft
│       ├── Credentials.tsx      # Education, Certs (lightbox), Leadership
│       ├── TestingApproach.tsx
│       ├── Repos.tsx
│       └── Contact.tsx
│
├── content/
│   └── profile.json        # ALL personal content lives here
│
├── types/
│   └── content.ts          # Zod schemas + TypeScript types
│
├── public/
│   ├── nafis-photo.jpg          # Profile photo
│   ├── cert-road-to-sdet.jpg    # Road to SDET certificate
│   ├── cert-ai-django.jpg       # Innovative Skills Django cert
│   ├── cert-react-js.jpg        # Innovative Skills React cert
│   ├── leadership-ieee.jpg      # IEEE Executive Committee card
│   ├── leadership-sti.jpg       # STI Certificate of Appreciation
│   └── Nafis_Fuad_Tanvir_CV.pdf # Downloadable CV
│
├── lib/
│   └── content.ts          # Loads and validates profile.json
│
└── tests/                  # Playwright E2E tests
```

---

## How to Update Content

All personal info lives in one file: `content/profile.json`

| What to change | Where in profile.json |
|---|---|
| Name, tagline, bio | Top-level fields |
| Experience / work history | `experience[]` array |
| Education | `education[]` array |
| Certifications | `certifications[]` — add `image` path for thumbnail |
| Leadership roles | `leadership[]` — add `image` path for card |
| Skills | `skillGroups[]` array |
| Social links / email | `social` object |
| Projects | `projects[]` array |

---

## Adding / Updating Images

Put images in the `public/` folder and reference them with a `/` prefix in profile.json:

```json
{ "image": "/cert-my-new-cert.jpg" }
```

---

## Deploy to Netlify

1. Push this repo to GitHub (see below)
2. Go to app.netlify.com -> Add new site -> Import from Git
3. Set:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18`
4. Add env var: `NEXT_PUBLIC_BASE_URL=https://your-site.netlify.app`
5. Deploy

---

## Push to GitHub (First Time)

Run these commands inside the `portfolio/` folder:

```bash
git add .
git commit -m "feat: complete portfolio with certs, leadership, animated bg"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

---

## What is NOT committed (.gitignore)

- `node_modules/` — run `npm install` after cloning
- `.next/` — build cache, regenerated automatically
- `.env*` — environment secrets
- `*.tsbuildinfo` — TypeScript cache

---

## Contact

Nafis Fuad Tanvir
GitHub: https://github.com/NafisFuadTanvir
LinkedIn: https://www.linkedin.com/in/nafis-fuad-tanvir-2a17bb232/
