import { COLORS } from "@/constants/Colors";
import { useAppTheme } from "@/providers/ThemeProvider";
import { Stack } from "expo-router";
import React from "react";

type ScreenHeaderProps = {
  title: string;
};

export default function ScreenHeader({ title }: ScreenHeaderProps) {
  const { theme } = useAppTheme();

  return (
    <Stack.Screen
      options={{
        title: title,
        headerTitleStyle: {
          color: theme === "dark" ? COLORS.white : COLORS.black,
        },
        headerTintColor: theme === "dark" ? COLORS.white : COLORS.black,
        headerStyle: {
          backgroundColor: theme === "dark" ? COLORS.card.dark : COLORS.card.light,
        },
      }}
    />
  );
}
