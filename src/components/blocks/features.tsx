import { Activity, Brain, Shield, Wifi } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const items = [
  {
    icon: Wifi,
    title: "GPS-Denied Operations",
    description:
      "Mesh communications enable full swarm coordination even when satellite and cellular infrastructure is destroyed. Drones self-organize and maintain formation without external positioning.",
  },
  {
    icon: Shield,
    title: "Simulation-First Safety",
    description:
      "Every behavior is verified in PX4 SITL + Gazebo simulation before deployment. No autonomous action reaches a real drone until it has passed thousands of simulated scenarios.",
  },
  {
    icon: Activity,
    title: "Immutable Audit Trail",
    description:
      "Every mission decision, route change, and sensor observation is committed to the Neo N3 blockchain and pinned to IPFS. Complete chain of custody from dispatch to recovery.",
  },
  {
    icon: Brain,
    title: "Predictive Intelligence",
    description:
      "PDIE ML models forecast disaster spread using historical patterns and live sensor data. Swarms are tasked before human operators recognize the need — minutes matter.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-28 lg:py-32">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest">
            Capabilities
          </p>
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Built for the worst conditions
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug">
            Four core capabilities that separate ResQ from tactical drone
            systems designed for controlled environments.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="border-border/60 bg-muted/40 group transition-colors hover:border-sky-500/30 hover:bg-sky-500/5"
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/10">
                    <Icon className="h-5 w-5 text-sky-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-foreground font-semibold leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
