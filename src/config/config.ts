/**
 * Derives runtime-safe application configuration from static constants and the
 * validated environment layer.
 */
import { app } from "@/constants/app";
import { env } from "@/env";

/**
 * Exposes the normalized configuration values shared across the app and
 * observability setup.
 */
export const config = {
  app: {
    name: app.name,
    description: app.description,
    url: env.NEXT_PUBLIC_APP_URL || app.url,
    version: app.version,
  },
  sentry: {
    dsn: env.NEXT_PUBLIC_SENTRY_DSN || "",
  },
  vercel: {
    env: env.NEXT_PUBLIC_VERCEL_ENV || env.NODE_ENV,
    gitCommitSha: env.VERCEL_GIT_COMMIT_SHA || "",
  },
} as const;
