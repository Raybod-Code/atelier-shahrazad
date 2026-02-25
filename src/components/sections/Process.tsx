"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface StepItemProps {
  step:  string;
  index: number;
  t:     (key: string) => string;
}

const STEPS = ["01", "02", "03", "04"];
const easingLux = [0.22, 1, 0.36, 1] as const;

// ─────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────

export default function Process() {
  const t            = useTranslations("Process");
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef  = useRef<HTMLDivElement>(null); 

  // اسکرول برای Parallax هدر
  const { scrollYProgress: sectionProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // اسکرول اختصاصی برای پر شدن خط طلایی (دقیق و به‌موقع)
  const { scrollYProgress: lineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(lineProgress, [0, 1], ["0%", "100%"]);
  const headerY = useTransform(sectionProgress, [0, 0.3], ["0px", "-30px"]);
  const headerO = useTransform(sectionProgress, [0, 0.3], [1, 0.6]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-32 bg-transparent relative overflow-hidden"
    >
      <div className="container px-6 mx-auto relative z-10 max-w-5xl">

        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerO }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8"
        >
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: easingLux }}
              className="font-serif text-5xl md:text-6xl text-paper"
            >
              {t("title")}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-sans text-paper/50 text-sm max-w-xs text-left md:text-right"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* ✅ خط خاکستری (محاسبه دقیق با calc) */}
          <div className="absolute left-[15px] md:left-[calc(50%_-_0.5px)] top-0 bottom-0 w-[1px] bg-white/10" />

          {/* ✅ خط طلایی پیشرفت (محاسبه دقیق با calc) */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[15px] md:left-[calc(50%_-_0.5px)] top-0 w-[1px] bg-gold shadow-[0_0_15px_rgba(199,165,106,0.6)] origin-top"
          />

          {/* Steps */}
          <div className="space-y-24 md:space-y-32">
            {STEPS.map((step, index) => (
              <StepItem key={step} step={step} index={index} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Step Item
// ─────────────────────────────────────────────

function StepItem({ step, index, t }: StepItemProps) {
  const isEven  = index % 2 === 0;
  const ref     = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 40%"],
  });

  const dotScale  = useTransform(scrollYProgress, [0, 1], [0.6, 1.4]);
  const dotColor  = useTransform(scrollYProgress, [0, 0.8], ["rgba(255, 255, 255, 0.2)", "rgba(199, 165, 106, 1)"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.9, ease: easingLux }}
      className={`relative flex flex-col md:flex-row items-start ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } gap-8 md:gap-0`}
    >
      {/* ✅ Dot (محاسبه دقیق با calc و حذف translate-x-1/2) */}
      <motion.div
        style={{ scale: dotScale, backgroundColor: dotColor }}
        className="absolute left-[11px] md:left-[calc(50%_-_4px)] top-0 w-2 h-2 rounded-full z-10 translate-y-2.5 shadow-[0_0_12px_rgba(199,165,106,0.8)]"
      />

      {/* محتوا */}
      <div
        className={`pl-12 md:pl-0 md:w-1/2 ${
          isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
        }`}
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-mono text-xs text-gold/60 tracking-widest uppercase mb-2 block"
        >
          Step {step}
        </motion.span>

        <div className="overflow-hidden mb-4">
          <motion.h3
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: easingLux }}
            className="font-serif text-3xl text-paper"
          >
            {t(`steps.${step}.title`)}
          </motion.h3>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="font-sans text-paper/60 text-sm leading-relaxed max-w-sm"
          style={{ marginLeft: isEven ? "auto" : undefined }}
        >
          {t(`steps.${step}.desc`)}
        </motion.p>
      </div>

      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
}