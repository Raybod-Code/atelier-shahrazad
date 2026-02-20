import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Pricing | Atelier Shahrazad",
  description: "Transparent pricing for luxury digital experiences. From essential to fully bespoke WebGL builds.",
  openGraph: {
    title:       "Pricing | Atelier Shahrazad",
    description: "Luxury digital experiences from €8,000. Choose your vision.",
    url:         "https://atelier-shahrazad.com/pricing",
    type:        "website",
    images: [{
      url:    "/og-pricing.jpg",
      width:  1200,
      height: 630,
      alt:    "Atelier Shahrazad Pricing",
    }],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
