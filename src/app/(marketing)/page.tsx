/**
 * Composes the main landing page from the core marketing sections.
 */
import { Background } from "@/features/marketing/components/background";
import { CTABanner } from "@/features/marketing/sections/cta-banner";
import { FAQ } from "@/features/marketing/sections/faq";
import { Features } from "@/features/marketing/sections/features";
import { Hero } from "@/features/marketing/sections/hero";
import { HowItWorks } from "@/features/marketing/sections/how-it-works";
import { Stats } from "@/features/marketing/sections/stats";
import { UseCases } from "@/features/marketing/sections/use-cases";

/**
 * Renders the home page for the marketing site.
 *
 * @returns The landing page section stack.
 */
export default function Home() {
  return (
    <>
      <Background className="via-muted to-muted/80">
        <Hero />
        <Features />
      </Background>
      <HowItWorks />
      <Stats />
      <UseCases />
      <Background variant="bottom">
        <FAQ />
        <CTABanner />
      </Background>
    </>
  );
}
