---
name: components
description: Component authoring rules for the ResQ landing site.
---

# Component Rules

## Server vs Client

- Default to React Server Components (RSC). Only add `"use client"` when the component uses hooks, browser APIs, or event handlers.
- Never import a `"use client"` component into an RSC that is statically rendered — it opts the whole subtree into client rendering.

## Accessibility

- All interactive elements (`button`, `a`, `input`) must have accessible labels (visible text, `aria-label`, or `aria-labelledby`).
- Colour contrast must meet WCAG AA (4.5:1 for normal text, 3:1 for large text).
- All images need meaningful `alt` text. Decorative images use `alt=""`.
- Focus order must be logical — do not use `tabindex > 0`.

## Tailwind

- Use design tokens (CSS custom properties) from `@resq-sw/ui/styles/globals.css` — do not hardcode colours.
- `cn()` for all conditional class merging.
- Do not use `@apply` — compose via JSX className props.

## Metadata

- Every `page.tsx` must export `generateMetadata` or a static `metadata` object.
- OG images are generated via `@vercel/og` (`app/og/route.tsx`).
- Canonical URLs are set in metadata.
