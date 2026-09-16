---
kind: build_system
name: Vite + TypeScript Build Pipeline for React Frontend
category: build_system
scope:
    - '**'
source_files:
    - app/package.json
    - app/vite.config.ts
    - app/tsconfig.json
    - app/index.html
---

## Build System Overview

This repository is a single-frontend project built with **Vite** and **TypeScript**, producing a static React application. There is no Dockerfile, CI/CD pipeline, Makefile, or release automation in the repository — build and packaging are handled entirely through npm scripts and Vite's built-in bundler.

## Key Files and Scripts

- `app/package.json` — defines the build entry points:
  - `npm run dev` → runs `vite` (development server with HMR)
  - `npm run build` → runs `tsc && vite build` (type-check then bundle to `app/dist/`)
  - `npm run preview` → serves the production build locally via `vite preview`
- `app/vite.config.ts` — configures Vite with the React plugin, Tailwind CSS v4 (`@tailwindcss/vite`), and an `@` path alias resolving to `./src`.
- `app/tsconfig.json` — TypeScript configured with `target: es2023`, `module: esnext`, `moduleResolution: bundler`, `noEmit: true` (Vite handles emission), strict mode enabled, JSX transform set to `react-jsx`, and path mapping `@/*` → `./src/*`.
- `app/index.html` — HTML entry point referenced by Vite.
- `app/dist/` — output directory for the production build (created by `vite build`).

## Architecture and Conventions

- **Build toolchain**: Vite is the sole bundler; TypeScript compilation is delegated to `tsc` purely for type-checking before bundling (`noEmit: true` in tsconfig). The build command chains both steps: `tsc && vite build`.
- **Plugin ecosystem**: React Fast Refresh via `@vitejs/plugin-react`; Tailwind CSS v4 integrated via `@tailwindcss/vite` (no separate PostCSS config needed).
- **Module resolution**: Uses modern `bundler` module resolution and ESM (`"type": "module"`); path aliases `@/*` are defined in both `tsconfig.json` and `vite.config.ts` for consistency between editor/type-checker and runtime.
- **Output**: Static assets under `app/dist/`, intended to be served as a SPA (routing handled client-side by `wouter`).
- **Versioning**: Package version is hardcoded to `0.0.0` in `package.json`; there is no automated version bumping script or changelog generation.

## Conventions and Constraints

- Development uses `npm run dev` which starts Vite's dev server with hot module replacement.
- Production builds require Node.js with ESM support (project is marked `"type": "module"`).
- TypeScript must pass type checking before the Vite build succeeds because `build` runs `tsc` first.
- No environment-specific build configurations exist (no `.env` handling, no `--mode` usage in scripts) — all configuration lives in `vite.config.ts`.
- There is no containerization, CI/CD pipeline, artifact publishing, or deployment script present in this repository.

## Notable Absences

- No `Dockerfile`, `docker-compose.yml`, or container build instructions.
- No GitHub Actions, CircleCI, Jenkinsfile, or any CI configuration.
- No `Makefile`, shell-based build/deploy scripts, or release automation.
- No package publishing to npm (the package is marked `private: true`).
- No source map or asset optimization overrides beyond default Vite behavior.