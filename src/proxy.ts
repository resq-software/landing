/**
 * Applies lightweight edge-time security headers and request metadata to app
 * and API traffic.
 */
import { type NextRequest, NextResponse } from "next/server";

import { env } from "@/env";

/**
 * Lists path prefixes that should bypass proxy processing because they are
 * static or framework-managed assets.
 */
const publicAssetPrefixes = ["/_next", "/assets", "/favicon", "/pwa"];

/**
 * Lists exact public asset paths that should not receive proxy processing.
 */
const publicAssetPaths = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
]);

/**
 * Determines whether the given pathname should bypass proxy processing.
 *
 * @param pathname - The incoming request pathname.
 * @returns Whether the request should be allowed through untouched.
 */
const shouldBypassProxy = (pathname: string) =>
  publicAssetPaths.has(pathname) ||
  publicAssetPrefixes.some((prefix) => pathname.startsWith(prefix)) ||
  /\.[a-z0-9]+$/i.test(pathname);

/**
 * Emits structured proxy logs outside of quiet production request paths.
 *
 * @param level - The console method to use.
 * @param message - The log message prefix.
 * @param data - Additional structured context.
 */
const safeLog = (
  level: "log" | "warn" | "error",
  message: string,
  data: Record<string, unknown> = {},
) => {
  if (env.NODE_ENV !== "production" || level !== "log") {
    console[level](`[Proxy] ${message}`, JSON.stringify(data));
  }
};

/**
 * Builds the Content Security Policy header value for the current request.
 *
 * @param nonce - The CSP nonce attached to the request.
 * @returns A CSP header string tailored to the current environment.
 */
const buildCsp = (nonce: string) => {
  const scriptSrc =
    env.NODE_ENV === "production"
      ? [`'self'`, `'nonce-${nonce}'`, "'strict-dynamic'"]
      : [`'self'`, "'unsafe-eval'", `'nonce-${nonce}'`, "'strict-dynamic'"];

  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.ingest.sentry.io https://*.sentry.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    env.NODE_ENV === "production" ? "upgrade-insecure-requests" : "",
  ]
    .filter(Boolean)
    .join("; ");
};

/**
 * Applies the proxy-managed security headers to the outgoing response.
 *
 * @param response - The response being prepared for the client.
 * @param nonce - The per-request CSP nonce.
 */
const applySecurityHeaders = (response: NextResponse, nonce: string): void => {
  response.headers.set("Content-Security-Policy", buildCsp(nonce));
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-DNS-Prefetch-Control", "on");
};

/**
 * Processes incoming requests that match the proxy config and injects request
 * metadata plus security headers.
 *
 * @param request - The incoming Next.js request object.
 * @returns The proxied or passthrough response.
 */
export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (shouldBypassProxy(pathname)) {
    return NextResponse.next();
  }

  const nonce = crypto.randomUUID().replaceAll("-", "");
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("x-url", pathname);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  applySecurityHeaders(response, nonce);
  response.headers.set("x-nonce", nonce);
  response.headers.set("x-url", pathname);

  safeLog("log", "processed request", { pathname });

  return response;
}

/**
 * Declares which request paths should be handled by the proxy.
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
