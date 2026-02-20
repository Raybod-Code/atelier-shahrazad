"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("Navigation");
  const tHome = useTranslations("HomePage");
  
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        isScrolled
          ? "bg-charcoal/90 backdrop-blur-md py-4 border-b border-border"
          : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-[101] group">
          <span className="font-serif text-2xl text-paper tracking-tight group-hover:text-gold transition-colors">
            Atelier <span className="text-gold italic">Shahrazad</span>
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
              className="text-xs font-sans font-medium tracking-widest text-muted-foreground hover:text-gold transition-colors uppercase"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={switchLocale}
            className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground hover:text-gold transition-colors uppercase cursor-pointer"
          >
            {locale === "en" ? "FR" : "EN"}
          </button>

          <Link
            href="/contact"
            className={cn(
              "hidden md:inline-flex items-center justify-center px-6 py-2 rounded-full transition-all duration-300 border",
              isScrolled
                ? "bg-gold text-charcoal border-gold hover:bg-paper"
                : "bg-transparent text-gold border-gold/30 hover:border-gold"
            )}
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
