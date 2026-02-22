import type { Metadata } from "next";
import { Hero, SelectedWorks, Deliverables, Process } from "@/components/sections";
import { SectionReveal } from "@/components/ui";

export const metadata: Metadata = {
  title:       "Atelier Shahrazad | The Golden Thread",
  description: "Immersive WebGL experiences for luxury fashion & art brands. Where code meets the soul.",
};

export default function Home() {
  return (
    <main className="relative w-full bg-transparent overflow-hidden">

      <div className="min-h-screen w-full">
        <SectionReveal depth={0}>
          <Hero />
        </SectionReveal>
      </div>

      <div className="h-[15vh] md:h-[20vh] w-full pointer-events-none" />

      <div className="min-h-screen w-full">
        <SectionReveal depth={1}>
          <SelectedWorks />
        </SectionReveal>
      </div>

      <div className="h-[15vh] md:h-[20vh] w-full pointer-events-none" />

      <div className="min-h-screen w-full flex items-center">
        <SectionReveal depth={2} className="w-full">
          <Deliverables />
        </SectionReveal>
      </div>

      <div className="h-[15vh] md:h-[20vh] w-full pointer-events-none" />

      <div className="min-h-screen w-full flex items-center">
        <SectionReveal depth={3} className="w-full">
          <Process />
        </SectionReveal>
      </div>

      <div className="h-[15vh] w-full pointer-events-none" />

    </main>
  );
}
