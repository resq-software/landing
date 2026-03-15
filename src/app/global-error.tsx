"use client";

/**
 * Renders the application-wide error boundary when the root layout fails.
 */
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Displays a fatal application error state when the root App Router tree fails
 * to render.
 *
 * @param props - Error boundary controls from Next.js.
 * @param props.error - The root-level error that was captured.
 * @param props.reset - Callback that retries the failed render.
 * @returns A full-document fallback UI for unrecoverable render failures.
 */
export default function GlobalError({
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
    <html lang="en">
      <body className="bg-background text-foreground">
        <div className="container flex min-h-screen flex-col items-center justify-center gap-4 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
            Critical Error
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            The app failed to render.
          </h1>
          <p className="max-w-xl text-muted-foreground">
            A global rendering error was captured. Retry the render or reload
            the page.
          </p>
          <Button onClick={() => reset()}>Retry render</Button>
        </div>
      </body>
    </html>
  );
}
