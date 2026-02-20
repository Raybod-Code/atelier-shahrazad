"use client";

import { motion, AnimatePresence, useAnimate, stagger } from "framer-motion";
import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
// حروف اسم برند برای انیمیشن حرف به حرف
// ─────────────────────────────────────────────
const BRAND_LINE1 = "ATELIER".split("");
const BRAND_LINE2 = "SHAHRAZAD".split("");

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [count,     setCount]     = useState(0);
  const [scope,     animate]      = useAnimate();

  // ─── Counter 0 → 100 ──────────────────────
  useEffect(() => {
    const duration  = 2800;
    const interval  = 30;
    const steps     = duration / interval;
    let   current   = 0;

    const timer = setInterval(() => {
      current += 100 / steps;
      if (current >= 100) {
        setCount(100);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // ─── Exit بعد از 3.2 ثانیه ────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // ─── انیمیشن حروف ─────────────────────────
  useEffect(() => {
    if (!scope.current) return;
    animate(
      ".char",
      { opacity: [0, 1], y: ["60%", "0%"] },
      {
        delay:    stagger(0.04, { startDelay: 0.4 }),
        duration: 0.6,
        ease:     [0.22, 1, 0.36, 1],
      }
    );
  }, [animate, scope]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          {/* ─── پس‌زمینه اصلی ─────────────────── */}
          <motion.div
            className="absolute inset-0 bg-[#050505]"
            exit={{ scaleY: 0, originY: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* ─── لایه طلایی که از پایین میاد ──── */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* ─── Noise texture ─────────────────── */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ─── محتوا ─────────────────────────── */}
          <div
            ref={scope}
            className="relative z-10 flex h-full flex-col items-center justify-center"
          >
            {/* خط طلایی بالا */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 h-[1px] w-32 origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
            />

            {/* ATELIER — حرف به حرف */}
            <div className="overflow-hidden mb-1">
              <div className="flex items-baseline gap-[0.12em]">
                {BRAND_LINE1.map((char, i) => (
                  <span
                    key={i}
                    className="char inline-block font-serif text-5xl font-light tracking-[0.35em] text-paper opacity-0 md:text-7xl"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* SHAHRAZAD — حرف به حرف */}
            <div className="overflow-hidden mb-10">
              <div className="flex items-baseline gap-[0.08em]">
                {BRAND_LINE2.map((char, i) => (
                  <span
                    key={i}
                    className="char inline-block font-serif text-5xl font-extralight italic tracking-[0.2em] text-gold opacity-0 md:text-7xl"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mb-16 font-mono text-[9px] tracking-[0.5em] text-gold/50 uppercase"
            >
              The Golden Thread
            </motion.p>

            {/* Progress */}
            <div className="flex flex-col items-center gap-4">
              {/* نوار progress */}
              <div className="relative h-[1px] w-48 overflow-hidden bg-white/10">
                <motion.div
                  className="absolute inset-0 origin-left bg-gradient-to-r from-gold/60 via-gold to-gold/60"
                  style={{ scaleX: count / 100 }}
                  transition={{ duration: 0.05 }}
                />
              </div>

              {/* عدد counter */}
              <div className="flex items-baseline gap-1">
                <motion.span
                  key={count}
                  className="font-mono text-2xl font-light tabular-nums text-paper/60"
                >
                  {String(count).padStart(3, "0")}
                </motion.span>
                <span className="font-mono text-xs text-gold/40">%</span>
              </div>
            </div>

            {/* خط طلایی پایین */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 h-[1px] w-32 origin-right bg-gradient-to-r from-transparent via-gold to-transparent"
            />
          </div>

          {/* ─── پرده خروج — دو تکه بالا/پایین ── */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 origin-top bg-[#050505]"
            initial={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-[#050505]"
            initial={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
