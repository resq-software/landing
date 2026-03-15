"use client";

/**
 * Wraps the application in a `next-themes` provider.
 */
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

/**
 * Provides theme context and theme persistence for the React tree.
 *
 * @param props - The provider props accepted by `next-themes`.
 * @param props.children - The subtree that should receive theme context.
 * @returns The configured theme provider wrapper.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
