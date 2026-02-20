"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-bg pt-32 pb-10 border-t border-white/5 relative overflow-hidden">

      {/* Glow Effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px"
        style={{
          background: "linear-gradient(to right, transparent, var(--color-gold) 50%, transparent)",
          opacity: 0.4,
        }}
      />

      <div className="container px-6 mx-auto">

        {/* Big CTA */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="font-mono text-xs text-gold/50 tracking-[0.3em] uppercase mb-6 block">
            {t("cta")}
          </span>

          <Link href="/contact" className="group inline-flex items-center gap-4 md:gap-8">
            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl text-paper group-hover:text-gold transition-colors duration-700 ease-luxury">
              {t("bigLink")}
            </h2>
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-500 shrink-0">
              <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10 text-paper group-hover:text-charcoal transition-colors duration-300" />
            </div>
          </Link>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 border-t border-white/5 pt-16 mb-16">

          {/* Sitemap */}
          <div>
            <h4 className="font-mono text-[10px] text-paper/30 uppercase tracking-[0.25em] mb-6">
              {t("sitemap")}
            </h4>
            <ul className="space-y-4">
              {["Works", "Process", "Pricing"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-paper/50 hover:text-gold transition-colors duration-300 font-sans text-sm group flex items-center gap-1"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300 overflow-hidden" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

                   {/* Socials */}
          <div>
            <h4 className="font-mono text-[10px] text-paper/30 uppercase tracking-[0.25em] mb-6">
              {t("socials")}
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Instagram", href: "#" },
                { label: "Twitter / X", href: "#" },
                { label: "LinkedIn", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper/50 hover:text-gold transition-colors duration-300 font-sans text-sm group flex items-center gap-1"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300 overflow-hidden" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Block */}
          <div className="col-span-2 md:col-span-2 md:text-right">
            <Link
              href="/"
              className="font-serif text-2xl text-paper block mb-4 hover:text-gold transition-colors duration-300"
            >
              Atelier <span className="text-gold italic">Shahrazad</span>
            </Link>
            <p className="text-paper/30 text-sm max-w-xs md:ml-auto leading-relaxed">
              Crafting digital legacies for brands<br />
              that dare to be different.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[10px] text-paper/20 pt-8 border-t border-white/5 font-mono tracking-wider">
          <p>{t("copyright")}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-paper/40 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-paper/40 transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
