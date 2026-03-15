"use server";

import { actionClient } from "@/actions/shared/safe-action";
/**
 * Defines the server action used by the marketing contact form.
 */
import { contactFormSchema } from "@/lib/validation/form-schema";

// TODO: Replace with real submission — Resend, Mailchimp, or webhook
// For now, simulates success after 1s delay
/**
 * Validates and handles contact form submissions from the marketing site.
 */
export const serverAction = actionClient
  .inputSchema(contactFormSchema)
  .action(async ({ parsedInput }) => {
    // Simulate network latency — no real backend yet.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("[ResQ] Access request received:", parsedInput);
    return {
      success: true,
      message: "Request received",
    };
  });
