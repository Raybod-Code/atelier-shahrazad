"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/navigation";
import { useState, useEffect } from "react";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("Navigation");
  const tHome = useTranslations("HomePage");

  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // لاجیک اسکرول ساده و بدون باگ
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "fr" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    // Z-Index بالا (100) برای اینکه حتماً روی همه چی باشه
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/90 backdrop-blur-md py-4 border-b border-white/5"
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-[101] group">
          <span className="font-serif text-2xl text-[#E0E0E0] tracking-tight group-hover:text-[#C7A56A] transition-colors">
            Atelier <span className="text-[#C7A56A] italic">Shahrazad</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { key: "works", href: "/#works" },
            { key: "process", href: "/#process" },
            { key: "contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-xs font-sans font-medium tracking-widest text-[#E0E0E0]/70 hover:text-[#C7A56A] transition-colors uppercase"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={switchLocale}
            className="text-[10px] font-mono font-bold tracking-widest text-[#E0E0E0]/50 hover:text-[#C7A56A] transition-colors uppercase cursor-pointer"
          >
            {locale === "en" ? "FR" : "EN"}
          </button>

          <Link
            href="/contact"
            className={`hidden md:inline-flex items-center justify-center px-6 py-2 rounded-full transition-all duration-300 border ${
              isScrolled
                ? "bg-[#C7A56A] text-[#050505] border-[#C7A56A] hover:bg-white"
                : "bg-transparent text-[#C7A56A] border-[#C7A56A]/30 hover:border-[#C7A56A]"
            }`}
          >
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
              {tHome("cta")}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
