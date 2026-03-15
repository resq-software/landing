/**
 * Defines and validates the runtime environment used by the Next.js
 * application.
 */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Validates server-only environment variables that should never be exposed to
 * the browser.
 */
const serverEnvSchema = {
  NODE_ENV: z.enum(["development", "test", "production"]),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  VERCEL_GIT_COMMIT_SHA: z.string().optional(),
};

/**
 * Validates browser-safe environment variables exposed through Next.js.
 */
const clientEnvSchema = {
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_VERCEL_ENV: z.string().optional(),
};

/**
 * Captures the raw runtime environment values consumed by the typed env layer.
 */
const runtimeEnv = {
  NODE_ENV: process.env.NODE_ENV,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
};

/**
 * Provides a single typed interface for all environment variables referenced by
 * the app.
 */
export const env = createEnv({
  server: serverEnvSchema,
  client: clientEnvSchema,
  runtimeEnv,
});

export default env;
