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
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "#0a0908",
        jet_black: "#22333b",
        stone_brown: "#5e503f",
        almond_cream: "#eae0d5",
        khaki_beige: "#c6ac8f",
      },
    },
  },
  plugins: [],
};
export default config;
