import { COLORS } from "@/constants/Colors";
import { useAppTheme } from "@/providers/ThemeProvider";
import { Tabs } from "expo-router";
import { CalendarIcon, HouseIcon, PlusCircleIcon, UserIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LoggedLayout() {
  return <RootTabs />;
}

const RootTabs = () => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary[500],
        animation: "shift",
        transitionSpec: {
          animation: "spring",
          config: {
            speed: 50,
          },
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme === "dark" ? COLORS.card.dark : COLORS.card.light,
        },
        tabBarLabelStyle: {
          fontFamily: "Lato-Regular",
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t("common.tab.home"),
          tabBarIcon: ({ color }) => <HouseIcon color={color} size={32} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: t("common.tab.calendar"),
          tabBarIcon: ({ color }) => <CalendarIcon color={color} size={32} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: t("common.tab.add"),
          tabBarIcon: ({ color }) => <PlusCircleIcon color={color} size={32} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("common.tab.profile"),
          tabBarIcon: ({ color }) => <UserIcon color={color} size={32} />,
        }}
      />
    </Tabs>
  );
};
