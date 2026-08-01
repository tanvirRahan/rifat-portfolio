# Portfolio Project — Coding Rules

## Language & Comments
- All code comments MUST be in English — no Bengali/Bangla inside code files.
- Comments should be concise, useful, and explain "why" not "what".
- Use JSDoc (`/** */`) for component and function documentation.
- Avoid obvious comments like `// import React`.

## Naming Conventions
- **Components**: PascalCase → `HeroScene`, `ProjectCard`
- **Files**: Match component name → `HeroScene.tsx`
- **Variables/functions**: camelCase → `scrollProgress`, `handleSubmit`
- **Constants**: UPPER_SNAKE_CASE → `MAX_PROJECTS`, `API_URL`
- **CSS classNames**: Short, readable, lowercase with hyphens if custom → `hero`, `nav-link`, `card-grid`
- **IDs**: Short, descriptive, lowercase → `hero`, `about`, `contact-form`
- **Props interfaces**: `ComponentNameProps` → `ButtonProps`, `ProjectCardProps`

## Code Style
- Use functional components with arrow functions or function declarations (be consistent).
- Use `export default function ComponentName()` pattern for page-level components.
- Keep components under 150 lines. If longer, split into smaller pieces.
- Prefer named exports for utilities and hooks, default exports for components.
- Use `@/` path alias for all imports from `src/`.
- Group imports: React → third-party → local components → local utils/hooks → styles.

## TypeScript
- Always define interfaces for component props.
- Use `interface` over `type` for object shapes.
- Avoid `any` — use `unknown` or proper types.
- Export shared types from a dedicated file when reused across 2+ files.

## Tailwind CSS (v4)
- Use Tailwind utility classes directly — avoid unnecessary custom CSS.
- Keep className strings readable; break into multiple lines if too long.
- Use the `cn()` utility from `@/utils/cn` for conditional classes.

## File Organization
- `components/layout/` — site-wide layout (Navbar, Footer, Cursor)
- `components/sections/` — page sections (Hero, About, Projects, Skills, Contact)
- `components/ui/` — small reusable UI pieces (Button, Card, Badge)
- `three/scenes/` — R3F 3D scene components
- `three/shaders/` — custom GLSL shader files
- `data/` — static data arrays and type definitions
- `hooks/` — custom React hooks
- `utils/` — pure helper functions
- `styles/` — global CSS and Tailwind theme

## Performance
- Lazy-load heavy components (3D scenes) with `React.lazy()` + `Suspense`.
- Use `useMemo` / `useCallback` only when there's a measurable benefit.
- Avoid inline object/array creation in JSX props inside render loops.

## Resume Rewriting Rules
- **ATS-Friendly Formatting**: Structure the resume systematically matching the provided sample. Focus on clarity and readability.
- **Tone & Voice (CRITICAL)**: The tone MUST be 100% human, grounded, and match the sample exactly. Do NOT use robotic fluff (e.g., "spearheaded", "delved", "synergized"). Use simple, direct, professional language like the sample.
- **Action-Oriented**: Start every experience and project bullet point with a strong, grounded action verb (e.g., Built, Developed, Designed, Orchestrated).
- **Data Gathering (Holistic)**: NEVER rely solely on the old PDF CV. Always cross-check the system's source code (e.g., `projects.ts`, `Skills.tsx`, About section) to extract the most accurate, up-to-date technologies and achievements.
- **Terminology**: Replace "Data Engineering" with "Data Automation" as per user preference. Include practical automation tasks (e.g., Python scripts for manual work, ETL pipelines).
- **Quality Standard**: The final resume must be identical to or superior to the sample in terms of conciseness, impact, and phrasing. I must enforce these rules automatically without the user needing to repeat them.
- **Step-by-Step Workflow**: Always draft resume content phase-by-phase in Markdown for user review before compiling into LaTeX. Do not generate the entire document at once.
