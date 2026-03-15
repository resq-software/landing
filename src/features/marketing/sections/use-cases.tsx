/**
 * Highlights the real-world deployment scenarios the product targets.
 */
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Defines the scenario cards rendered in the use-case grid.
 */
const useCases = [
  {
    badge: "Wildfire",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    tagline: "Map the fire line before ground crews advance.",
    description:
      "ResQ swarms provide continuous perimeter mapping, detect spot fires, and route safe corridors for firefighting crews — even as comms infrastructure burns.",
  },
  {
    badge: "Flood Response",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    tagline: "Locate survivors across submerged terrain.",
    description:
      "Thermal and visual sensor fusion identifies survivors on rooftops and in trees. GPS-denied mesh coordinates handoffs between drones without ground station contact.",
  },
  {
    badge: "Search & Rescue",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    tagline: "Cover a 50km² search zone in under 20 minutes.",
    description:
      "Optimal grid coverage algorithms distribute the search zone across available drones. PDIE prioritizes sectors based on last-known location and terrain analysis.",
  },
  {
    badge: "Urban Disaster",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    tagline: "Navigate building canyons without GPS.",
    description:
      "Visual-inertial odometry and edge inference keep drones stable in urban environments. Blockchain-logged sensor data provides evidence for post-incident analysis.",
  },
];

/**
 * Renders the marketing use-case overview.
 *
 * @returns The use-cases section.
 */
export const UseCases = () => {
  return (
    <section id="use-cases" className="py-28 lg:py-32">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest">
            Use Cases
          </p>
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Every disaster. Any environment.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug">
            ResQ is purpose-built for the scenarios where existing aerial
            systems fail. No GPS, no comms, no problem.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-20">
          {useCases.map((useCase) => (
            <Card
              key={useCase.badge}
              className="border-border/60 bg-muted/40 group transition-colors hover:border-sky-500/20"
            >
              <CardContent className="flex flex-col gap-4 p-8">
                {/* Badge */}
                <span
                  className={cn(
                    "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold",
                    useCase.badgeColor,
                  )}
                >
                  {useCase.badge}
                </span>

                {/* Tagline */}
                <h3 className="text-foreground text-lg font-semibold leading-snug tracking-tight">
                  {useCase.tagline}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {useCase.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
