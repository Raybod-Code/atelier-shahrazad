import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        gold: "var(--color-gold)",
        charcoal: "var(--color-charcoal)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      transitionTimingFunction: {
        'luxury': 'var(--ease-luxury)',
        'elastic': 'var(--ease-elastic)',
      },
    },
  },
  plugins: [],
};

export default config;