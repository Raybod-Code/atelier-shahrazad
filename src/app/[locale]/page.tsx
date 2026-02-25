import type { Metadata }  from "next";
import Hero               from "@/components/sections/Hero";
import Manifesto          from "@/components/sections/Manifesto"; // 👈 اضافه شد
import SelectedWorks      from "@/components/sections/SelectedWorks";
import Deliverables       from "@/components/sections/Deliverables";
import Process            from "@/components/sections/Process";
import SectionReveal      from "@/components/ui/SectionReveal";

export const metadata: Metadata = {
  title:       "Atelier Shahrazad | The Golden Thread",
  description: "Immersive WebGL experiences for luxury fashion & art brands. Where code meets the soul.",
};

export default function Home() {
  return (
    <main className="relative w-full bg-transparent overflow-hidden">

      {/* ── Hero */}
      <div className="min-h-screen w-full">
        <SectionReveal depth={0}>
          <Hero />
        </SectionReveal>
      </div>

      <div className="h-[15vh] md:h-[20vh] w-full pointer-events-none" />

      {/* ── Manifesto (داستان برند) 👈 اینجا قرار گرفت */}
      <div className="w-full">
        <SectionReveal depth={1}>
          <Manifesto />
        </SectionReveal>
      </div>

      <div className="h-[15vh] md:h-[20vh] w-full pointer-events-none" />

      {/* ── Selected Works */}
      <div className="min-h-screen w-full">
        <SectionReveal depth={2}>
          <SelectedWorks />
        </SectionReveal>
      </div>

      <div className="h-[15vh] md:h-[20vh] w-full pointer-events-none" />

      {/* ── Deliverables */}
      <div className="min-h-screen w-full flex items-center">
        <SectionReveal depth={3} className="w-full">
          <Deliverables />
        </SectionReveal>
      </div>

      <div className="h-[15vh] md:h-[20vh] w-full pointer-events-none" />

      {/* ── Process */}
      <div className="min-h-screen w-full flex items-center">
        <SectionReveal depth={3} className="w-full">
          <Process />
        </SectionReveal>
      </div>

      <div className="h-[15vh] w-full pointer-events-none" />

    </main>
  );
}