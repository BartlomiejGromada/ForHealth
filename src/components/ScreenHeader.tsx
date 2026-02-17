import { THEME_TOKENS } from "@/constants/ThemeTokens";
import { Stack } from "expo-router";
import React from "react";

type ScreenHeaderProps = {
  title: string;
};

export default function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <Stack.Screen
      options={{
        title: title,
        headerTitleStyle: {
          color: THEME_TOKENS.primary,
        },
        headerTintColor: THEME_TOKENS.text.primary,
        headerStyle: {
          backgroundColor: THEME_TOKENS.primary,
        },
      }}
    />
  );
}
