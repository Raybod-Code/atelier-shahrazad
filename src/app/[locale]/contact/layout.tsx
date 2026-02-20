import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Contact | Atelier Shahrazad",
  description: "Start your luxury digital project. Tell us your vision and we'll respond within 24 hours.",
  openGraph: {
    title:       "Contact | Atelier Shahrazad",
    description: "Start your luxury digital project with Atelier Shahrazad.",
    url:         "https://atelier-shahrazad.com/contact",
    type:        "website",
    images: [{
      url:    "/og-contact.jpg",
      width:  1200,
      height: 630,
      alt:    "Contact Atelier Shahrazad",
    }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
