import Hero from "@/components/sections/Hero";
import SelectedWorks from "@/components/sections/SelectedWorks";
import Deliverables from "@/components/sections/Deliverables";
import Process from "@/components/sections/Process";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent">
      <Hero />
      <SelectedWorks />
      <Deliverables />
      <Process />
    </main>
  );
}
