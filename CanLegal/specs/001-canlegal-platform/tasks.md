# Tasks: CanLegal Global Education Platform

**Input**: Design documents from `/specs/001-canlegal-platform/`

**Prerequisites**: plan.md, spec.md

**Tests**: Included because testing standards were explicitly requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base structure

- [ ] T001 Initialize Next.js App Router project at repo root with TypeScript
- [ ] T002 [P] Configure Tailwind CSS, global styles in styles/globals.css, and CSS variables for light/dark themes
- [ ] T003 [P] Add linting and formatting config (ESLint + Prettier)
- [ ] T004 [P] Add testing frameworks (Vitest, React Testing Library, Playwright, axe-core)
- [ ] T005 Create base folder structure per plan (app/, components/, data/, content/, lib/, public/)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that must be complete before any user story

- [ ] T006 Define JSON data schemas in specs/001-canlegal-platform/contracts/ (countries, status, timeline, statistics, glossary)
- [ ] T007 Implement data loaders in lib/data/loaders.ts
- [ ] T008 Implement data validators in lib/data/validators.ts
- [ ] T009 Implement selectors and filters in lib/data/selectors.ts and lib/filters.ts
- [ ] T010 Create SEO helpers in lib/seo.ts and metadata defaults in app/layout.tsx
- [ ] T011 Implement base layout, navigation, and section anchors in app/layout.tsx and app/page.tsx
- [ ] T012 Add reduced motion handling utilities and default motion settings

**Checkpoint**: Foundation ready - user story implementation can begin

---

## Phase 3: User Story 1 - Status Legal Global (Priority: P1) MVP

**Goal**: Visitors can view global legal status by country and filter by status/continent

**Independent Test**: Map or list view filters respond correctly to status/continent selection

### Tests for User Story 1

- [ ] T013 [P] [US1] Unit tests for filter logic in tests/unit/filters.test.ts
- [ ] T014 [P] [US1] E2E test for status filter + continent filter in tests/e2e/status-filters.spec.ts
- [ ] T015 [P] [US1] A11y smoke test for overview section in tests/a11y/overview.spec.ts

### Implementation for User Story 1

- [ ] T016 [P] [US1] Build StatusOverview section in components/sections/StatusOverview.tsx
- [ ] T017 [P] [US1] Build WorldMap wrapper with dynamic import in components/map/WorldMap.tsx
- [ ] T018 [P] [US1] Build MapLegend and MapTooltip in components/map/
- [ ] T019 [US1] Wire filters to map and overview cards in app/page.tsx
- [ ] T020 [US1] Add fallback list view for no-JS in components/sections/StatusOverview.tsx

**Checkpoint**: User Story 1 functional and testable independently

---

## Phase 4: User Story 2 - Country Details (Priority: P2)

**Goal**: Visitors can open a country card and read detailed legal info and sources

**Independent Test**: Selecting a country shows details with status, key facts, and sources

### Tests for User Story 2

- [ ] T021 [P] [US2] Unit tests for country selectors in tests/unit/countries.test.ts
- [ ] T022 [P] [US2] E2E test for country detail panel in tests/e2e/country-detail.spec.ts

### Implementation for User Story 2

- [ ] T023 [P] [US2] Build CountryCard component in components/cards/CountryCard.tsx
- [ ] T024 [US2] Build country detail panel or drawer in components/sections/StatusOverview.tsx
- [ ] T025 [US2] Add optional route /countries/[code]/page.tsx with SEO metadata
- [ ] T026 [US2] Add data provenance and last-updated fields to detail view

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Timeline (Priority: P3)

**Goal**: Visitors can explore a timeline of policy changes

**Independent Test**: Timeline renders events in order with clear labels

### Tests for User Story 3

- [ ] T027 [P] [US3] Unit tests for timeline ordering in tests/unit/timeline.test.ts

### Implementation for User Story 3

- [ ] T028 [P] [US3] Build Timeline section in components/sections/Timeline.tsx
- [ ] T029 [US3] Add timeline data rendering and filtering by status or region

**Checkpoint**: User Story 3 functional and testable independently

---

## Phase 6: User Story 4 - Educational Content (Priority: P4)

**Goal**: Visitors learn legal terms and context through educational sections and FAQ

**Independent Test**: Glossary and FAQ render correctly and are accessible

### Tests for User Story 4

- [ ] T030 [P] [US4] A11y test for educational sections in tests/a11y/education.spec.ts

### Implementation for User Story 4

- [ ] T031 [P] [US4] Build Education section in components/sections/Education.tsx
- [ ] T032 [P] [US4] Build FAQ section in components/sections/Faq.tsx
- [ ] T033 [US4] Add glossary content in content/glossary.json and copy in content/copy.json

**Checkpoint**: All user stories functional and independently testable

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements across multiple stories

- [ ] T034 [P] Add Statistics and Highlights sections in components/sections/
- [ ] T035 [P] Implement search by country/region with URL search params
- [ ] T036 Add chart components using Recharts with accessible labels
- [ ] T037 Add SEO metadata, Open Graph, and JSON-LD in app/ and lib/seo.ts
- [ ] T038 Run performance checks and optimize images and bundle splitting
- [ ] T039 Add dark mode toggle and persistence (if required) in app/layout.tsx
- [ ] T040 Update quickstart.md and data update workflow docs
- [ ] T041 Final a11y audit and reduced motion verification

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Blocks all user stories
- **User Stories (Phase 3-6)**: Can proceed after Phase 2; parallel by story
- **Polish (Phase 7)**: After core stories, or as needed
