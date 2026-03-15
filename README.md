<h1 align="center">resq.software</h1>

<p align="center">
  Marketing site for the ResQ autonomous drone disaster-response platform.
</p>

<p align="center">
  <a href="https://github.com/resq-software/landing/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/resq-software/landing/ci.yml?branch=main&label=ci&style=flat-square" alt="CI" />
  </a>
  <a href="https://resq.software">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fresq.software&style=flat-square&label=resq.software" alt="resq.software" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg?style=flat-square" alt="License: Apache-2.0" />
  </a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Stack](#stack)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The ResQ marketing and product site, deployed at [resq.software](https://resq.software). Built with Next.js 15 App Router, Tailwind CSS v4, and Bun. Includes MDX-powered docs pages, Sentry error monitoring, and performance observability via OpenTelemetry.

**Related projects:**

| Repo | Description |
|------|-------------|
| [resq-software/resQ](https://github.com/resq-software/resQ) | Core platform monorepo |
| [resq-software/ui](https://github.com/resq-software/ui) | Shared component library (`@resq-sw/ui`) |

---

## Stack

- [Next.js 15](https://nextjs.org/) — App Router, MDX pages, `next/image`
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) + [`@resq-sw/ui`](https://github.com/resq-software/ui) — component system
- [Bun](https://bun.sh/) — package manager and runtime
- [Sentry](https://sentry.io/) — error tracking and session replay
- [Biome](https://biomejs.dev/) — linting and formatting

---

## Quick Start

```sh
git clone https://github.com/resq-software/landing.git
cd landing
./scripts/setup.sh   # installs Nix + Docker; runs bun install
bun dev              # http://localhost:3000
```

Or without Nix:

```sh
bun install
bun dev
```

---

## Configuration

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SENTRY_DSN` | No | Sentry DSN for client-side error reporting |
| `SENTRY_AUTH_TOKEN` | Build-time | Uploads source maps to Sentry on `bun build` |
| `SENTRY_ORG` | Build-time | Sentry organisation slug |
| `SENTRY_PROJECT` | Build-time | Sentry project slug |

All env vars are validated at build time via [`@t3-oss/env-nextjs`](https://env.t3.gg/).

---

## Deployment

Production deploys to Vercel automatically on merge to `main`.

Required repository secrets:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel organisation ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `SENTRY_AUTH_TOKEN` | Source map upload token |

### Docker (local preview / self-hosting)

```sh
docker build \
  --build-arg NEXT_PUBLIC_SENTRY_DSN=your_dsn \
  -t resq-landing .

docker run -p 3000:3000 resq-landing
```

---

## Contributing

**Local setup:**

```sh
git clone https://github.com/resq-software/landing.git
cd landing
./scripts/setup.sh
```

**Run checks:**

```sh
bun lint     # Biome lint
bun check    # Biome format + lint
bun build    # production build (validates env vars at startup)
```

**Commit convention:** This project uses [Conventional Commits](https://www.conventionalcommits.org/).

| Prefix | Effect |
|--------|--------|
| `feat:` | New page or feature |
| `fix:` | Bug fix |
| `content:` | Copy or asset update |
| `chore:` / `ci:` | Tooling, no user-visible change |

---

## License

Copyright 2026 ResQ

Licensed under the [Apache License, Version 2.0](./LICENSE).
