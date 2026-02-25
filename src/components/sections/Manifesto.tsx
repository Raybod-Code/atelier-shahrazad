"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";

const easingLux = [0.22, 1, 0.36, 1] as const;

export default function Manifesto() {
  const t = useTranslations("Manifesto");
  const containerRef = useRef<HTMLDivElement>(null);

  // افکت پارالکس خیلی نرم برای هاله نوریِ بک‌گراند
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent py-32"
    >
      {/* ─── Background Glow ─── */}
      <motion.div 
        style={{ y: glowY }} 
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[120px]" 
      />

      <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center">
        
        {/* ─── Headline ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: easingLux }}
          className="mb-20"
        >
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-l from-gold/50 to-transparent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/80">
              The Manifesto
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-gold/50 to-transparent" />
          </div>
          <h2 className="font-serif text-4xl leading-tight text-paper md:text-5xl lg:text-6xl">
            {t("headline")}
          </h2>
        </motion.div>

        {/* ─── Story Paragraphs ─── */}
        <div className="space-y-12 font-sans text-lg font-light leading-[1.8] text-paper/70 md:text-xl md:leading-[2]">
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, delay: 0.1, ease: easingLux }}
          >
            {t("storyP1")}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, delay: 0.2, ease: easingLux }}
          >
            {t("storyP2")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, delay: 0.3, ease: easingLux }}
            className="text-xl font-medium text-gold md:text-2xl italic"
          >
            {t("storyP3")}
          </motion.p>

        </div>
      </div>
    </section>
  );
}