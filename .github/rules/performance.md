---
name: performance
description: Web performance rules for the ResQ landing site.
---

# Performance Rules

## Images

- All images use `next/image` with explicit `width` and `height` or `fill` + a sized container.
- Hero images must specify `priority` prop.
- Use `webp` / `avif` formats — the Next.js image optimiser handles conversion.
- No inline SVGs larger than 2 KB — reference as `next/image` or external file.

## JavaScript Budget

- First Load JS per route: ≤ 150 kB (gzipped).
- Heavy libraries (charts, editors, maps) must be dynamically imported with `next/dynamic`.
- Use React Server Components by default. Add `"use client"` only when necessary.

## Fonts

- Fonts loaded via `next/font` — no external `<link>` tags to Google Fonts or CDNs.
- Subset fonts to used character sets.

## Core Web Vitals Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5 s |
| INP | < 200 ms |
| CLS | < 0.1 |

## Third-Party Scripts

- All third-party scripts use `next/script` with `strategy="lazyOnload"` unless genuinely critical.
- No blocking `<script>` tags in `_document` or layout.
