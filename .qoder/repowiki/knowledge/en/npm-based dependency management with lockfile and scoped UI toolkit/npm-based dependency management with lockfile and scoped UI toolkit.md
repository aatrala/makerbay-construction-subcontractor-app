---
kind: dependency_management
name: npm-based dependency management with lockfile and scoped UI toolkit
category: dependency_management
scope:
    - '**'
source_files:
    - app/package.json
    - app/package-lock.json
    - app/vite.config.ts
    - app/tsconfig.json
---

## What system/approach is used

This repository is a single-tenant React + Vite frontend application located under `app/`. Dependency management is handled entirely by npm (the default Node.js package manager), using the standard `package.json` manifest plus a committed `package-lock.json` lockfile. There is no vendoring, no private registry configuration, and no monorepo tooling — all third-party packages are resolved directly from the public npm registry.

The build pipeline (`dev`, `build`, `preview`) is driven by Vite scripts in `package.json`; TypeScript compilation is invoked via `tsc` as part of the build step but configured with `noEmit: true`, so it acts only as a type-checker while Vite handles bundling.

## Key files and packages

- `app/package.json` — declares runtime dependencies and dev dependencies; defines the project name `app`, marks it as `private`, sets `"type": "module"`, and exposes three npm scripts (`dev`, `build`, `preview`).
- `app/package-lock.json` — lockfile version 3 that pins every transitive dependency to an exact version and records integrity hashes, ensuring reproducible installs across environments.
- `app/vite.config.ts` — configures Vite plugins (`@vitejs/plugin-react`, `@tailwindcss/vite`) and sets up an `@/*` path alias pointing at `./src`, which is mirrored in `tsconfig.json`.
- `app/tsconfig.json` — enforces strict TypeScript mode, uses ES2023 target, `bundler` module resolution, and includes only `src` in compilation.

Runtime dependencies include:
- UI primitives: `react` ^19.3.0, `react-dom` ^19.3.0
- Headless component library: multiple `@radix-ui/react-*` packages (avatar, dialog, dropdown-menu, popover, progress, scroll-area, select, separator, slot, switch, tabs, tooltip)
- Styling: `tailwindcss` ^4.3.3, `@tailwindcss/vite` ^4.3.3, `class-variance-authority` ^0.7.1, `clsx` ^2.1.1, `tailwind-merge` ^3.6.0
- Icons: `lucide-react` ^1.45.0
- Charts: `recharts` ^3.10.1
- Notifications: `sonner` ^2.0.8
- Routing: `wouter` ^3.11.0

Dev dependencies include:
- `vite` ^8.3.0, `@vitejs/plugin-react` ^6.1.1
- `typescript` ~6.0.2, `@types/react` ^19.3.0, `@types/react-dom` ^19.3.0

## Architecture and conventions

- Single-package scope: All dependencies live in one flat `package.json` under `app/`. There are no nested `package.json` files per feature or page — pages, components, and utilities import from relative paths within `src/` rather than from separate packages.
- Scoped UI toolkit pattern: The UI layer is built on Radix Primitives (`@radix-ui/react-*`) wrapped into local reusable components under `app/src/components/ui/` (e.g., `button.tsx`, `card.tsx`, `badge.tsx`). This keeps the raw Radix API behind a stable internal surface while allowing consistent styling via Tailwind CSS and utility libraries like `class-variance-authority` and `clsx`.
- Version ranges use caret (^): All dependencies declare semver-compatible minor/patch updates via `^`, enabling automatic patch-level upgrades while pinning major versions. Dev dependencies follow the same convention except for TypeScript, which uses a tilde (~6.0.2) to restrict to the exact 6.0.x series.
- Lockfile-first reproducibility: The committed `package-lock.json` (lockfileVersion 3) guarantees that `npm ci` produces identical `node_modules` trees, including transitive dependencies and integrity checksums.
- No vendoring or private registries: There is no `.npmrc`, `.yarnrc`, `pnpm-workspace.yaml`, or vendored `node_modules` checked in. Packages resolve against the default npm registry.
- Path aliases: Both `vite.config.ts` and `tsconfig.json` define `@/*` -> `./src/*`, so imports throughout the codebase use absolute-style paths rooted at `src/` instead of deep relative paths.

## Conventions and constraints

Observed conventions (descriptive):
- Dependencies are split between `dependencies` (runtime) and `devDependencies` (build-time/tooling); nothing is placed in both categories.
- The project is marked `private` in `package.json`, indicating it is not intended to be published to the npm registry.
- TypeScript is configured with `strict: true` and `skipLibCheck: true`, relying on the lockfile-pinned types rather than loose lib checks.
- Module syntax is ESM (`"type": "module"`, `module: "esnext"`, `moduleResolution: "bundler"`), and JSX is compiled with `react-jsx`.
- The build script chains `tsc && vite build`, meaning TypeScript type-checking runs before Vite's bundler; a type error will block the build.

Constraints enforced by the setup:
- Reproducible installs are enforced by the presence of `package-lock.json` (lockfileVersion 3) — any change to `package.json` should be accompanied by regenerating the lockfile.
- Only packages declared in `package.json` can be imported; there is no ad-hoc installation of undeclared modules.
- The `@/*` path alias is enforced by both the TypeScript compiler and Vite, so importing `@/components/ui/button` requires the alias to be configured (it is).

There is no evidence of automated dependency update tooling (e.g., Dependabot, Renovate), private npm registry configuration, or workspace/monorepo setup in this branch.