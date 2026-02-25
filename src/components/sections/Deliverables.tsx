"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollText, Zap, Move3d, type LucideIcon } from "lucide-react";
import { useRef } from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Feature {
  id:   string;
  icon: LucideIcon;
}

interface FeatureCardProps {
  feature: Feature;
  index:   number;
  t:       (key: string) => string;
}

const FEATURES: Feature[] = [
  { id: "01", icon: ScrollText },
  { id: "02", icon: Move3d     },
  { id: "03", icon: Zap        },
];

const easingLux = [0.22, 1, 0.36, 1] as const;

// ─────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────
export default function Deliverables() {
  const t            = useTranslations("Deliverables");
  const sectionRef   = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-transparent py-32 overflow-hidden"
    >
      <div className="container px-6 mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20 md:mb-28 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easingLux }}
              className="h-[1px] w-12 origin-right bg-gradient-to-l from-gold/60 to-transparent"
            />
            <motion.span
              initial={{ opacity: 0, y: 8, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono text-[10px] tracking-[0.35em] text-gold/60 uppercase"
            >
              Digital Atelier Standards
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easingLux }}
              className="h-[1px] w-12 origin-left bg-gradient-to-r from-gold/60 to-transparent"
            />
          </div>

          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easingLux }}
            className="font-serif text-4xl md:text-5xl text-paper mb-6"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-sans text-paper/50 text-sm md:text-base leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              t={t}
            />
          ))}
        </div>
      </div>

      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[500px] bg-gradient-to-r from-transparent via-gold/[0.04] to-transparent rotate-12 blur-3xl"
      />
    </section>
  );
}

// ─────────────────────────────────────────────
// Feature Card
// ─────────────────────────────────────────────
function FeatureCard({ feature, index, t }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.15, duration: 0.9, ease: easingLux }}
      className="group relative p-10 bg-[#0A0A0B] border border-white/5 hover:border-gold/30 transition-colors duration-700 rounded-2xl overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="absolute -right-4 -top-8 font-serif text-9xl text-white/[0.02] group-hover:text-gold/[0.05] transition-colors duration-700 select-none">
        {feature.id}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-8 relative">
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/50 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 ease-out bg-[#0A0A0B] relative z-10">
            <Icon className="w-6 h-6 text-paper/70 group-hover:text-gold transition-colors duration-500" strokeWidth={1.5} />
          </div>
          {/* افکت درخشش پشت آیکون */}
          <div className="absolute inset-0 bg-gold/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-150" />
        </div>

        <h3 className="font-serif text-2xl text-paper mb-4 group-hover:text-gold transition-colors duration-500">
          {t(`items.${feature.id}.title`)}
        </h3>

        {/* خط جداکننده بهینه شده */}
        <div className="h-px w-12 bg-gold/20 my-4 transition-all duration-700 ease-out group-hover:w-[80%] group-hover:bg-gold/40" />

        <p className="font-sans text-sm leading-relaxed text-paper/60 group-hover:text-paper/80 transition-colors duration-500">
          {t(`items.${feature.id}.description`)}
        </p>
      </div>
    </motion.div>
  );
}