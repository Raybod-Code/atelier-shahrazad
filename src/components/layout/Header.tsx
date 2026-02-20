"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/constants/navigation";
import MobileMenu from "@/components/ui/MobileMenu";

export default function Header({ locale }: { locale: string }) {
  const t     = useTranslations("Navigation");
  const tHome = useTranslations("HomePage");

  const [isScrolled,    setIsScrolled]    = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const pathname = usePathname();
  const router   = useRouter();

  // ─── Scroll Detection ───────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Language Switch ────────────────────────
  const switchLocale = () => {
    const nextLocale = locale === "en" ? "fr" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
          isScrolled
            ? "bg-[#050505]/90 backdrop-blur-md py-4 border-b border-gold/10"
            : "bg-transparent py-8"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* ─── Logo ────────────────────────── */}
          <Link href="/" className="relative z-[101] group">
            <span className="font-serif text-2xl text-paper tracking-tight group-hover:text-gold transition-colors duration-300">
              Atelier{" "}
              <span className="text-gold italic">Shahrazad</span>
            </span>
          </Link>

          {/* ─── Desktop Nav ─────────────────── */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="relative text-xs font-sans font-medium tracking-widest text-muted-foreground hover:text-gold transition-colors duration-300 uppercase group"
              >
                {t(item.key)}
                {/* خط زیر انیمیشن‌دار */}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* ─── Actions ─────────────────────── */}
          <div className="flex items-center gap-4">
            {/* Language — فقط desktop */}
            <button
              onClick={switchLocale}
              className="hidden md:block text-[10px] font-mono font-bold tracking-widest text-muted-foreground hover:text-gold transition-colors duration-300 uppercase cursor-pointer"
            >
              {locale === "en" ? "FR" : "EN"}
            </button>

            {/* CTA — فقط desktop */}
            <Link
              href="/contact"
              className={cn(
                "hidden md:inline-flex items-center justify-center px-6 py-2 rounded-full transition-all duration-300 border",
                isScrolled
                  ? "bg-gold text-charcoal border-gold hover:bg-transparent hover:text-gold"
                  : "bg-transparent text-gold border-gold/30 hover:border-gold hover:bg-gold/5"
              )}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                {tHome("cta")}
              </span>
            </Link>

            {/* ─── Hamburger Button (mobile) ─── */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="relative z-[101] flex md:hidden h-10 w-10 flex-col items-center justify-center gap-[6px]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 9, width: "100%" }
                    : { rotate: 0, y: 0, width: "100%" }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[1.5px] w-full origin-center bg-paper"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] w-[65%] self-end origin-right bg-gold"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -9, width: "100%" }
                    : { rotate: 0, y: 0, width: "100%" }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[1.5px] w-full origin-center bg-paper"
              />
            </button>
          </div>
        </div>

        {/* Progress bar وقتی scroll شده */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-0 left-0 h-[1px] w-full origin-left bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            />
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        locale={locale}
        onLangSwitch={switchLocale}
      />
    </>
  );
}
