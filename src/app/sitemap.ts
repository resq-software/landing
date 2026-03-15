/**
 * Generates the static sitemap metadata for the marketing routes.
 */
import type { MetadataRoute } from "next";

import { config } from "@/config/config";

/**
 * Lists the canonical app routes that should appear in the generated sitemap.
 */
const routes = ["", "/about", "/contact", "/features", "/use-cases"];

/**
 * Builds sitemap entries for the static marketing pages.
 *
 * @returns The sitemap metadata served by Next.js.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${config.app.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
