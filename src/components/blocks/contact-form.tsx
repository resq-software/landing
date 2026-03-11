"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

import { serverAction } from "@/actions/server-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormValues } from "@/lib/form-schema";

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      role: "",
      message: "",
    },
  });

  const formAction = useAction(serverAction, {
    onSuccess: () => {
      form.reset();
    },
    onError: () => {
      // Error is surfaced via hasErrored below
    },
  });

  const handleSubmit = form.handleSubmit(async (data: ContactFormValues) => {
    formAction.execute(data);
  });

  const { isExecuting, hasSucceeded } = formAction;

  if (hasSucceeded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border border-green-500/20 bg-green-500/10 p-8 text-center"
      >
        <p className="text-lg font-semibold">Request received.</p>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll reach out within 48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-4 rounded-md"
      >
        {/* Full Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Jane Smith"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Organization */}
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="City of Los Angeles Fire Dept."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jane@lacfd.gov"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Operations Commander"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Use Case (optional) */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell us about your use case</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Describe the deployment environment, scale, or specific requirements…"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-2 w-full bg-sky-500 hover:bg-sky-600 text-white"
          disabled={isExecuting}
        >
          {isExecuting ? "Submitting…" : "Request Access"}
        </Button>
      </form>
    </Form>
  );
}
