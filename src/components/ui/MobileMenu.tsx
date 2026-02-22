"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import { useLenis } from 'lenis/react'; // 👈 اضافه شد

interface MobileMenuProps {
  isOpen:       boolean;
  onClose:      () => void;
  locale:       string;
  onLangSwitch: () => void;
}

// ─────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────

const overlayVariants = {
  closed: { opacity: 0 },
  open:   { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const menuVariants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 40 },
  open:   (i: number) => ({
    opacity: 1,
    y:       0,
    transition: {
      delay:    0.2 + i * 0.1,
      duration: 0.7,
      ease:     [0.22, 1, 0.36, 1],
    },
  }),
};

const lineVariants = {
  closed: { scaleX: 0 },
  open:   (i: number) => ({
    scaleX:     1,
    transition: {
      delay:    0.3 + i * 0.1,
      duration: 0.8,
      ease:     [0.22, 1, 0.36, 1],
    },
  }),
};

// ─────────────────────────────────────────────
// Mobile Menu Component
// ─────────────────────────────────────────────

export default function MobileMenu({
  isOpen,
  onClose,
  locale,
  onLangSwitch,
}: MobileMenuProps) {
  
  // 👈 دسترسی به نمونه (instance) موتور Lenis
  const lenis = useLenis();

  // ✅ متوقف کردن اصولی اسکرول در موتور Lenis
  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop(); // 👈 ترمز دستی Lenis کشیده میشه
      document.body.style.overflow = "hidden"; // برای احتیاط (Native)
    } else {
      lenis.start(); // 👈 حرکت مجدد Lenis
      document.body.style.overflow = "";
    }

    return () => {
      lenis.start();
      document.body.style.overflow = "";
    };
  }, [isOpen, lenis]);

  // ✅ بستن با Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />

          {/* Menu Panel */}
          <motion.div
            key="panel"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[95] flex flex-col bg-[#050505]"
          >
            {/* Noise texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Gold glow */}
            <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold/[0.06] blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gold/[0.04] blur-[80px]" />

            {/* Content */}
            <div className="relative flex flex-1 flex-col justify-between px-8 pb-12 pt-28">

              {/* Nav Items */}
              <nav className="space-y-0">
                {NAV_ITEMS.map((item, i) => (
                  <div key={item.key}>
                    {/* خط بالای هر آیتم */}
                    <motion.div
                      custom={i}
                      variants={lineVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="h-[1px] origin-left bg-gradient-to-r from-gold/30 via-gold/10 to-transparent"
                    />

                    <motion.div
                      custom={i}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group flex items-center justify-between py-7"
                      >
                        {/* Index + Title */}
                        <div className="flex items-baseline gap-6">
                          <span className="font-mono text-[10px] tracking-widest text-gold/40">
                            0{i + 1}
                          </span>
                          <span className="font-serif text-5xl font-light tracking-tight text-paper transition-colors duration-300 group-hover:text-gold sm:text-6xl">
                            {/* عنوان از locale */}
                            {item.key === "works"   && (locale === "fr" ? "Travaux"  : "Works"  )}
                            {item.key === "process" && (locale === "fr" ? "Processus": "Process")}
                            {item.key === "contact" && (locale === "fr" ? "Contact"  : "Contact")}
                          </span>
                        </div>

                        {/* Arrow */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center text-gold"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M3 8h10M9 4l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                ))}

                {/* خط پایین آخرین آیتم */}
                <motion.div
                  custom={NAV_ITEMS.length}
                  variants={lineVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="h-[1px] origin-left bg-gradient-to-r from-gold/30 via-gold/10 to-transparent"
                />
              </nav>

              {/* Footer Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center justify-between"
              >
                {/* Brand */}
                <div className="space-y-1">
                  <p className="font-serif text-lg italic text-paper/50">
                    Atelier{" "}
                    <span className="text-gold">Shahrazad</span>
                  </p>
                  <p className="font-mono text-[9px] tracking-widest text-paper/25 uppercase">
                    The Golden Thread
                  </p>
                </div>

                {/* Language Switcher */}
                <button
                  onClick={() => {
                    onLangSwitch();
                    onClose();
                  }}
                  className="group flex items-center gap-3 rounded-full border border-gold/20 px-5 py-2.5 transition-all duration-300 hover:border-gold hover:bg-gold/5"
                >
                  <span className="font-mono text-[10px] tracking-[0.25em] text-paper/40 uppercase transition-colors group-hover:text-paper/70">
                    {locale === "en" ? "EN" : "FR"}
                  </span>
                  <div className="h-3 w-[1px] bg-gold/20" />
                  <span className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">
                    {locale === "en" ? "FR" : "EN"}
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}