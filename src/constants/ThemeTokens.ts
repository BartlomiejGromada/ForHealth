export const THEME_TOKENS = {
  primary: "var(--primary)",
  secondary: "var(--secondary)",

  icon: {
    default: "var(--icon)",
    muted: "var(--card-foreground)",
    inverse: "var(--primary-foreground)",
    danger: "var(--destructive)",
    success: "var(--primary)",
  },

  button: {
    background: "var(--button)",
    foreground: "var(--primary-foreground)",
  },

  text: {
    primary: "var(--foreground)",
    muted: "var(--muted-foreground)",
    inverse: "var(--background)",
  },

  card: {
    primary: "var(--card)",
    foreground: "(var(--card-foreground)",
    border: "var(--card-border)",
  },
} as const;
