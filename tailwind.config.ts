import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // رنگ‌های اصلی از CSS Variables
        paper:    "rgb(var(--color-paper) / <alpha-value>)",
        gold:     "rgb(var(--color-gold) / <alpha-value>)",
        charcoal: "rgb(var(--color-charcoal) / <alpha-value>)",
        bg:       "rgb(var(--color-bg) / <alpha-value>)",

        "gold-light": "rgb(var(--color-gold-light) / <alpha-value>)",
        "gold-dark":  "rgb(var(--color-gold-dark) / <alpha-value>)",

        // ✅ اضافه شد — Header از این‌ها استفاده می‌کنه
        "muted-foreground": "rgb(var(--color-muted) / <alpha-value>)",
        border:             "rgb(var(--color-border) / 0.1)",

        // Semantic
        success: "rgb(var(--color-success) / <alpha-value>)",
        error:   "rgb(var(--color-error) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
      },

      fontFamily: {
        sans:  ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        mono:  ["JetBrains Mono", "Fira Code", "monospace"],
      },

      fontSize: {
        "fluid-xs":   "var(--font-size-xs)",
        "fluid-sm":   "var(--font-size-sm)",
        "fluid-base": "var(--font-size-base)",
        "fluid-lg":   "var(--font-size-lg)",
        "fluid-xl":   "var(--font-size-xl)",
        "fluid-2xl":  "var(--font-size-2xl)",
        "fluid-3xl":  "var(--font-size-3xl)",
        "fluid-hero": "var(--font-size-hero)",
      },

      // ✅ spacing اصلی حفظ شد + section/component اضافه شد
      spacing: {
        xs:        "var(--space-xs)",
        sm:        "var(--space-sm)",
        md:        "var(--space-md)",
        lg:        "var(--space-lg)",
        xl:        "var(--space-xl)",
        "2xl":     "var(--space-2xl)",
        section:   "var(--space-section)",
        component: "var(--space-component)",
      },

      transitionTimingFunction: {
        luxury:     "var(--ease-luxury)",
        elastic:    "var(--ease-elastic)",
        smooth:     "var(--ease-smooth)",
        "out-back": "var(--ease-out-back)",
      },

      transitionDuration: {
        fast:   "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow:   "var(--duration-slow)",
        slower: "var(--duration-slower)",
      },

      boxShadow: {
        gold: "var(--shadow-gold)",
        sm:   "var(--shadow-sm)",
        md:   "var(--shadow-md)",
        lg:   "var(--shadow-lg)",
      },

      // ✅ زیندکس از CSS variable (مثل نسخه اصلی)
      zIndex: {
        canvas:  "var(--z-canvas)",
        noise:   "var(--z-noise)",
        content: "var(--z-content)",
        header:  "var(--z-header)",
        modal:   "var(--z-modal)",
        tooltip: "var(--z-tooltip)",
      },

      // ✅ borderRadius حفظ شد (در نسخه قبلی حذف شده بود!)
      borderRadius: {
        sm:   "var(--border-radius-sm)",
        md:   "var(--border-radius-md)",
        lg:   "var(--border-radius-lg)",
        full: "var(--border-radius-full)",
      },

      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // ✅ حفظ شد
        "fade-down": {
          "0%":   { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // ✅ حفظ شد
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        // ✅ حفظ شد
        "slide-in-right": {
          "0%":   { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        // ✅ حفظ شد
        "slide-in-left": {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        // ✅ حفظ شد
        "pulse-gold": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
      },

      animation: {
        "fade-in":        "fade-in 0.5s ease-out",
        "fade-up":        "fade-up 0.6s ease-out",
        "fade-down":      "fade-down 0.6s ease-out",       // ✅ حفظ شد
        "scale-in":       "scale-in 0.4s ease-out",        // ✅ حفظ شد
        "slide-in-right": "slide-in-right 0.5s ease-out",  // ✅ حفظ شد
        "slide-in-left":  "slide-in-left 0.5s ease-out",   // ✅ حفظ شد
        shimmer:          "shimmer 2s linear infinite",
        "pulse-gold":     "pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", // ✅ حفظ شد
      },
    },
  },
  plugins: [],
};

export default config;
