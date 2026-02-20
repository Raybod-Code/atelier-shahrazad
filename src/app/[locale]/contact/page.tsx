"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import FluidBackground from "@/components/canvas/FluidBackground";

export default function Contact() {
  const t = useTranslations("Contact");

  // کد فرم شما
  const [state, handleSubmit] = useForm("mnjnalwb");

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <FluidBackground />

      <div className="container px-6 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-1/3 space-y-12"
          >
            <div>
              <h1 className="font-serif text-6xl md:text-7xl text-paper mb-6">
                {t("title")}
              </h1>
              <p className="text-paper/60 text-lg leading-relaxed">
                {t("subtitle")}
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-mono text-xs text-gold uppercase tracking-widest mb-3">
                  {t("info.email")}
                </h3>
                <a
                  href="mailto:hello@shahrazad.com"
                  className="text-2xl text-paper hover:text-gold transition-colors font-serif"
                >
                  hello@shahrazad.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form OR Success Message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-2/3 bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-2xl backdrop-blur-sm"
          >
            {/* 👇 بخش آپدیت شده: دیزاین لوکس موفقیت 👇 */}
            {state.succeeded ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center justify-center text-center h-full py-12 md:py-20 min-h-[500px]"
              >
                {/* خط طلایی متحرک */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 0.3, duration: 1, ease: "circOut" }}
                  className="h-[1px] bg-gold mb-10"
                />

                {/* تیتر بزرگ و ایتالیک */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="font-serif text-5xl md:text-6xl text-paper mb-6 italic"
                >
                  Received.
                </motion.h3>

                {/* متن توضیحات */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="text-paper/60 max-w-sm font-sans text-sm leading-relaxed mb-12 tracking-wide"
                >
                  Your vision has been captured. <br />
                  We are reviewing your inquiry and will respond within 24
                  hours.
                </motion.p>

                {/* دکمه بازگشت */}
                <motion.a
                  href="/"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="group flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-gold/70 hover:text-gold transition-colors cursor-pointer"
                >
                  <span className="w-6 h-[1px] bg-gold/40 group-hover:w-10 transition-all duration-300" />
                  Return to Atelier
                </motion.a>
              </motion.div>
            ) : (
              /* 👇 فرم اصلی (بدون تغییر) 👇 */
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <InputGroup
                    id="name"
                    name="name"
                    label={t("form.name")}
                    placeholder="John Doe"
                    required
                  />
                  <div className="space-y-4">
                    <label className="block font-mono text-xs text-gold/80 uppercase tracking-widest">
                      {t("form.email")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="w-full bg-transparent border-b border-white/10 text-paper text-xl py-4 focus:outline-none focus:border-gold transition-colors placeholder:text-white/10"
                      placeholder="john@example.com"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="text-red-400 text-xs"
                    />
                  </div>
                </div>

                <InputGroup
                  id="budget"
                  name="budget"
                  label={t("form.budget")}
                  placeholder="50-100k..."
                />

                <div className="space-y-4">
                  <label className="block font-mono text-xs text-gold/80 uppercase tracking-widest">
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-white/10 text-paper text-xl py-4 focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-white/10"
                    placeholder="Tell us about your next masterpiece..."
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-red-400 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="px-8 py-4 bg-gold text-charcoal font-bold tracking-wide uppercase hover:bg-paper transition-colors rounded-sm w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? "Sending..." : t("form.send")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ id, name, label, placeholder, required }: any) {
  return (
    <div className="space-y-4">
      <label
        htmlFor={id}
        className="block font-mono text-xs text-gold/80 uppercase tracking-widest"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        required={required}
        className="w-full bg-transparent border-b border-white/10 text-paper text-xl py-4 focus:outline-none focus:border-gold transition-colors placeholder:text-white/10"
        placeholder={placeholder}
      />
    </div>
  );
}
