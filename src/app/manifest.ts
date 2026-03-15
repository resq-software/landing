/**
 * Generates the web app manifest served by the App Router metadata system.
 */
import type { MetadataRoute } from "next";

import { config } from "@/config/config";

/**
 * Builds the manifest metadata for installable browser experiences.
 *
 * @returns The manifest consumed by supporting browsers and devices.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: config.app.name,
    short_name: config.app.name,
    description: config.app.description,
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0ea5e9",
  };
}
