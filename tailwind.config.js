/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["src/**/*.{tsx,jsx,ts,js}", "app/**/*.{tsx,jsx,ts,js}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        /* === SURFACES === */
        background: "var(--background)",
        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",

        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },

        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },

        /* === BRAND / ACCENT === */
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },

        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },

        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },

        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },

        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },

        /* === UI === */
        border: "var(--border)",
        input: "var(--input)",

        /* === BUTTONS === */
        button: {
          primary: "var(--button)",
          secondary: "var(--button-secondary)",
          outlined: "var(--button-outlined)",
        },

        "button-foreground": {
          primary: "var(--button-foreground)",
          secondary: "var(--button-secondary-foreground)",
          outlined: "var(--button-outlined-foreground)",
        },

        "button-border": {
          outlined: "var(--button-outlined-border)",
        },

        /* === ICONS === */
        icon: {
          foreground: "var(--icon)",
          background: "var(--icon-background)",
        },

        /* === SPINNER === */
        spinner: {
          DEFAULT: "var(--spinner)",
        },
      },
    },

    /* === FONTS === */
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
      xs: [12, { lineHeight: 16 }],
      sm: [14, { lineHeight: 20 }],
      base: [16, { lineHeight: 24 }],
      lg: [18, { lineHeight: 28 }],
      xl: [20, { lineHeight: 28 }],
      "2xl": [24, { lineHeight: 32 }],
      "3xl": [30, { lineHeight: 36 }],
      "4xl": [36, { lineHeight: 40 }],
    },
  },
};
