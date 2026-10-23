# Oleksandr Novytskyi — Portfolio

Personal portfolio site presenting two production projects:

- **CEX·DEX Arbitrage Dashboard** — .NET 9 + SignalR + React system that monitors 21 trading pairs across 7 exchanges.
- **Yummy Cakee** — responsive website built and delivered for a home-bakery client.

## Tech

- React 18 + Vite
- CSS Modules with shared design tokens (light and dark themes)
- No UI or animation libraries; IntersectionObserver for the active-section nav

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
├── data/            # All copy, links and figures (profile.js, projects.js)
├── components/
│   ├── layout/      # Header (sticky nav + mobile menu), Footer
│   ├── sections/    # Hero, project overview, case studies, skills, contact
│   └── ui/          # Reusable pieces: Figure, StatGrid, TagList, PointList, headings
├── hooks/           # useActiveSection, useCopyToClipboard
├── styles/          # global.css: tokens, base styles, theme
└── utils/           # asset() helper for files in /public
public/images/       # Project screenshots (WebP)
```

To update text or add a project, edit `src/data/` — components only handle layout.

## Deployment (Vercel)

Import the GitHub repository in Vercel. The defaults work as-is:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
