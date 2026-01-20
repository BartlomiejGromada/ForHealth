import { createContext, useContext } from "react";

export type HeaderOption = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type HeaderOptionsContextType = {
  options: HeaderOption[];
  setOptions: (options: HeaderOption[]) => void;
};

export const HeaderOptionsContext = createContext<HeaderOptionsContextType | null>(null);

export const useHeaderOptions = () => {
  const ctx = useContext(HeaderOptionsContext);
  if (!ctx) {
    throw new Error("useHeaderOptions must be used within HeaderOptionsProvider");
  }
  return ctx;
};

export const HeaderOptionsProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: HeaderOptionsContextType;
}) => {
  return (
    <HeaderOptionsContext.Provider value={{ ...value }}>{children}</HeaderOptionsContext.Provider>
  );
};
