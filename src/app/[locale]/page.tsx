import type { Metadata } from "next";
import Hero              from "@/components/sections/Hero";
import SelectedWorks     from "@/components/sections/SelectedWorks";
import Deliverables      from "@/components/sections/Deliverables";
import Process           from "@/components/sections/Process";

export const metadata: Metadata = {
  title:       "Atelier Shahrazad | The Golden Thread",
  description: "Immersive WebGL experiences for luxury fashion & art brands. Where code meets the soul.",
  openGraph: {
    title:       "Atelier Shahrazad | The Golden Thread",
    description: "Immersive WebGL experiences for luxury fashion & art brands.",
    url:         "https://atelier-shahrazad.com",
    type:        "website",
    images: [{
      url:    "/og-home.jpg",
      width:  1200,
      height: 630,
      alt:    "Atelier Shahrazad",
    }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Atelier Shahrazad | The Golden Thread",
    description: "Immersive WebGL experiences for luxury brands.",
    images:      ["/og-home.jpg"],
  },
};

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
