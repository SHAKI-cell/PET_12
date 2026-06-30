import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        coral: "#E36B5A",
        "coral-light": "#FDE8E4",
        emerald: "#4A9B7A",
        "emerald-light": "#E6F4EE",
        slate: {
          50: "#F8F9FA",
          100: "#F0F3F4",
          200: "#E2E6E9",
          700: "#5A5A5A",
          900: "#1A1A1A",
        },
      },
      boxShadow: {
        premium: "0 20px 60px -15px rgba(0,0,0,0.08), 0 8px 24px -6px rgba(0,0,0,0.04)",
        "premium-lg": "0 30px 80px -20px rgba(0,0,0,0.12)",
        glass: "0 8px 32px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at 30% 50%, rgba(227,107,90,0.08) 0%, transparent 70%)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
