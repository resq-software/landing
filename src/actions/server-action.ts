"use server";
import { actionClient } from "./safe-action";

import { contactFormSchema } from "@/lib/form-schema";

// TODO: Replace with real submission — Resend, Mailchimp, or webhook
// For now, simulates success after 1s delay
export const serverAction = actionClient
  .inputSchema(contactFormSchema)
  .action(async ({ parsedInput }) => {
    // Simulate network latency — no real backend yet.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // eslint-disable-next-line no-console
    console.log("[ResQ] Access request received:", parsedInput);
    return {
      success: true,
      message: "Request received",
    };
  });
