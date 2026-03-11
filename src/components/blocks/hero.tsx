import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-28 lg:py-32 lg:pt-44">
      {/* Radial glow background effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[800px] rounded-full bg-sky-500/10 blur-[120px]" />
      </div>

      <div className="container relative flex flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1.5 text-sm text-sky-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
          Simulation-verified autonomous operations
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl text-4xl tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
          <span className="gradient-heading block">Autonomous Drone Response.</span>
          <span className="text-foreground block">Built for When It Counts.</span>
        </h1>

        {/* Subheading */}
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg md:text-xl">
          GPS-denied operations. Simulation-first safety. Immutable audit trail.
          ResQ coordinates swarm responses to disasters before the first
          responder arrives.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-sky-500 text-white hover:bg-sky-600"
            asChild
          >
            <Link href="/contact">Request Access</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            asChild
          >
            <Link href="/features">
              Explore Features
              <ArrowRight className="stroke-3" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
