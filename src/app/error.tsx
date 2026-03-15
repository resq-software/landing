"use client";

/**
 * Renders the route-level error boundary for recoverable application failures.
 */
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Displays a recoverable error state for the current route segment.
 *
 * @param props - Error boundary controls from Next.js.
 * @param props.error - The error that was thrown while rendering or loading.
 * @param props.reset - Callback that retries rendering the current route.
 * @returns A retryable route error UI.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
        Application Error
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">
        Something broke.
      </h1>
      <p className="max-w-xl text-muted-foreground">
        The request failed unexpectedly. The error has been captured and you can
        retry the page.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
