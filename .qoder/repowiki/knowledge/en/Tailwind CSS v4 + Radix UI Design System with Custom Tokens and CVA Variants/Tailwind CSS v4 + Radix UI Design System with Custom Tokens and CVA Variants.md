---
kind: frontend_style
name: Tailwind CSS v4 + Radix UI Design System with Custom Tokens and CVA Variants
category: frontend_style
scope:
    - '**'
source_files:
    - app/src/index.css
    - app/vite.config.ts
    - app/package.json
    - app/src/lib/utils.ts
    - app/src/components/ui/button.tsx
    - app/src/components/layout/Layout.tsx
---

## What system/approach is used

The frontend styling system is built on **Tailwind CSS v4** (via `@tailwindcss/vite` plugin) combined with **Radix UI primitives** for accessible, unstyled base components. Visual presentation is achieved through utility-first CSS classes applied directly in JSX, with a centralized design token layer defined via Tailwind's `@theme` block. Component-level variants are managed using **Class Variance Authority (CVA)** together with **clsx** and **tailwind-merge** for conditional class composition.

## Key files and packages

- `app/src/index.css` — global theme tokens, base styles, custom keyframe animations, scrollbar overrides, and reduced-motion handling
- `app/vite.config.ts` — Vite config that registers the `@tailwindcss/vite` plugin and sets up the `@/src` path alias
- `app/package.json` — declares Tailwind v4, Radix UI primitives (`@radix-ui/*`), `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react` icons, `sonner` toasts, and `recharts`
- `app/src/lib/utils.ts` — shared `cn()` helper that merges class names via `twMerge(clsx(...))`; also centralizes formatting utilities (`formatCurrency`, `formatPercent`, `formatDate`, `formatNumber`)
- `app/src/components/ui/button.tsx` — canonical example of a CVA-driven component exposing `variant` and `size` prop combinations
- `app/src/components/layout/Layout.tsx` — layout shell demonstrating responsive behavior, sidebar collapse, sticky header, backdrop blur, and consistent use of design tokens
- `app/src/components/ui/badge.tsx`, `card.tsx` — additional primitive UI components following the same pattern

## Architecture and conventions

### Design tokens
All colors, fonts, and semantic tokens live in `index.css` under a single `@theme` block. The palette is organized into:
- Semantic roles: `--color-ink` (text), `--color-muted` (secondary text), `--color-canvas` (page background), `--color-surface` (card/header background), `--color-line` (borders/dividers)
- Status signals: `--color-signal` (brand accent), `--color-success`, `--color-danger`, `--color-warning` plus their `-soft` tints for backgrounds
- Accent colors: `--color-violet`, `--color-blue`, `--color-teal`, `--color-emerald`, `--color-pink`

Typography uses `Plus Jakarta Sans` as the sans-serif font family, applied globally via `body { font-family: var(--font-sans); }`.

### Component styling pattern
Reusable UI primitives in `components/ui/` follow a consistent recipe:
1. Define a `cva()` variant map describing all visual permutations (e.g., `buttonVariants` with `default|signal|outline|ghost|link|destructive` variants and `default|sm|lg|icon` sizes).
2. Wrap the component in `React.forwardRef` so it can be composed with Radix `Slot` when needed (`asChild` prop).
3. Merge incoming `className` with the generated variant classes via the shared `cn()` helper from `@/lib/utils`.
4. Expose both the component and its underlying `variants` object for programmatic reuse.

This pattern is demonstrated in `button.tsx` and replicated across other `ui/` primitives.

### Layout and page structure
- `Layout.tsx` provides a full-page shell with a collapsible sidebar (responsive: `ml-[68px]` vs `ml-[240px]`) and a sticky top bar with search, notifications, and user avatar.
- Pages under `pages/` compose `Layout` and render domain-specific content; they rely entirely on Tailwind utility classes rather than per-page stylesheets.
- Icons come exclusively from `lucide-react`.

### Animations and motion
Custom keyframes (`rise-in`, `fade-in`, `slide-in-right`) are declared in `index.css` and exposed as utility classes (`.animate-rise-in`, `.animate-fade-in`, `.animate-slide-in-right`). A `prefers-reduced-motion` media query disables all animations and transitions by forcing durations to `0.01ms`, ensuring accessibility compliance.

### Global polish
- Scrollbars are styled via vendor-prefixed pseudo-elements (`::-webkit-scrollbar*`) for a thin 6px track with rounded thumb.
- Body defaults set `background-color: var(--color-canvas)` and `color: var(--color-ink)` with font smoothing enabled.

## Conventions and constraints

- **No SCSS/SASS**: Styling is pure CSS imported via Tailwind v4's `@import "tailwindcss"` directive; no preprocessor configuration exists.
- **No CSS modules or scoped styles**: All styling is done through Tailwind utility classes and the global `@theme` token system.
- **Tokens over hard-coded values**: Colors, spacing, and typography should reference the CSS variables defined in `@theme` (e.g., `bg-canvas`, `text-ink`, `border-line`) rather than arbitrary hex values.
- **Component variants via CVA**: New UI primitives must define their visual states through `class-variance-authority` variant maps instead of ad-hoc conditional className logic.
- **Class merging via `cn()`**: All component `className` props must be passed through the shared `cn()` helper from `@/lib/utils` to guarantee conflict resolution with `tailwind-merge`.
- **Accessible primitives via Radix**: Interactive elements (dialogs, dropdowns, tabs, tooltips, selects, etc.) are built on `@radix-ui/*` primitives; styling is layered on top rather than re-implemented.
- **Responsive breakpoints**: The codebase relies on Tailwind's default breakpoint scale (e.g., `sm:block`, `lg:hidden`) rather than custom media queries.
- **Iconography**: Only `lucide-react` icons are used throughout the app; no inline SVGs or icon fonts are introduced outside this library.