import ScreenWrapper from "@/components/ScreenWrapper";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import TodayEvents from "./today-events";
import CalendarWrapper from "./wrapper";

export default function Calendar() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper title={t("calendar:calendar")}>
      <View className="flex gap-y-4">
        <CalendarWrapper />
        <TodayEvents />
      </View>
    </ScreenWrapper>
  );
}
