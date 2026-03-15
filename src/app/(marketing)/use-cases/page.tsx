/**
 * Defines the route that highlights supported deployment scenarios.
 */
import type { Metadata } from "next";

import { Background } from "@/features/marketing/components/background";
import { UseCases } from "@/features/marketing/sections/use-cases";

/**
 * Provides page-specific metadata for the use-cases route.
 */
export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "ResQ autonomous drone swarms for wildfire, flood response, search and rescue, and urban disaster scenarios.",
};

/**
 * Renders the Use Cases page wrapper around the shared section component.
 *
 * @returns The use-cases route content.
 */
export default function UseCasesPage() {
  return (
    <Background>
      <div className="lg:pt-16">
        <UseCases />
      </div>
    </Background>
  );
}
