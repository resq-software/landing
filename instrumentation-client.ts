/**
 * Initializes browser-side Sentry instrumentation for the Next.js app.
 */
import * as Sentry from "@sentry/nextjs";

import { config } from "@/config/config";

/**
 * Defines the client-only Sentry options used by the browser bundle.
 */
const clientSentryOptions = {
  dsn: config.sentry.dsn,
  tracesSampleRate: 1,
  replaysOnErrorSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  integrations: [Sentry.replayIntegration()],
  tunnel: "/monitoring",
  debug: false,
};

if (config.sentry.dsn) {
  Sentry.init(clientSentryOptions);
}
