import { cn } from "@/lib/utils";

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

export const Stats = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        "border-border/60 bg-muted/30 border-y py-12 lg:py-16",
        className,
      )}
    >
      <div className="container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
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
