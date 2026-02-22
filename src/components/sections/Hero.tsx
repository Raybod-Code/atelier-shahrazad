"use client";

import { useTranslations }            from "next-intl";
import { motion }                      from "framer-motion";
import { Link }                        from "@/navigation";
import { ArrowDown }                   from "lucide-react";
import { HERO_STATS, HERO_META }       from "@/constants/hero";
import { useCountUp }                  from "@/hooks/useCountUp";

const easingLux = [0.22, 1, 0.36, 1] as const;

// ─────────────────────────────────────────────
// کلمه به کلمه انیمیشن
// ─────────────────────────────────────────────
function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.25em]">
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%"   }}
            transition={{
              delay:    0.4 + i * 0.1,
              duration: 0.8,
              ease:     easingLux,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────
// Animated Counter — هر عدد یه instance جداست
// ─────────────────────────────────────────────
function StatCounter({ num, suffix, label }: {
  num:    number;
  suffix: string;
  label:  string;
}) {
  const { count, ref } = useCountUp({ end: num, duration: 1800 });

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-serif text-xl text-gold tabular-nums">
        {count}{suffix}
      </span>
      <span className="font-mono text-[8px] tracking-widest text-paper/25 uppercase">
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Hero
// ─────────────────────────────────────────────
export default function Hero() {
  const t = useTranslations("HomePage");

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-transparent">

      {/* ─── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[25%] h-[500px] w-[500px] rounded-full bg-gold/[0.06] blur-[100px]" />
        <div className="absolute right-[8%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-gold/[0.04] blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* ─── Content ── */}
      <div className="container relative z-10 px-6 text-center">

        {/* Overline — badge از constants */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-10 flex items-center justify-center gap-4"
        >
          <div className="h-[1px] w-10 bg-gradient-to-l from-gold/50 to-transparent" />
          <span className="font-mono text-[9px] tracking-[0.45em] text-gold/55 uppercase">
            {HERO_META.badge}
          </span>
          <div className="h-[1px] w-10 bg-gradient-to-r from-gold/50 to-transparent" />
        </motion.div>

        {/* Title */}
        <h1 className="mb-8 font-serif text-fluid-hero font-light leading-[0.9] tracking-tight text-paper">
          <AnimatedTitle text={t("title")} />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: 0.85, duration: 0.8, ease: easingLux }}
          className="mx-auto mb-12 max-w-2xl font-sans text-fluid-lg font-light leading-relaxed text-paper/55"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: 1, duration: 0.7, ease: easingLux }}
          className="flex flex-col items-center justify-center gap-6 md:flex-row"
        >
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full border border-gold/40 px-10 py-4 transition-all duration-500 hover:border-gold hover:shadow-gold"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-gold/10 transition-transform duration-500 group-hover:scale-x-100" />
            <span className="relative font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              {t("cta")}
            </span>
          </Link>

          <Link
            href="/#works"
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40 transition-colors duration-300 hover:text-gold"
          >
            <span className="h-[1px] w-5 bg-paper/20 transition-all duration-300 group-hover:w-8 group-hover:bg-gold" />
            {t("scroll")}
          </Link>
        </motion.div>

        {/* Stats — Animated Counters از constants */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mx-auto mt-16 flex max-w-lg items-center justify-center gap-10 border-t border-white/5 pt-8"
        >
          {HERO_STATS.map((stat) => (
            <StatCounter
              key={stat.label}
              num={stat.num}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>

      {/* ─── Scroll line ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-gold opacity-60" />

      {/* ─── Arrow bounce ── */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="h-4 w-4 text-gold/35" />
      </motion.div>

      {/* ─── Corner text — از constants ── */}
      <span className="absolute bottom-8 right-8 hidden font-mono text-[9px] tracking-widest text-paper/12 uppercase md:block">
        Est. {HERO_META.established} — {HERO_META.location}
      </span>
    </section>
  );
}
