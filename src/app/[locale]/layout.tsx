import type { Metadata, Viewport }   from "next";
import { Inter, Playfair_Display }   from "next/font/google";
import Header                        from "@/components/layout/Header";
import Footer                        from "@/components/layout/Footer";
import "@/app/globals.css";
import SmoothScroll                  from "@/components/ui/SmoothScroll";
import CustomCursor                  from "@/components/ui/CustomCursor";
import Preloader                     from "@/components/ui/Preloader";
import SoundManager                  from "@/components/ui/SoundManager";
import CookieConsent                 from "@/components/ui/CookieConsent";
import { NextIntlClientProvider }    from "next-intl";
import { getMessages }               from "next-intl/server";
import SceneWrapper                  from "@/components/canvas/SceneWrapper";

const sans = Inter({
  subsets:  ["latin"],
  variable: "--font-sans-family",
  display:  "swap",
});

const serif = Playfair_Display({
  subsets:  ["latin"],
  variable: "--font-serif-family",
  display:  "swap",
});

export const metadata: Metadata = {
  title:       "Atelier Shahrazad | The Golden Thread",
  description: "Immersive WebGL Experience for fashion & art brands.",
  keywords:    ["web design", "luxury", "fashion", "WebGL", "Next.js"],
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params:   Promise<{ locale: string }>;
}) {
  const messages      = await getMessages();
  const { locale }    = await params;

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`
          ${sans.variable} ${serif.variable}
          font-sans text-paper antialiased
          bg-[#050505]
          flex flex-col min-h-screen
          overflow-x-hidden
        `}
      >
        <SmoothScroll>
          <NextIntlClientProvider messages={messages}>

            {/* لایه ۰: موتور سه‌بعدی — کف صفحه */}
            <SceneWrapper />

            {/* لایه ۱: noise overlay */}
            <div className="noise-overlay" style={{ zIndex: 1 }} />

            {/* لایه ۵۰: UI ثابت */}
            <div style={{ position: "relative", zIndex: 50 }}>
              <Preloader />
              <CustomCursor />
              <SoundManager />
              <CookieConsent />
              <Header locale={locale} />
            </div>

            {/* ✅ فیکس: min-h-[500vh] حذف شد */}
            <div className="relative z-10 w-full">
              <main className="w-full">
                {children}
              </main>
              <Footer />
            </div>

          </NextIntlClientProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
