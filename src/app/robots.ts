/**
 * Generates the robots metadata served by the App Router metadata system.
 */
import type { MetadataRoute } from "next";

import { config } from "@/config/config";

/**
 * Builds the crawl policy for search engines and references the generated
 * sitemap.
 *
 * @returns The robots metadata for the site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${config.app.url}/sitemap.xml`,
    host: config.app.url,
  };
}
