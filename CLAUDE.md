# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

-   `npm run dev` - Start development server with Turbopack for fast builds
-   `npm run build` - Build production application
-   `npm start` - Start production server
-   `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is a Next.js 15 application using the App Router pattern with a modern animation-focused portfolio website.

### Key Technologies & Libraries

-   **Next.js 15** with App Router and React 19
-   **TailwindCSS v4** for styling with custom CSS variables and dark mode support
-   **GSAP** for advanced animations including ScrollTrigger and SplitText plugins
-   **Lenis** for smooth scrolling implementation
-   **shadcn/ui** components (configured in `components.json`) with Radix UI primitives
-   **headless/ui** components for dropdowns and and selects
-   **Lucide React** icons

### Project Structure

-   `app/` - Next.js App Router pages and layouts
    -   `layout.js` - Root layout with Inter Tight font configuration
    -   `page.js` - Main portfolio page with GSAP animations and smooth scrolling
    -   `globals.css` - Custom TailwindCSS with extensive animation utilities and design tokens
-   `components/ui/` - Reusable UI components following shadcn/ui patterns
-   `lib/utils.js` - Utility functions including `cn()` for class merging
-   `assets/` - Image assets for portfolio work items

### Animation System

The main page uses a sophisticated GSAP-based animation system:

-   **ScrollTrigger** for scroll-based animations
-   **SplitText** for character-by-character text animations
-   **Lenis** integration for smooth scrolling with GSAP ticker
-   Work item animations with clip-path transitions and character reveals
-   Mobile menu animations with staggered effects

### Component Patterns

-   Uses shadcn/ui component structure with `cn()` utility for class merging
-   Components use `forwardRef` and accept `className` props for customization
-   Custom variants defined using `class-variance-authority` (cva)

### Import Aliases

Configured in `jsconfig.json`:

-   `@/` maps to project root
-   `@/components`, `@/lib`, `@/assets` for organized imports

### Styling Approach

-   TailwindCSS v4 with custom CSS variables for theming
-   Extensive use of CSS custom properties for color tokens
-   Dark mode support via `.dark` class
-   Custom animation utilities and glassmorphism effects
-   Responsive design with mobile-first approach
