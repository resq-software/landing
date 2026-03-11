import * as z from "zod";

export interface ActionResponse<T = unknown> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().min(2, "Organization is required"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().min(2, "Role is required"),
  message: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Keep the old formSchema name as an alias so the old server-action.ts
// continues to compile without changes.
export const formSchema = contactFormSchema;
