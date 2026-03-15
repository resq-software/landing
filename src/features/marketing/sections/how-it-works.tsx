/**
 * Explains the product workflow from prediction through autonomous execution.
 */
/**
 * Defines the sequential workflow steps shown in the marketing explainer.
 */
const steps = [
  {
    number: "01",
    title: "Detect",
    subtitle: "PDIE Intelligence Layer",
    description:
      "The Predictive Disaster Intelligence Engine analyzes incoming sensor data, satellite imagery, and historical patterns. It forecasts disaster spread and generates swarm tasking recommendations — often before ground teams are alerted.",
    statValue: "< 200ms",
    statLabel: "alert latency",
  },
  {
    number: "02",
    title: "Plan",
    subtitle: "DTSOP Digital Twin",
    description:
      "The Digital Twin Swarm Operations Platform generates optimized multi-drone routes. It avoids no-fly zones in real time, accounts for wind and obstacle data, and runs thousands of micro-simulations before committing a flight plan.",
    statValue: "1000+",
    statLabel: "drones per instance",
  },
  {
    number: "03",
    title: "Execute",
    subtitle: "HCE + Edge AI",
    description:
      "The Hierarchical Command Engine dispatches the swarm. On-drone edge inference handles real-time obstacle avoidance and sensor fusion autonomously — no network required. Every action is committed to an immutable audit trail.",
    statValue: "100%",
    statLabel: "simulation-verified",
  },
];

/**
 * Renders the three-step workflow breakdown for the marketing site.
 *
 * @returns The "How it works" section.
 */
export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-28 lg:py-32">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest">
            How It Works
          </p>
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            From forecast to flight
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-20">
          {steps.map((step) => (
            <div
              key={step.number}
              className="border-border/60 bg-muted/40 flex flex-col rounded-2xl border p-8"
            >
              {/* Step number */}
              <span className="text-muted-foreground/20 font-display select-none text-7xl font-bold leading-none tracking-tight lg:text-8xl">
                {step.number}
              </span>

              {/* Title + Subtitle */}
              <div className="mt-4 space-y-1">
                <h3 className="text-foreground text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sky-400 text-sm font-medium">
                  {step.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Stat box */}
              <div className="mt-8 rounded-xl border border-sky-500/20 bg-sky-500/5 px-5 py-4">
                <div className="text-foreground text-2xl font-bold tracking-tight">
                  {step.statValue}
                </div>
                <div className="text-muted-foreground mt-0.5 text-xs uppercase tracking-widest">
                  {step.statLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
