import Link from "next/link";

import type { Metadata } from "next";

import { Background } from "@/components/background";
import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "ResQ is an autonomous drone swarm platform built for disaster response in GPS-denied, infrastructure-destroyed environments. Apache 2.0, simulation-first, cross-language safety.",
};

const sections = [
  {
    label: "Open architecture",
    title: "Apache 2.0 — fork it, deploy it, own it.",
    body: "The entire platform is open source under Apache 2.0. Inter-service contracts live in Protobuf so any organization can extend, audit, or fork the stack without vendor lock-in. No proprietary data formats. No black boxes.",
  },
  {
    label: "Simulation-first development",
    title: "Every behavior verified before real deployment.",
    body: "All mission logic runs through PX4 SITL + Gazebo before touching a physical airframe. The CI pipeline runs 140+ tests on every commit — swarm coordination, failover, NFZ enforcement, and comms blackouts all included.",
  },
  {
    label: "Cross-language safety",
    title: "Seven services, one source of truth.",
    body: "Rust, TypeScript, Python, C++, and C# services share a single Protobuf contract layer. Schema changes are validated across all consumers at codegen time, not at runtime in a burning building.",
  },
];

export default function AboutPage() {
  return (
    <Background>
      <section className="py-28 lg:py-32 lg:pt-44">
        <div className="container max-w-3xl">
          {/* Hero */}
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            The mission is the product.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            ResQ was built to solve a specific problem: autonomous multi-drone
            coordination in GPS-denied, infrastructure-destroyed disaster zones.
            Every design decision optimizes for reliability under the worst
            possible conditions.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-sky-500 hover:bg-sky-600 text-white"
              size="lg"
            >
              <Link href="/contact">Request Access</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href="https://github.com/resq-software"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub &rarr;
              </Link>
            </Button>
          </div>

          <DashedLine className="my-16" />

          {/* Content sections */}
          <div className="flex flex-col gap-14">
            {sections.map((section) => (
              <div key={section.label}>
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-400">
                  {section.label}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <DashedLine className="my-16" />

          {/* Bottom CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-sky-500 hover:bg-sky-600 text-white"
              size="lg"
            >
              <Link href="/contact">Request Access</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href="https://github.com/resq-software"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub &rarr;
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Background>
  );
}
