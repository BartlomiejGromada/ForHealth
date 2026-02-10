import TextStyled from "@/components/ui/TextStyled";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function TodayEvents() {
  const { t } = useTranslation();

  return (
    <View className="gap-y-4">
      <TextStyled variant="heading" className="text-lg">
        {t("calendar:todays-events")}
      </TextStyled>
      <TodayEvent />
      <TodayEvent />
    </View>
  );
}

function TodayEvent() {
  return (
    <View
      className="flex flex-row justify-between items-center p-4 rounded-md
      gap-x-4 bg-card">
      <View className="h-10 border-r border-r-gray-300 pr-2 justify-center">
        <TextStyled variant="heading" className="text-lg text-foreground text-center">
          {"10:00"}
        </TextStyled>
      </View>

      <View className="w-4/5">
        <TextStyled variant="heading" className="text-sm text-foreground">
          {"Wizyta lekarska"}
        </TextStyled>
        <TextStyled className="text-sm text-foreground-muted">
          {"Kardiolog - dr Anna Kowalska"}
        </TextStyled>
      </View>
    </View>
  );
}
