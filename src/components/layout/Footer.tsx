"use client";

import { useTranslations } from "next-intl";
import { Link }            from "@/navigation";
import { motion }          from "framer-motion";
import { ArrowUpRight }    from "lucide-react";
import { SOCIAL_LINKS }    from "@/constants/navigation";

const easingLux = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050505] pb-10 pt-32">

      {/* خط طلایی بالا */}
      <div
        className="absolute left-1/2 top-0 h-px w-full max-w-3xl -translate-x-1/2"
        style={{
          background:
            "linear-gradient(to right, transparent, rgb(199 165 106 / 0.5) 50%, transparent)",
        }}
      />

      {/* Gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gold/[0.04] blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">

        {/* ─── Big CTA ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: easingLux }}
          className="mb-28 text-center"
        >
          <span className="mb-8 block font-mono text-[10px] tracking-[0.35em] text-gold/50 uppercase">
            {t("cta")}
          </span>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-6 md:gap-10"
          >
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: easingLux }}
                className="font-serif text-6xl text-paper transition-colors duration-700 group-hover:text-gold md:text-8xl lg:text-9xl"
              >
                {t("bigLink")}
              </motion.h2>
            </div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:border-gold group-hover:bg-gold md:h-20 md:w-20"
            >
              <ArrowUpRight className="h-6 w-6 text-paper transition-colors duration-300 group-hover:text-charcoal md:h-10 md:w-10" />
            </motion.div>
          </Link>
        </motion.div>

        {/* ─── Links Grid ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mb-16 grid grid-cols-2 gap-10 border-t border-white/5 pt-16 md:grid-cols-4 md:gap-0"
        >

          {/* Sitemap */}
          <div>
            <h4 className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/25">
              {t("sitemap")}
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Works",   href: "/#works"   },
                { label: "Process", href: "/#process" },
                { label: "Contact", href: "/contact"  },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 font-sans text-sm text-paper/45 transition-colors duration-300 hover:text-gold"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/25">
              {t("socials")}
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Instagram", href: SOCIAL_LINKS.instagram },
                { label: "Behance",   href: SOCIAL_LINKS.behance   },
                { label: "LinkedIn",  href: SOCIAL_LINKS.linkedin  },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-sans text-sm text-paper/45 transition-colors duration-300 hover:text-gold"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Block */}
          <div className="col-span-2 md:text-right">
            <Link
              href="/"
              className="mb-4 block font-serif text-2xl text-paper transition-colors duration-300 hover:text-gold"
            >
              Atelier{" "}
              <span className="italic text-gold">Shahrazad</span>
            </Link>
            <p className="mb-6 max-w-xs font-sans text-sm leading-relaxed text-paper/25 md:ml-auto">
              Crafting digital legacies for brands<br />
              that dare to be different.
            </p>

            {/* Email */}
            <a
              href="mailto:hello@shahrazad.com"
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold/50 transition-colors duration-300 hover:text-gold"
            >
              hello@shahrazad.com
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100" />
            </a>
          </div>
        </motion.div>

        {/* ─── Bottom Bar ───────────────────── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-mono text-[10px] tracking-wider text-paper/20">
            {t("copyright")}
          </p>

          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <span
                key={item}
                className="cursor-pointer font-mono text-[10px] tracking-wider text-paper/20 transition-colors duration-300 hover:text-paper/40"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
