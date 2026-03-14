# SWBlends

A modern portfolio/booking website for **SWBlends**, a professional barbershop located in Manly, Sydney. Built with Next.js 15 with a focus on smooth, high-quality animations.

## Tech Stack

- **Next.js 15** (App Router) with React 19
- **TailwindCSS v4** — utility-first styling with custom CSS variables and dark mode support
- **GSAP** (ScrollTrigger + SplitText) — scroll-based and character-level animations
- **Lenis** — smooth scrolling integrated with GSAP ticker
- **shadcn/ui** + **Headless UI** — accessible, composable UI components
- **Radix UI** — low-level UI primitives
- **Lucide React** — icon set
- **Vercel Analytics & Speed Insights** — production monitoring
- **next-sitemap** — automatic sitemap generation at build time

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server (with Turbopack):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production (also generates sitemap) |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
  layout.js         # Root layout — fonts, metadata, analytics
  page.js           # Main page — GSAP animations, smooth scroll, work showcase
  globals.css       # TailwindCSS v4 config, design tokens, animation utilities
  manifest.json     # PWA manifest
assets/             # Portfolio work images
components/
  ui/               # Reusable UI components (Button, NavigationMenu, etc.)
lib/
  utils.js          # cn() utility for class merging
public/             # Static assets, robots.txt, sitemap files
```

## Animation System

The page uses a GSAP-driven animation layer:

- **Lenis** provides physics-based smooth scrolling, hooked into `gsap.ticker` for frame-perfect sync.
- **ScrollTrigger** drives scroll-linked entrance animations on work items and sections.
- **SplitText** enables character-by-character text reveal effects.
- Work items use **clip-path** transitions for cinematic image reveals.
- The mobile menu uses staggered GSAP timelines for open/close.

## Deployment

The site is configured for deployment on **Vercel** at [swblends.com](https://swblends.com). The sitemap and `robots.txt` are auto-generated at build time via `next-sitemap`.
