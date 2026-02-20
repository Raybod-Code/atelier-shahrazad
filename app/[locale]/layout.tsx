import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../../components/layout/Footer";
import "../globals.css";
import SmoothScroll from "../../components/ui/SmoothScroll";
import CustomCursor from "../../components/ui/CustomCursor";
import Preloader from "../../components/ui/Preloader";
import SoundManager from "../../components/ui/SoundManager";
import CookieConsent from "../../components/ui/CookieConsent";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// ایمپورت رپر جدید
import SceneWrapper from "../../components/canvas/SceneWrapper";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atelier Shahrazad | The Golden Thread",
  description: "Immersive WebGL Experience",
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${sans.variable} ${serif.variable} font-sans text-paper antialiased selection:bg-gold selection:text-charcoal flex flex-col min-h-screen bg-bg`}
      >
        <SmoothScroll>
          <NextIntlClientProvider messages={messages}>
            {/* لایه ۰: موتور سه‌بعدی (همیشه کف) */}
            <SceneWrapper />

            {/* لایه ۱: نویز و افکت‌ها */}
            <div className="noise-overlay" style={{ zIndex: 1 }} />

            {/* لایه ۱۰: المان‌های UI ثابت */}
            <div style={{ position: "relative", zIndex: 50 }}>
              <Preloader />
              <CustomCursor />
              <SoundManager />
              <CookieConsent />
              <Header locale={locale} />
            </div>

            {/* لایه ۵: محتوای اصلی */}
            <div className="relative z-10 w-full min-h-[500vh]">
              <main className="w-full">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
