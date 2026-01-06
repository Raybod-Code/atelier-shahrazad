import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from '../../components/layout/Header'; 
import Footer from '../../components/layout/Footer';
import "../globals.css"; 
import SmoothScroll from '../../components/ui/SmoothScroll';
import CustomCursor from '../../components/ui/CustomCursor'; 
import Preloader from '../../components/ui/Preloader';
import SoundManager from '../../components/ui/SoundManager';
import CookieConsent from '../../components/ui/CookieConsent';
// 👇 ایمپورت موتور جدید
import Scene from '../../components/canvas/Scene'; 
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: 'Atelier Shahrazad | The Golden Thread',
  description: "Immersive WebGL Experience",
};

export const viewport: Viewport = {
  themeColor: '#050505',
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  const messages = await getMessages();
  const { locale } = await params; 

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${sans.variable} ${serif.variable} font-sans bg-transparent text-paper antialiased selection:bg-gold selection:text-charcoal flex flex-col min-h-screen`}>
    <SmoothScroll>
          <NextIntlClientProvider messages={messages}>
            
            <Scene /> {/* موتور سه‌بعدی */}
            <div className="noise-overlay" />
            <Preloader />
            <CustomCursor />
            <SoundManager />
            <Header locale={locale} />
            
            {/* فضای اسکرول بسیار بلند */}
            <div className="relative z-10 w-full min-h-[500vh]">
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