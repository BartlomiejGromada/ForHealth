/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["src/**/*.{tsx,jsx,ts,js}", "app/**/*.{tsx,jsx,ts,js}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // === BASE PALETTES ===
        primary: {
          50: "#EDF7EE",
          100: "#DBF0DC",
          200: "#B8E0B9",
          300: "#94D196",
          400: "#6DC070",
          500: "#4CAF50",
          600: "#3C8B3F",
          700: "#2E6B30",
          800: "#1F4720",
          900: "#0F2410",
          950: "#081208",
        },
        secondary: {
          50: "#E6F9F7",
          100: "#CDF4F0",
          200: "#9BE8E0",
          300: "#6ADDD1",
          400: "#38D1C2",
          500: "#26A69A",
          600: "#1E857B",
          700: "#17645C",
          800: "#0F423D",
          900: "#08211F",
          950: "#04110F",
        },
        tertiary: {
          50: "#F4F0FA",
          100: "#EBE5F6",
          200: "#D4C7EB",
          300: "#C0ADE1",
          400: "#A98FD6",
          500: "#9575CD",
          600: "#7044BB",
          700: "#55348E",
          800: "#38225E",
          900: "#1D1231",
          950: "#0D0816",
        },
        // === SEMANTIC BACKGROUNDS ===
        surface: {
          DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
          muted: "rgb(var(--color-surface-muted) / <alpha-value>)",
        },

        card: {
          DEFAULT: "rgb(var(--color-card) / <alpha-value>)",
        },

        image: {
          backdrop: {
            primary: "rgb(var(--color-image-backdrop-primary) / <alpha-value>)",
            secondary: "rgb(var(--color-image-backdrop-secondary) / <alpha-value>)",
          },
        },

        // === TEXT ===
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
          inverse: "rgb(var(--color-text-inverse) / <alpha-value>)",
        },

        // === BORDERS / OUTLINES ===
        border: {
          DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
          muted: "rgb(var(--color-border-muted) / <alpha-value>)",
        },

        // === STATUS COLORS ===
        status: {
          error: "rgb(var(--color-status-error) / <alpha-value>)",
          success: "rgb(var(--color-status-success) / <alpha-value>)",
          warning: "rgb(var(--color-status-warning) / <alpha-value>)",
          info: "rgb(var(--color-status-info) / <alpha-value>)",
        },

        button: {
          primary: "rgb(var(--color-button-primary) / <alpha-value>)",
          outlined: "rgb(var(--color-button-outlined) / <alpha-value>)",
        },
        "button-text": {
          primary: "rgb(var(--color-button-text-primary) / <alpha-value>)",
          outlined: "rgb(var(--color-button-text-outlined) / <alpha-value>)",
        },
        "button-border": {
          DEFAULT: "rgb(var(--color-button-border) / <alpha-value>)",
        },
      },
    },
    // === FONTS ===
    fontFamily: {
      body: ["Lato-Regular"],
      heading: ["Lato-Bold"],
      caption: ["Lato-Light"],
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      extrablack: "950",
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
      sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
      base: ["1rem", { lineHeight: "1.5rem" }], // 16px
      lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
      xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
      "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
      "5xl": ["3rem", { lineHeight: "1" }], // 48px
      "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
      "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
      "8xl": ["6rem", { lineHeight: "1" }], // 96px
      "9xl": ["8rem", { lineHeight: "1" }], // 128px
    },
  },
};
