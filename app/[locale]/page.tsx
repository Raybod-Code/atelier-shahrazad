import Hero from '../../components/sections/Hero';
import SelectedWorks from '../../components/sections/SelectedWorks';
import Deliverables from '../../components/sections/Deliverables';
import Process from '../../components/sections/Process'; // <-- Import جدید

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-charcoal">
      <Hero />
      <SelectedWorks />
      <Deliverables />
      
      {/* تایم‌لاین پروسه */}
      <Process />

    </main>
  );
}