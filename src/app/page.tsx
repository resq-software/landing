import { Background } from "@/components/background";
import { CTABanner } from "@/components/blocks/cta-banner";
import { FAQ } from "@/components/blocks/faq";
import { Features } from "@/components/blocks/features";
import { Hero } from "@/components/blocks/hero";
import { HowItWorks } from "@/components/blocks/how-it-works";
import { Stats } from "@/components/blocks/stats";
import { UseCases } from "@/components/blocks/use-cases";

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
