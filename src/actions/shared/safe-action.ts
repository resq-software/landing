/**
 * Creates the shared next-safe-action client used by server actions in the app.
 */
import { createSafeActionClient } from "next-safe-action";

/**
 * Exposes the default safe-action client configuration for the project.
 */
export const actionClient = createSafeActionClient();
