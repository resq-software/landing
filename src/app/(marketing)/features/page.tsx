/**
 * Defines the route that presents the platform's capability matrix.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Background } from "@/features/marketing/components/background";

/**
 * Provides page-specific metadata for the features route.
 */
export const metadata: Metadata = {
  title: "Features",
  description: "Full capability matrix for the ResQ autonomous drone platform.",
};

/**
 * Describes the grouped feature lists rendered on the Features page.
 */
const sections = [
  {
    category: "GPS-Denied Operations",
    features: [
      "Visual-inertial odometry (VIO) for indoor + outdoor localization",
      "LIDAR-based SLAM with real-time map building",
      "Ultra-wideband (UWB) ranging for relative swarm positioning",
      "Self-organizing mesh network — no ground station required",
      "Degraded-comms mode: autonomous operation with delayed HCE sync",
    ],
  },
  {
    category: "Simulation & Safety",
    features: [
      "PX4 SITL + Gazebo simulation environment",
      "140+ automated integration tests on every commit",
      "Behavior verification before hardware deployment",
      "Digital twin (DTSOP) for real-time mission planning",
      "No-fly zone enforcement at planning and execution layers",
    ],
  },
  {
    category: "Audit & Compliance",
    features: [
      "Neo N3 blockchain transaction per mission event",
      "IPFS content-addressed evidence storage",
      "Cryptographic chain of custody from dispatch to recovery",
      "FAA Part 107 / BVLOS compliance tooling",
      "GDPR-compliant data handling for sensor recordings",
    ],
  },
  {
    category: "Intelligence & Autonomy",
    features: [
      "PDIE ML models for disaster spread prediction",
      "LSTM + hybrid architecture for telemetry anomaly detection",
      "On-drone edge inference — ARM NPU optimized",
      "Multi-agent task allocation via auction algorithms",
      "Adaptive replanning on sensor anomaly or vehicle loss",
    ],
  },
];

/**
 * Renders the Features page and its grouped capability lists.
 *
 * @returns The features route content.
 */
export default function FeaturesPage() {
  return (
    <Background>
      <section className="py-28 lg:py-32 lg:pt-44">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-400">
              Full Capability Matrix
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              What ResQ can do
            </h1>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.category}
                className="rounded-xl border border-border bg-card p-8"
              >
                <h2 className="mb-6 text-xl font-bold text-foreground">
                  {section.category}
                </h2>
                <ul className="space-y-3">
                  {section.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 shrink-0 text-sky-400"
                        aria-hidden="true"
                      >
                        &#10003;
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Button
              size="lg"
              className="bg-sky-500 text-white hover:bg-sky-600"
              asChild
            >
              <Link href="/contact">Request Access</Link>
            </Button>
          </div>
        </div>
      </section>
    </Background>
  );
}
