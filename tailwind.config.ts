import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // چون پوشه app توی روت هست، این مسیر درسته:
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0B0B0C",
        paper: "#F5F1EA",
        gold: "#C7A56A",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;