"use client";

import { useTranslations }               from "next-intl";
import { motion, AnimatePresence }        from "framer-motion";
import { useForm, ValidationError }       from "@formspree/react";
import { ArrowUpRight, Mail, Clock, MapPin } from "lucide-react";
import FluidBackground                   from "@/components/canvas/FluidBackground";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface InputGroupProps {
  id:          string;
  name:        string;
  label:       string;
  placeholder: string;
  required?:   boolean;
  type?:       string;
}

const easingLux = [0.22, 1, 0.36, 1] as const;

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function Contact() {
  const t = useTranslations("Contact");
  const [state, handleSubmit] = useForm("mnjnalwb");

  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <FluidBackground />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute left-[10%] top-[20%] h-[600px] w-[600px] rounded-full bg-gold/[0.07] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[5%] h-[400px] w-[400px] rounded-full bg-gold/[0.04] blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">

        {/* ─── Page Title ───────────────────── */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: easingLux }}
              className="h-[1px] w-16 origin-left bg-gradient-to-r from-gold to-transparent"
            />
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold/60 uppercase">
              {t("overline")}
            </span>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: easingLux }}
              className="font-serif text-6xl leading-none tracking-tight text-paper md:text-8xl"
            >
              {t("title")}
            </motion.h1>
          </div>
        </div>

        {/* ─── Main Grid ────────────────────── */}
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">

          {/* ─── Left: Info ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: easingLux }}
            className="space-y-14 lg:w-[38%]"
          >
            {/* Subtitle */}
            <p className="font-sans text-lg leading-relaxed text-paper/60">
              {t("subtitle")}
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />

            {/* Info Items */}
            <div className="space-y-10">
              {/* Email */}
              <div className="group space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-3 w-3 text-gold/60" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-gold/60 uppercase">
                    {t("info.email")}
                  </span>
                </div>
                <a
                  href="mailto:hello@shahrazad.com"
                  className="group flex items-center gap-3 font-serif text-2xl text-paper transition-colors duration-300 hover:text-gold"
                >
                  hello@shahrazad.com
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>

              {/* Response Time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-3 w-3 text-gold/60" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-gold/60 uppercase">
                    {t("info.response")}
                  </span>
                </div>
                <p className="font-sans text-paper/70">
                  {t("info.responseTime")}
                </p>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-3 w-3 text-gold/60" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-gold/60 uppercase">
                    {t("info.location")}
                  </span>
                </div>
                <p className="font-sans text-paper/70">
                  {t("info.locationValue")}
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-2 border-gold/30 pl-6">
              <p className="font-serif text-lg italic leading-relaxed text-paper/40">
                "{t("quote")}"
              </p>
            </div>
          </motion.div>

          {/* ─── Right: Form ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: easingLux }}
            className="lg:w-[62%]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm md:p-12">

              {/* Corner decoration */}
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-gradient-to-bl from-gold/[0.06] to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 bg-gradient-to-tr from-gold/[0.04] to-transparent" />

              <AnimatePresence mode="wait">

                {/* ─── Success State ──────────── */}
                {state.succeeded ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: easingLux }}
                    className="flex min-h-[500px] flex-col items-center justify-center py-12 text-center md:py-20"
                  >
                    {/* خط طلایی */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "80px" }}
                      transition={{ delay: 0.3, duration: 1, ease: "circOut" }}
                      className="mb-10 h-[1px] bg-gold"
                    />

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="mb-6 font-serif text-5xl italic text-paper md:text-6xl"
                    >
                      Received.
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="mb-12 max-w-sm font-sans text-sm leading-relaxed tracking-wide text-paper/60"
                    >
                      Your vision has been captured. <br />
                      We will respond within 24 hours.
                    </motion.p>

                    <motion.a
                      href="/"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-gold/70 transition-colors hover:text-gold"
                    >
                      <span className="h-[1px] w-6 bg-gold/40 transition-all duration-300 group-hover:w-10" />
                      Return to Atelier
                    </motion.a>
                  </motion.div>

                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 space-y-12"
                  >
                    {/* Form Header */}
                    <div className="mb-10 border-b border-white/5 pb-8">
                      <h2 className="font-serif text-3xl text-paper md:text-4xl">
                        {t("form.heading")}
                      </h2>
                      <p className="mt-2 font-sans text-sm text-paper/40">
                        {t("form.subheading")}
                      </p>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                      <InputGroup
                        id="name"
                        name="name"
                        label={t("form.name")}
                        placeholder="Jane Doe"
                        required
                      />
                      <div className="space-y-4">
                        <label
                          htmlFor="email"
                          className="block font-mono text-xs uppercase tracking-widest text-gold/80"
                        >
                          {t("form.email")}
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          className="w-full border-b border-white/10 bg-transparent py-4 text-xl text-paper placeholder:text-white/10 focus:border-gold focus:outline-none transition-colors duration-300"
                          placeholder="jane@example.com"
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                          className="text-xs text-red-400"
                        />
                      </div>
                    </div>

                    {/* Budget */}
                    <InputGroup
                      id="budget"
                      name="budget"
                      label={t("form.budget")}
                      placeholder="50–100k €"
                    />

                    {/* Message */}
                    <div className="space-y-4">
                      <label
                        htmlFor="message"
                        className="block font-mono text-xs uppercase tracking-widest text-gold/80"
                      >
                        {t("form.message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full resize-none border-b border-white/10 bg-transparent py-4 text-xl text-paper placeholder:text-white/10 focus:border-gold focus:outline-none transition-colors duration-300"
                        placeholder="Tell us about your next masterpiece..."
                      />
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                        className="text-xs text-red-400"
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-8">
                      <p className="font-mono text-[10px] tracking-widest text-paper/25 uppercase">
                        {t("form.privacy")}
                      </p>

                      <motion.button
                        type="submit"
                        disabled={state.submitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-charcoal transition-all duration-300 hover:bg-paper disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {/* shimmer */}
                        <motion.span
                          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ translateX: ["−100%", "200%"] }}
                          transition={{
                            duration:    1.5,
                            repeat:      Infinity,
                            repeatDelay: 2,
                          }}
                        />
                        <span className="relative">
                          {state.submitting ? t("form.sending") : t("form.send")}
                        </span>
                        <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Input Group
// ─────────────────────────────────────────────

function InputGroup({ id, name, label, placeholder, required, type = "text" }: InputGroupProps) {
  return (
    <div className="space-y-4">
      <label
        htmlFor={id}
        className="block font-mono text-xs uppercase tracking-widest text-gold/80"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full border-b border-white/10 bg-transparent py-4 text-xl text-paper placeholder:text-white/10 focus:border-gold focus:outline-none transition-colors duration-300"
        placeholder={placeholder}
      />
    </div>
  );
}
