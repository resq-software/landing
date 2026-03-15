# ResQ Landing — Agent Guide

## Mission
Public-facing marketing and documentation site for the ResQ platform. Built with Next.js 15 (App Router), deployed to Cloudflare Workers via `wrangler`. Optimised for Core Web Vitals and edge performance.

## Workspace Layout
- `src/app/` — Next.js App Router pages and layouts.
- `src/components/` — Shared UI components (shadcn-based, Tailwind CSS v4).
- `src/features/` — Feature-scoped components and logic.
- `src/actions/` — Server Actions.
- `src/lib/` — Utility functions and shared helpers.
- `src/config/` — Site-wide constants and environment config.
- `src/styles/` — Global CSS and Tailwind configuration.
- `public/` — Static assets (images, fonts, icons).
- `docs/` — Internal documentation and specs.

## Commands
```bash
bun dev                   # Dev server on port 3000 (Turbopack)
bun build                 # Production build
bun lint                  # Biome check
bun format                # Biome auto-format
bun test --coverage       # Vitest with coverage
./agent-sync.sh --check   # Verify AGENTS.md and CLAUDE.md are in sync
```

## Architecture
- **Framework**: Next.js 15, App Router, React 19.
- **Styling**: Tailwind CSS v4 — all config lives in `src/styles/globals.css`.
- **Deployment**: Cloudflare Workers via `wrangler.jsonc`; `next-on-pages` adapter.
- **Instrumentation**: Split across `instrumentation-client.ts`, `instrumentation-server.ts`, `instrumentation-edge.ts` for runtime-specific init.
- **Components**: Radix UI primitives + `class-variance-authority` variants; `cn()` from `src/lib/utils`.

## Standards
- Use Server Components by default; add `"use client"` only when needed.
- Images via `next/image`; fonts via `next/font`.
- All environment variables validated in `src/env.ts` using `@t3-oss/env-nextjs`.
- Linting and formatting via Biome (`biome.json`) — no ESLint/Prettier.
- All source files carry the Apache-2.0 license header.
- Keep `AGENTS.md` and `CLAUDE.md` in sync using `./agent-sync.sh`.

## Repository Rules
- Do not commit `node_modules/` or `.next/`.
- Keep `wrangler.jsonc` routes in sync with `src/app/` structure.
- Lighthouse CI gates: LCP < 2.5s, CLS < 0.1, TBT < 200ms.

## References
- [Root README](README.md)
- [Next.js Config](next.config.ts)
- [Wrangler Config](wrangler.jsonc)
