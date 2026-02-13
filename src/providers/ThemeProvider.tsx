import { useColorScheme } from "nativewind";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
  // const [themeApp, setThemeApp] = useState<Theme>(colorScheme ?? "light");

  //TODO: Usunąć MOCK
  const [themeApp, setThemeApp] = useState<Theme>("light");
  useEffect(() => {
    setColorScheme("light");
  }, [setColorScheme]);
  //------------

  const toggleTheme = () => {
    setThemeApp(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    toggleColorScheme();
  };

  const setTheme = (theme: Theme) => {
    setThemeApp(theme);
    setColorScheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme: themeApp, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context && process.env.EXPO_PUBLIC_ENV === "DEV") {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context!;
};
