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

// ✅ متادیتا حرفه‌ای برای پیش‌نمایش شیک لینک‌ها در شبکه‌های اجتماعی
export const metadata: Metadata = {
  title:       "Atelier Shahrazad | The Golden Thread",
  description: "Immersive WebGL experiences for luxury fashion & art brands. Where code meets the soul.",
  keywords:    ["web design", "luxury", "fashion", "WebGL", "Next.js", "creative agency"],
  openGraph: {
    title: "Atelier Shahrazad | Digital Atelier",
    description: "Immersive WebGL experiences for luxury fashion & art brands.",
    type: "website",
    siteName: "Atelier Shahrazad",
    // images: ["/og-image.jpg"], // 💡 بعدا یه عکس ۱۲۰۰ در ۶۳۰ از سایتت بگیر و بذار تو پوشه public
  },
  twitter: {
    card: "summary_large_image",
  }
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
    // ❌ کلمه scroll-smooth حذف شد تا با Lenis تداخل نکنه
    <html lang={locale}>
      <body
        className={`
          ${sans.variable} ${serif.variable}
          font-sans text-paper antialiased
          flex flex-col min-h-screen
          overflow-x-hidden
          bg-[#050505]
        `}
      >
        <SmoothScroll>
          <NextIntlClientProvider messages={messages}>

            {/* لایه ۰: موتور سه‌بعدی — کف صفحه */}
            <SceneWrapper />

            {/* لایه ۱: noise overlay */}
            <div className="noise-overlay" style={{ zIndex: 1 }} />

            {/* لایه ۵۰: UI ثابت (آزادسازی از دیو محصورکننده) */}
            <Preloader />
            <CustomCursor />
            <SoundManager />
            <CookieConsent />
            <Header locale={locale} />

            {/* لایه ۱۰: محتوای اصلی و فوتر */}
            <div className="relative z-10 flex w-full flex-col min-h-screen">
              <main className="w-full flex-grow">
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