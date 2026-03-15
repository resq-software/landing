/**
 * Renders the key operational metrics used throughout the marketing site.
 */
import { cn } from "@/lib/utils";

/**
 * Defines the summary statistics shown in the metrics strip.
 */
const stats = [
  {
    value: "< 200ms",
    label: "Telemetry latency",
  },
  {
    value: "1000+",
    label: "Drones per HCE instance",
  },
  {
    value: "100%",
    label: "Behaviors simulation-verified",
  },
  {
    value: "On-chain",
    label: "Immutable audit trail per mission",
  },
];

/**
 * Describes the optional class overrides supported by the stats section.
 */
type StatsProps = {
  className?: string;
};

/**
 * Displays the headline operational metrics in a responsive grid.
 *
 * @param props - Optional class overrides for section placement.
 * @returns The marketing stats section.
 */
export const Stats = ({ className }: StatsProps) => {
  return (
    <section
      className={cn(
        "border-border/60 bg-muted/30 border-y py-12 lg:py-16",
        className,
      )}
    >
      <div className="container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <div className="gradient-heading text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-xs uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
