import type { Metadata } from "next";

import { Background } from "@/components/background";
import { UseCases } from "@/components/blocks/use-cases";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "ResQ autonomous drone swarms for wildfire, flood response, search and rescue, and urban disaster scenarios.",
};

export default function UseCasesPage() {
  return (
    <Background>
      <div className="lg:pt-16">
        <UseCases />
      </div>
    </Background>
  );
}
