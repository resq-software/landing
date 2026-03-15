---
name: lint
description: Run Biome lint and format check across all source files.
---

# /lint

Lint the ResQ landing site.

## Steps

1. Run `bun lint` (Biome check).
2. Run `bun check` (Biome format + lint combined).
3. Report all rule violations with file, line, rule name, and suggested fix.
4. Do NOT auto-apply fixes — show the diff and ask for confirmation first.
