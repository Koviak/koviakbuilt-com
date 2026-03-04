import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v4 uses CSS-based configuration (@theme blocks in globals.css).
 * This file exists for compatibility with tooling that expects tailwind.config.ts
 * (IDE plugins, Prettier plugin, etc.) and as a reference for the brand palette.
 *
 * The ACTUAL theme tokens are defined in app/globals.css via @theme.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.ts",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: "var(--color-card)",
        "card-foreground": "var(--color-card-foreground)",
        copper: {
          DEFAULT: "#b87333",
          light: "#d4956a",
          dark: "#8a5526",
        },
        gold: {
          DEFAULT: "#c9a227",
          light: "#e0c068",
          dark: "#9a7b1a",
        },
        cream: "#f5f0e8",
        charcoal: "#1a1a1a",
      },
      fontFamily: {
        playfair: ["Playfair Display", "Georgia", "serif"],
        lato: ["Lato", "Helvetica Neue", "Arial", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
