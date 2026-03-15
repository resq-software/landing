/**
 * Defines the validation contracts used by form-related actions and UI.
 */
import * as z from "zod";

/**
 * Represents the generic payload returned by typed form actions.
 *
 * @typeParam T - The shape of the validated input payload.
 */
export interface ActionResponse<T = unknown> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}

/**
 * Validates the early-access contact form fields sent from the marketing site.
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().min(2, "Organization is required"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().min(2, "Role is required"),
  message: z.string().optional(),
});

/**
 * Represents the validated values accepted by the contact form.
 */
export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Preserves the legacy schema export name for older imports during migration.
 */
export const formSchema = contactFormSchema;
