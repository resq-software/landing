---
name: build
description: Run a production build to validate the site compiles and all env vars are present.
---

# /build

Production build of the ResQ landing site.

## Steps

1. Run `bun build`.
2. Report any TypeScript errors, missing env vars (caught by `@t3-oss/env-nextjs`), or broken imports.
3. Report bundle size for the largest chunks — flag any page route exceeding 150 kB (first load JS).
4. Do NOT deploy — building locally is a validation step only.
