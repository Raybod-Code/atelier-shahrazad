import type { Metadata }  from "next";
import Hero               from "@/components/sections/Hero";
import SelectedWorks      from "@/components/sections/SelectedWorks";
import Deliverables       from "@/components/sections/Deliverables";
import Process            from "@/components/sections/Process";
import SectionReveal      from "@/components/ui/SectionReveal";

export const metadata: Metadata = {
  title:       "Atelier Shahrazad | The Golden Thread",
  description: "Immersive WebGL experiences for luxury fashion & art brands. Where code meets the soul.",
  openGraph: {
    title:       "Atelier Shahrazad | The Golden Thread",
    description: "Immersive WebGL experiences for luxury fashion & art brands.",
    url:         "https://atelier-shahrazad.com",
    type:        "website",
  },
};

export default function Home() {
  return (
    <main className="flex min-h-[500vh] flex-col bg-transparent">

      {/* ── Hero — depth 0 — هیچوقت fade out نمی‌شه */}
      <SectionReveal depth={0}>
        <Hero />
      </SectionReveal>

      {/* ── Selected Works — depth 1 */}
      <SectionReveal depth={1}>
        <SelectedWorks />
      </SectionReveal>

      {/* ── Deliverables — depth 2 */}
      <SectionReveal depth={2}>
        <Deliverables />
      </SectionReveal>

      {/* ── Process — depth 3 — عمیق‌ترین */}
      <SectionReveal depth={3}>
        <Process />
      </SectionReveal>

    </main>
  );
}
