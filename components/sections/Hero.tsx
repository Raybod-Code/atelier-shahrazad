"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "../../navigation";
// FluidBackground حذف شد ❌

export default function Hero() {
  const t = useTranslations("HomePage");

  return (
    // تغییر مهم: bg-transparent اضافه شد تا نخ طلایی پشتش دیده بشه
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* لایه FluidBackground حذف شد چون الان Scene سراسری داریم */}

      {/* Content Layer */}
      <div className="container px-6 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium tracking-tight text-paper mb-6 mix-blend-difference"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl text-paper/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/contact"
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-[#C7A56A]/50 hover:border-[#C7A56A] transition-colors duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-[#C7A56A]/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
            <span className="relative font-sans text-xs tracking-[0.2em] uppercase text-[#C7A56A] group-hover:text-paper font-bold">
              {t("cta")}
            </span>
          </Link>

          <Link
            href="/#works"
            className="text-xs font-sans tracking-widest uppercase text-paper/50 hover:text-[#C7A56A] transition-colors border-b border-transparent hover:border-[#C7A56A] pb-1"
          >
            View selected works
          </Link>
        </motion.div>
      </div>

      {/* خط راهنما پایین صفحه */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 80, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent to-[#C7A56A]"
      />
    </section>
  );
}