import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#931F5A",
        secondary: "#353B77",
        tertiary: "#F8F9FA",
        ink: "#1B1831",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-urbanist)", ...defaultTheme.fontFamily.sans],
        urbanist: ["var(--font-urbanist)", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #931F5A 0%, #353B77 100%)",
        "brand-gradient-b": "linear-gradient(180deg, #931F5A 0%, #353B77 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
