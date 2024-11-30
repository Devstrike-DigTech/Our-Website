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
        primary: "#931F5A",
        secondary: "#353B77",
        tertiary: "#F8F9FA",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        urbanist: ["var(--font-urbanist)"],
      },
    },
  },
  plugins: [],
};
export default config;
