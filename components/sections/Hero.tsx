"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import FluidBackground from "../canvas/FluidBackground";
import { Link } from "../../navigation";

export default function Hero() {
  const t = useTranslations("HomePage");

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FluidBackground />
      </div>

      {/* Content Layer */}
      <div className="container px-6 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-paper mb-6"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl text-paper/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-gold/40 hover:border-gold transition-colors duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-gold/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
            <span className="relative font-sans text-sm tracking-widest uppercase text-gold group-hover:text-paper font-semibold">
              {t("cta")}
            </span>
          </Link>

          <Link
            href="/works"
            className="text-sm font-sans text-paper/50 hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-0.5"
          >
            View selected works
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 60 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent to-gold opacity-50 z-10"
      />
    </section>
  );
}
