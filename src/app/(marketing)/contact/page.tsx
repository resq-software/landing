/**
 * Defines the contact and early-access request route.
 */
import type { Metadata } from "next";

import { Background } from "@/features/marketing/components/background";
import { ContactForm } from "@/features/marketing/sections/contact-form";

/**
 * Provides page-specific metadata for the contact route.
 */
export const metadata: Metadata = {
  title: "Request Access",
  description:
    "Join early access to ResQ — autonomous drone coordination for first-responder organizations, government agencies, and disaster response NGOs.",
};

/**
 * Renders the contact page and embeds the access request form.
 *
 * @returns The early-access contact route content.
 */
export default function ContactPage() {
  return (
    <Background>
      <section className="py-28 lg:py-32 lg:pt-44">
        <div className="container max-w-xl">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-sky-400">
            Early Access
          </p>
          <h1 className="mt-3 text-center text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Request Access
          </h1>
          <p className="mt-4 text-center leading-relaxed text-muted-foreground">
            Available to verified first-responder organizations, government
            agencies, and disaster response NGOs. We&apos;ll respond within 48
            hours.
          </p>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </Background>
  );
}
