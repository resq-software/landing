/**
 * Declares static application metadata that is safe to embed across server and
 * client code.
 */
import packageJson from "../../package.json";

/**
 * Captures the product identity values shared across metadata, config, and UI.
 */
export const app = {
  name: "ResQ",
  description: "Autonomous drone response for disasters.",
  url: "https://resq.software",
  version: packageJson.version,
} as const;
