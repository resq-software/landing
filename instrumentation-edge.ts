/**
 * Initializes Sentry for edge-executed Next.js features such as proxy and edge
 * route handlers.
 */
import * as Sentry from "@sentry/nextjs";

import { config } from "@/config/config";

/**
 * Captures the shared Sentry options for edge runtime instrumentation.
 */
const edgeSentryOptions = {
  dsn: config.sentry.dsn,
  tracesSampleRate: 1,
  debug: false,
};

if (config.sentry.dsn) {
  Sentry.init(edgeSentryOptions);
}
