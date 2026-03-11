import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const questions = [
  {
    question: "How does ResQ operate without GPS?",
    answer:
      "ResQ drones use visual-inertial odometry combined with LIDAR-based SLAM for localization. The swarm maintains relative positioning via ultra-wideband ranging and a custom mesh protocol — no satellite or cellular dependency.",
  },
  {
    question: "What simulation environment is used for verification?",
    answer:
      "All behaviors are verified in PX4 SITL (Software-In-The-Loop) running inside Gazebo. The simulation environment mirrors real drone hardware, enabling deterministic verification of autonomous behaviors before any real-world deployment.",
  },
  {
    question: "How is the audit trail protected from tampering?",
    answer:
      "Every mission event — takeoff, waypoint change, sensor observation, anomaly — is committed as a transaction to the Neo N3 blockchain. Evidence (sensor data, images) is stored on IPFS and the content hash anchored on-chain. Neither can be altered post-commit.",
  },
  {
    question: "What drone hardware is supported?",
    answer:
      "ResQ runs on any PX4-compatible autopilot. The edge AI module targets ARM Cortex-A hardware with NPU support (e.g., NVIDIA Jetson Orin Nano, Rockchip RK3588). Integration guides are available for common platforms.",
  },
  {
    question: "How do I get access?",
    answer:
      "ResQ is currently available to verified first-responder organizations, government agencies, and disaster response NGOs. Fill out the request access form and our team will reach out within 48 hours.",
  },
];

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              If you can&apos;t find what you&apos;re looking for,{" "}
              <Link href="/contact" className="underline underline-offset-4">
                get in touch
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-2 text-start">
            <Accordion type="single" collapsible className="w-full">
              {questions.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
