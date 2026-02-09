import ConfirmationModal from "@/components/ConfirmationModal";
import IconStyled from "@/components/ui/IconStyled";
import { StyledTabs } from "@/components/ui/StyledTabs";
import { THEME_TOKENS } from "@/constants/ThemeTokens";
import { Tabs } from "expo-router";
import { CalendarIcon, HouseIcon, PlusCircleIcon, UserIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LoggedLayout() {
  return (
    <>
      <RootTabs />
      <ConfirmationModal />
    </>
  );
}

const RootTabs = () => {
  const { t } = useTranslation();

  return (
    <StyledTabs
      tabBarClassName="text-red-500"
      headerClassName="text-red-500"
      screenOptions={{
        tabBarActiveTintColor: "black",
        animation: "shift",
        transitionSpec: {
          animation: "spring",
          config: {
            speed: 50,
          },
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
        },
        tabBarLabelStyle: {
          fontFamily: "Lato-Regular",
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t("common:tab.home"),
          tabBarIcon: () => <IconStyled name="House" size={32} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: t("common:tab.calendar"),
          tabBarIcon: () => <IconStyled name="Calendar" size={32} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: t("common:tab.add"),
          tabBarIcon: () => <IconStyled name="CirclePlus" size={32} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("common:tab.profile"),
          tabBarIcon: () => <IconStyled name="User" size={32} />,
        }}
      />
    </StyledTabs>
  );
};
