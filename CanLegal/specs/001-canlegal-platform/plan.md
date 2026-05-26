# Implementation Plan: CanLegal Global Education Platform

**Branch**: `[001-canlegal-platform]` | **Date**: 2026-05-20 | **Spec**: [specs/001-canlegal-platform/spec.md](specs/001-canlegal-platform/spec.md)

**Input**: Feature specification from `/specs/001-canlegal-platform/spec.md`

## Summary

Build a premium educational landing page and interactive information platform about global cannabis policy. Use a static-first Next.js App Router architecture with strong accessibility, SEO, and performance. Focus on interactive map, filters, country detail views, timeline, and educational sections with reusable components and a clear data model.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20 LTS

**Primary Dependencies**: Next.js (App Router), React 18, Tailwind CSS, Framer Motion, shadcn/ui, local SVG/GeoJSON map rendering, Recharts (charts)

**Storage**: Static JSON datasets in repo

**Testing**: Vitest + React Testing Library (unit), Playwright (e2e), axe-core (a11y checks)

**Target Platform**: Modern browsers, mobile-first

**Project Type**: Web application (static-first)

**Performance Goals**: LCP < 2.5s, INP < 200ms, CLS < 0.1 on typical mobile

**Constraints**: No auth, no user data storage, minimal runtime services, data update via JSON

**Scale/Scope**: 200+ countries/regions, multiple datasets, multilingual-ready structure

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Education-only framing with explicit separation from advocacy
- Evidence and data provenance visible in UI
- WCAG-oriented accessibility and reduced motion support
- Performance budgets and lazy loading for heavy assets
- Consistent design system and scalable content structure
- Security and privacy defaults, semantic HTML and SEO

## Project Structure

### Documentation (this feature)

```text
specs/001-canlegal-platform/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Data sources and policy references
├── data-model.md        # Dataset schema and validation rules
├── quickstart.md        # How to run and update data
├── contracts/           # Data contracts for JSON schemas
└── tasks.md             # Task breakdown (created by /speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── layout.tsx
├── page.tsx
├── countries/
│   └── [code]/
│       └── page.tsx
├── sitemap.ts
└── robots.ts

components/
├── sections/
│   ├── Hero.tsx
│   ├── StatusOverview.tsx
│   ├── Education.tsx
│   ├── Timeline.tsx
│   ├── Statistics.tsx
│   ├── Highlights.tsx
│   └── Faq.tsx
├── map/
│   ├── WorldMap.tsx
│   ├── MapLegend.tsx
│   └── MapTooltip.tsx
├── cards/
│   ├── CountryCard.tsx
│   └── PolicyCard.tsx
└── ui/                   # shadcn/ui components

content/
├── glossary.json
└── copy.json

data/
├── countries.json
├── policy-status.json
├── timeline.json
├── statistics.json
└── highlights.json

lib/
├── data/
│   ├── loaders.ts
│   ├── validators.ts
│   └── selectors.ts
├── filters.ts
├── seo.ts
└── constants.ts

styles/
└── globals.css

public/
├── images/
└── icons/
```

**Structure Decision**: Single Next.js App Router project with a dedicated data layer, reusable section components, and JSON content separated from UI logic.

## Architecture Decisions

- **Routing**: Landing page at `/`, optional country detail pages at `/countries/[code]` for SEO and deep links.
- **State Management**: Local component state + URL search params for filters and search, enabling shareable URLs without global stores.
- **Data Loading**: Static JSON loaded at build time, validated against lightweight schemas, with versioned metadata.
- **Map Strategy**: Self-contained SVG/GeoJSON choropleth with hover/focus tooltips and a list fallback when geo data is unavailable.
- **Charts**: Recharts with accessible labels, legends, and text alternatives.
- **Animations**: Framer Motion with reduced motion support; use section-level transitions and staggered reveals only where they add clarity.
- **Theming**: Tailwind + CSS variables for light/dark themes; ensure contrast parity and tokenized colors.
- **SEO**: Metadata per page, Open Graph, JSON-LD for content taxonomy, semantic headings and landmark regions.
- **Accessibility**: Keyboard navigation for map focus states, visible focus rings, aria labels for interactive controls.
- **Performance**: Lazy-load map and charts, optimize images, avoid layout shifts, minimize JS on first paint.

## Complexity Tracking

No constitution violations expected at this stage.
