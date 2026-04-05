import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 20px 45px -18px rgba(15, 23, 42, 0.35)"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;
