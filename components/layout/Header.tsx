'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '../../navigation';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils'; // اگر این فایل رو نداری، نگران نباش (پایین میسازیمش)

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');
  const tHome = useTranslations('HomePage');
  
  // برای تشخیص اسکرول
  const [isScrolled, setIsScrolled] = useState(false);
  
  // برای تغییر زبان
  const pathname = usePathname();
  const router = useRouter();

  // لاجیک اسکرول
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // لاجیک تغییر زبان
  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'fr' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent ${
        isScrolled 
          ? 'bg-charcoal/80 backdrop-blur-md py-4 border-white/5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl text-paper tracking-tight hover:opacity-80 transition-opacity">
          Atelier <span className="text-gold italic">Shahrazad</span>
        </Link>

        {/* Desktop Nav */}
    {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            // لینک‌های لنگری (Anchor) برای اسکرول به بخش‌ها
            { key: 'works', href: '/#works' },
            { key: 'process', href: '/#process' },
            // صفحه جداگانه برای تماس
            { key: 'contact', href: '/contact' } 
          ].map((item) => (
            <Link 
              key={item.key} 
              href={item.href}
              className="text-sm text-paper/70 hover:text-gold transition-colors font-sans tracking-wide"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <button 
            onClick={switchLocale}
            className="text-xs font-medium tracking-widest text-paper/60 hover:text-gold transition-colors uppercase"
          >
            {locale === 'en' ? 'FR' : 'EN'}
          </button>

          {/* CTA Button */}
          <Link 
            href="/contact" 
            className={`hidden md:inline-flex items-center justify-center px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                isScrolled 
                ? 'bg-gold text-charcoal hover:bg-paper' 
                : 'border border-gold/30 text-gold hover:border-gold hover:text-paper'
            }`}
          >
            {tHome('cta')}
          </Link>
        </div>
      </div>
    </header>
  );
}