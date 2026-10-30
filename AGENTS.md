# Repository Guidelines

## Project Structure & Module Organization

This repository contains a bilingual Astro portfolio. `src/pages/` defines Japanese routes and English routes under `en/`. Shared UI lives in `src/components/`, the page shell in `src/layouts/`, and styles in `src/styles/`. Static images belong in `public/`.

Portfolio entries and profile sections live in `src/content/{works,about}/{ja,en}/`. Their schemas are in `src/content.config.ts`. UI translations belong in `src/i18n/`; site constants belong in `src/site.config.ts`. `src/lib/content.ts` handles localized content and Japanese fallback. `src/opencv/` is a separate Python experiment with its own `pyproject.toml` and uv lockfile.

## Build, Test, and Development Commands

Use Node.js 22, matching the GitHub Actions workflow.

- `npm ci`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Astro development server.
- `npm run build`: generate the production site in `dist/` and validate content against its schemas.
- `npm run preview`: serve the generated build for local review.

GitHub Actions builds and deploys pushes to `main` to GitHub Pages. Deployment defaults to `/portfolio`; override `SITE_URL` and `BASE_PATH` when targeting another host.

## Coding Style & Naming Conventions

Follow existing two-space indentation, single-quoted TypeScript strings, and semicolons. TypeScript extends Astro’s strict configuration. Use PascalCase for Astro components, descriptive camelCase for functions, and existing lowercase route and content filenames. No formatter or linter is currently configured.

Use the helpers in `src/i18n/ui.ts` for translations and base-prefixed asset URLs. Keep matching translated work entries on the same frontmatter `slug`. Team projects require a nonempty `responsibility` field.

## Testing Guidelines

There is no automated test framework, test naming convention, or coverage threshold configured. Run `npm run build` before submitting changes. Preview affected Japanese and English pages, checking language switching, fallback content, links under `/portfolio`, and responsive layouts. For visual changes, inspect both desktop and mobile widths.

## Commit & Pull Request Guidelines

Recent commits use short, descriptive Japanese or English subjects without a consistent prefix convention. Follow that style and keep each commit focused.

Pull requests should explain the change, identify affected routes or content, link related issues when applicable, and report validation performed. Include screenshots for layout or visual changes. Do not commit generated `dist/`, `.astro/`, dependencies, or environment files.
