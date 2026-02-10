import { useAppTheme } from "@/providers/ThemeProvider";
import { Tabs } from "expo-router";
import { cssInterop } from "nativewind";
import React, { ComponentProps } from "react";
import { ViewStyle } from "react-native";

type StyledTabsProps = Omit<
  ComponentProps<typeof Tabs> & {
    headerStyle?: ViewStyle;
    tabBarStyle?: ViewStyle;
    tabBarLabelStyle?: ViewStyle;
  },
  "screenOptions"
>;

export const StyledTabs = cssInterop(
  ({ headerStyle, tabBarStyle, ...props }: StyledTabsProps) => {
    const { theme } = useAppTheme();

    return (
      <Tabs
        screenOptions={{
          animation: "shift",
          headerShown: false,
          transitionSpec: {
            animation: "spring",
            config: {
              speed: 50,
            },
          },
          tabBarActiveTintColor: theme === "dark" ? "white" : "black",
          headerStyle,
          tabBarStyle,
        }}
        {...props}
      />
    );
  },
  {
    headerClassName: "headerStyle",
    tabBarClassName: "tabBarStyle",
    tabBarLabelClassName: "tabBarLabelStyle",
  }
);
