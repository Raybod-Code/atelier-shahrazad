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
        // ✅ از CSS Variables استفاده می‌کنیم
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        "gold-light": "rgb(var(--color-gold-light) / <alpha-value>)",
        "gold-dark": "rgb(var(--color-gold-dark) / <alpha-value>)",
        charcoal: "rgb(var(--color-charcoal) / <alpha-value>)",
         bg: "var(--color-bg)",
        
        // Semantic
        success: "rgb(var(--color-success) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
      },
      
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      
      fontSize: {
        "fluid-xs": "var(--font-size-xs)",
        "fluid-sm": "var(--font-size-sm)",
        "fluid-base": "var(--font-size-base)",
        "fluid-lg": "var(--font-size-lg)",
        "fluid-xl": "var(--font-size-xl)",
        "fluid-2xl": "var(--font-size-2xl)",
        "fluid-3xl": "var(--font-size-3xl)",
        "fluid-hero": "var(--font-size-hero)",
      },
      
      spacing: {
        "xs": "var(--space-xs)",
        "sm": "var(--space-sm)",
        "md": "var(--space-md)",
        "lg": "var(--space-lg)",
        "xl": "var(--space-xl)",
        "2xl": "var(--space-2xl)",
      },
      
      transitionTimingFunction: {
        "luxury": "var(--ease-luxury)",
        "elastic": "var(--ease-elastic)",
        "smooth": "var(--ease-smooth)",
      },
      
      transitionDuration: {
        "fast": "var(--duration-fast)",
        "normal": "var(--duration-normal)",
        "slow": "var(--duration-slow)",
        "slower": "var(--duration-slower)",
      },
      
      boxShadow: {
        "gold": "var(--shadow-gold)",
      },
      
      zIndex: {
        "canvas": "var(--z-canvas)",
        "noise": "var(--z-noise)",
        "content": "var(--z-content)",
        "header": "var(--z-header)",
        "modal": "var(--z-modal)",
        "tooltip": "var(--z-tooltip)",
      },
      
      borderRadius: {
        "sm": "var(--border-radius-sm)",
        "md": "var(--border-radius-md)",
        "lg": "var(--border-radius-lg)",
        "full": "var(--border-radius-full)",
      },
      
      keyframes: {
        // Fade animations
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        
        // Scale animations
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        
        // Slide animations
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        
        // Shimmer effect
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        
        // Pulse gold
        "pulse-gold": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-up": "fade-up 0.6s ease-out",
        "fade-down": "fade-down 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-gold": "pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
