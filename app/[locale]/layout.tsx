import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from '../../components/layout/Header'; 
import Footer from '../../components/layout/Footer'; // سیمیکالن اضافه شد
import "../globals.css"; 
import SmoothScroll from '../../components/ui/SmoothScroll'; // <-- جدید
import CustomCursor from '../../components/ui/CustomCursor'; 
import Preloader from '../../components/ui/Preloader';      // <-- جدید
import SoundManager from '../../components/ui/SoundManager'; // <-- جدید
import CookieConsent from '../../components/ui/CookieConsent'; // <-- جدید// <-- جدید
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

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
  title: "Atelier Shahrazad | Digital Craftsmanship",
  description: "Immersive web experiences and art direction for luxury brands.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  // تغییر مهم: در Next.js 15 پارامترها پرامیس هستن
  params: Promise<{ locale: string }>; 
}) {
  const messages = await getMessages();
  const { locale } = await params; 

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        // اضافه کردن flex و min-h-screen برای چسبیدن فوتر به پایین
        className={`${sans.variable} ${serif.variable} font-sans bg-charcoal text-paper antialiased selection:bg-gold selection:text-charcoal flex flex-col min-h-screen`}
      >
       {/* رپر اسکرول نرم */}
        <SmoothScroll>
          <NextIntlClientProvider messages={messages}>
            
            <div className="noise-overlay" />
            
            {/* فیچرهای جدید */}
            <Preloader />
            <CustomCursor />
            <SoundManager />
            <CookieConsent />
            
            <Header locale={locale} />
            
            <main className="pt-20 flex-grow relative">
              {children}
            </main>
            
            <Footer />
            
          </NextIntlClientProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}