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
        cream: "#FFF8F0",
        blush: "#FFF0ED",
        sage: "#F0F7F4",
        warm: "#FAF5F0",
        slate: {
          50: "#F8F9FA",
          100: "#F0F3F4",
          200: "#E2E6E9",
          300: "#CDD3D8",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#5A5A5A",
          800: "#333333",
          900: "#1A1A1A",
        },
      },
      boxShadow: {
        premium: "0 20px 60px -15px rgba(0,0,0,0.08), 0 8px 24px -6px rgba(0,0,0,0.04)",
        "premium-lg": "0 30px 80px -20px rgba(0,0,0,0.12)",
        glass: "0 8px 32px rgba(0,0,0,0.06)",
        "card-hover": "0 25px 65px -15px rgba(227,107,90,0.15), 0 10px 30px -8px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at 30% 50%, rgba(227,107,90,0.08) 0%, transparent 70%)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) scale(1)", opacity: "0.3" },
          "50%": { transform: "translateY(-20px) scale(1.1)", opacity: "0.6" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-15px) translateX(10px)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-25px) rotate(10deg)" },
        },
        "paw-float": {
          "0%": { transform: "translateY(100px) rotate(-20deg) scale(0)", opacity: "0" },
          "20%": { opacity: "0.3" },
          "80%": { opacity: "0.3" },
          "100%": { transform: "translateY(-100px) rotate(20deg) scale(1)", opacity: "0" },
        },
        "tail-wag": {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "25%": { transform: "rotate(15deg)" },
          "75%": { transform: "rotate(-10deg)" },
        },
        "ear-wiggle-left": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-8deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        "ear-wiggle-right": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(8deg)" },
          "75%": { transform: "rotate(-5deg)" },
        },
        blink: {
          "0%, 90%, 100%": { transform: "scaleY(1)" },
          "95%": { transform: "scaleY(0.1)" },
        },
        "head-tilt": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        tongue: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(3px)" },
        },
        "bob-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "bowl-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "bone-bounce": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-5px) rotate(5deg)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
        "badge-pop": {
          "0%": { transform: "translateX(-50%) scale(0)", opacity: "0" },
          "60%": { transform: "translateX(-50%) scale(1.1)" },
          "100%": { transform: "translateX(-50%) scale(1)", opacity: "1" },
        },
        "bandana-shimmer": {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.15)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-right": "slide-in-from-right 0.3s ease-out",
        "count-up": "count-up 0.5s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-medium": "float-medium 4s ease-in-out infinite",
        "float-fast": "float-fast 3s ease-in-out infinite",
        "paw-float": "paw-float 4s ease-in-out infinite",
        "tail-wag": "tail-wag 2s ease-in-out infinite",
        "ear-wiggle-left": "ear-wiggle-left 3s ease-in-out infinite",
        "ear-wiggle-right": "ear-wiggle-right 3s ease-in-out infinite 0.5s",
        blink: "blink 4s ease-in-out infinite",
        "head-tilt": "head-tilt 6s ease-in-out infinite",
        tongue: "tongue 2s ease-in-out infinite",
        "bob-gentle": "bob-gentle 3s ease-in-out infinite",
        "bowl-float": "bowl-float 2.5s ease-in-out infinite",
        "bone-bounce": "bone-bounce 2s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "badge-pop": "badge-pop 0.8s ease-out forwards 0.5s",
        "bandana-shimmer": "bandana-shimmer 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
