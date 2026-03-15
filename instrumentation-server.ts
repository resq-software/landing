/**
 * Initializes Sentry for the Node.js runtime used by Next.js server handlers.
 */
import * as Sentry from "@sentry/nextjs";

import { config } from "@/config/config";

/**
 * Captures the shared server-side Sentry options for the Node runtime.
 */
const serverSentryOptions = {
  dsn: config.sentry.dsn,
  tracesSampleRate: 1,
  debug: false,
};

if (config.sentry.dsn) {
  Sentry.init(serverSentryOptions);
}
