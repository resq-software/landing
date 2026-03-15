/**
 * Configures Next.js, MDX support, and Sentry build-time integrations for the
 * marketing site.
 */
import createMDX from "@next/mdx";
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

import "./src/env";

/**
 * Adds a minimal baseline of security-related response headers to every route.
 */
const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

/**
 * Captures the base Next.js configuration before MDX and Sentry wrappers are
 * applied.
 */
const baseConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

/**
 * Enables MDX files as route-capable page extensions.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/**
 * Controls Sentry's build-time behavior, including source map upload and the
 * browser tunnel route.
 */
const sentryConfig = {
  org: process.env.SENTRY_ORG || "resq-software-n9",
  project: process.env.SENTRY_PROJECT || "landing",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: process.env.NODE_ENV !== "development",
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
};

/**
 * Represents the Next.js config after MDX support has been layered in.
 */
const mdxConfig = withMDX(baseConfig);

/**
 * Exports the final Next.js configuration, optionally wrapped with Sentry when
 * an auth token is available for release and source map management.
 */
const nextConfig = process.env.SENTRY_AUTH_TOKEN
  ? withSentryConfig(mdxConfig, sentryConfig)
  : mdxConfig;

export default nextConfig;
