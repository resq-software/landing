/**
 * Renders the closing call-to-action banner for the marketing funnel.
 */
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Encourages qualified visitors to request access or learn more.
 *
 * @returns The marketing CTA section.
 */
export const CTABanner = () => {
  return (
    <section className="py-28 lg:py-32">
      <div className="container max-w-4xl">
        <div className="rounded-3xl border border-sky-500/20 bg-gradient-to-b from-sky-500/5 to-transparent p-12 text-center lg:p-20">
          {/* Heading */}
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Ready to deploy?
          </h2>

          {/* Subtext */}
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl leading-snug">
            ResQ is available to first-responder organizations, government
            agencies, and disaster response NGOs. Join the early access program.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-sky-500 text-white hover:bg-sky-600"
              asChild
            >
              <Link href="/contact">Request Access</Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <Link href="/about">
                Learn More
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
