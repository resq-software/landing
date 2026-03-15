/**
 * Registers server-side observability hooks for Sentry and Vercel OpenTelemetry.
 */
import * as Sentry from "@sentry/nextjs";
import type { Configuration } from "@vercel/otel";
import { registerOTel } from "@vercel/otel";

import { config } from "@/config/config";

/**
 * Identifies the auto-discovered client instrumentation module that Next.js
 * should load for browser-side Sentry setup.
 */
const CLIENT_INSTRUMENTATION_MODULE = "../instrumentation-client";

/**
 * Determines whether production-only telemetry should be enabled.
 *
 * @returns Whether the current deployment should register production
 * observability services.
 */
const isProductionDeployment = () =>
  config.vercel.env === "production" || process.env.NODE_ENV === "production";

/**
 * Registers OpenTelemetry for server and edge runtimes when production
 * observability is enabled.
 *
 * @param runtime - The Next.js runtime currently being initialized.
 */
const initializeOpenTelemetry = (runtime: string | undefined): void => {
  if (!isProductionDeployment()) {
    return;
  }

  registerOTel({
    serviceName: "resq-landing",
    instrumentations: runtime === "edge" ? [] : undefined,
    instrumentationConfig: {
      fetch: {
        resourceNameTemplate: "{http.method} {http.host}{http.target}",
      },
    },
  } satisfies Configuration);
};

/**
 * Loads the appropriate Sentry runtime module for the active Next.js runtime.
 *
 * @param runtime - The active Next.js runtime identifier.
 * @returns A promise that resolves once the relevant Sentry module has loaded.
 */
const loadSentryConfig = async (runtime: string | undefined): Promise<void> => {
  if (!config.sentry.dsn) {
    return;
  }

  // Next.js auto-discovers the root client module for browser instrumentation.
  void CLIENT_INSTRUMENTATION_MODULE;

  if (runtime === "edge") {
    await import("../instrumentation-edge");
    return;
  }

  await import("../instrumentation-server");
};

/**
 * Registers all server-side instrumentation hooks exposed to Next.js.
 *
 * @returns A promise that resolves once runtime instrumentation has been set up.
 * @throws {Error} Throws when instrumentation initialization fails.
 */
export const register = async (): Promise<void> => {
  const runtime = process.env.NEXT_RUNTIME;

  try {
    initializeOpenTelemetry(runtime);
    await loadSentryConfig(runtime);
  } catch (error) {
    const reason = error instanceof Error ? error : new Error(String(error));

    console.error(`[Instrumentation:${runtime || "unknown"}]`, reason);
    Sentry.captureException(reason);
    throw new Error(
      `Instrumentation initialization failed: ${reason.message}`,
      {
        cause: reason,
      },
    );
  }
};

/**
 * Forwards request-scoped errors to Sentry's request error capture helper.
 */
export const onRequestError = Sentry.captureRequestError;
