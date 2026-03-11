import type { Metadata } from "next";

import { Background } from "@/components/background";
import { ContactForm } from "@/components/blocks/contact-form";

export const metadata: Metadata = {
  title: "Request Access",
  description:
    "Join early access to ResQ — autonomous drone coordination for first-responder organizations, government agencies, and disaster response NGOs.",
};

export default function ContactPage() {
  return (
    <Background>
      <section className="py-28 lg:py-32 lg:pt-44">
        <div className="container max-w-xl">
          {/* Label */}
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-sky-400">
            Early Access
          </p>

          {/* Heading */}
          <h1 className="mt-3 text-center text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Request Access
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-center text-muted-foreground leading-relaxed">
            Available to verified first-responder organizations, government
            agencies, and disaster response NGOs. We&apos;ll respond within 48
            hours.
          </p>

          {/* Form card */}
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </Background>
  );
}
