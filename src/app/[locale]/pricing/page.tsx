"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { Check, ArrowUpRight, Sparkles, Layers, Crown } from "lucide-react";
import FluidBackground from "@/components/canvas/FluidBackground";

const easingLux = [0.22, 1, 0.36, 1] as const;

const FEATURE_KEYS = ["f1", "f2", "f3", "f4", "f5", "f6"] as const;

const PLANS = [
  { key: "essential", icon: Sparkles, highlight: false },
  { key: "atelier",   icon: Layers,   highlight: true },
  { key: "bespoke",   icon: Crown,    highlight: false },
] as const;

export default function Pricing() {
  const t = useTranslations("Pricing");

  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-24">
      {/* ─── پس‌زمینه سه‌بعدی ── */}
      <div className="fixed inset-0 -z-10">
        <FluidBackground />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* ─── Header ───────────────────── */}
        <div className="mb-20 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: easingLux }}
              className="h-[1px] w-12 origin-right bg-gradient-to-l from-gold/60 to-transparent"
            />
            <motion.span
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60"
            >
              {t("overline")}
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: easingLux }}
              className="h-[1px] w-12 origin-left bg-gradient-to-r from-gold/60 to-transparent"
            />
          </div>

          <div className="mb-6 overflow-hidden">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, ease: easingLux }}
              className="font-serif text-5xl text-paper md:text-6xl lg:text-7xl"
            >
              {t("title")}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto max-w-xl font-sans text-sm leading-relaxed text-paper/50"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* ─── Cards ────────────────────── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PLANS.map(({ key, icon: Icon, highlight }, i) => {
            const price = t(`plans.${key}.price`);
            const isCustom = price === "Custom" || price === "Personnalisé";

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + i * 0.15,
                  duration: 0.9,
                  ease: easingLux,
                }}
                className={`
                  group relative overflow-hidden rounded-2xl border p-10
                  transition-all duration-700 hover:-translate-y-2
                  ${
                    highlight
                      ? "bg-[#0A0A0B] border-gold/40 hover:border-gold/80 hover:shadow-[0_0_40px_rgba(199,165,106,0.15)]"
                      : "bg-[#0A0A0B]/80 border-white/5 hover:border-gold/30 backdrop-blur-md"
                  }
                `}
              >
                {/* Hover gradient (نرم و ابریشمی) */}
                <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.08] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                {/* Top glow برای پلن ویژه */}
                {highlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.08] to-transparent" />
                )}

                {/* Decorative number */}
                <div className="absolute -right-4 -top-8 select-none font-serif text-9xl text-white/[0.02] transition-colors duration-700 group-hover:text-gold/[0.05]">
                  0{i + 1}
                </div>

                {/* Badge محبوب‌ترین */}
                {highlight && (
                  <div className="absolute right-6 top-6 z-10">
                    <span className="border border-gold/40 bg-gold/5 backdrop-blur-sm px-3 py-1.5 rounded-full font-mono text-[8px] uppercase tracking-widest text-gold shadow-[0_0_15px_rgba(199,165,106,0.2)]">
                      {t("popular")}
                    </span>
                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col items-center text-center">
                  
                  {/* Icon (انیمیشن با Tailwind یکپارچه شد) */}
                  <div className="relative mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#0A0A0B] transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:border-gold/50 relative z-10">
                      <Icon
                        className="h-6 w-6 text-paper/70 transition-colors duration-500 group-hover:text-gold"
                        strokeWidth={1.5}
                      />
                    </div>
                    {/* Glow پشت آیکون در زمان Hover */}
                    <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl opacity-0 transition-opacity duration-700 scale-150 group-hover:opacity-100" />
                  </div>

                  {/* Plan name */}
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-gold/60">
                    {t(`plans.${key}.name`)}
                  </span>

                  {/* Price */}
                  <div className="mb-3 flex items-end gap-1">
                    {!isCustom && (
                      <span className="mb-2 font-mono text-xs text-paper/35">
                        €
                      </span>
                    )}
                    <span className="font-serif text-5xl leading-none text-paper transition-colors duration-500 group-hover:text-gold">
                      {price}
                    </span>
                  </div>

                  {/* Expand line (انیمیشن خالص CSS برای جلوگیری از تداخل) */}
                  <div className="my-6 h-px w-12 bg-gold/20 transition-all duration-700 ease-out group-hover:w-[80%] group-hover:bg-gold/40" />

                  {/* Description */}
                  <p className="mb-8 font-sans text-sm leading-relaxed text-paper/55 transition-colors duration-500 group-hover:text-paper/80">
                    {t(`plans.${key}.desc`)}
                  </p>

                  {/* Separator */}
                  <div className="mb-8 h-px w-full bg-white/5" />

                  {/* Features */}
                  <ul className="mb-10 w-full space-y-4 text-left">
                    {FEATURE_KEYS.map((fKey) => (
                      <li key={fKey} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-gold/70 transition-colors duration-500 group-hover:text-gold" />
                        <span className="font-sans text-sm text-paper/55 transition-colors duration-500 group-hover:text-paper/80">
                          {t(`plans.${key}.${fKey}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className={`
                      group/btn mt-auto flex w-full items-center justify-center gap-3
                      rounded-full border py-4
                      font-mono text-[10px] uppercase tracking-[0.2em]
                      transition-all duration-500 cursor-pointer
                      ${
                        highlight
                          ? "border-gold bg-gold text-charcoal hover:border-paper hover:bg-paper"
                          : "border-white/10 text-paper/45 hover:border-gold hover:text-gold"
                      }
                    `}
                  >
                    {t("cta")}
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-500 ease-out group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Bottom note ──────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 text-center font-mono text-[10px] uppercase tracking-widest text-paper/20"
        >
          {t("note")}
        </motion.p>
      </div>
    </div>
  );
}