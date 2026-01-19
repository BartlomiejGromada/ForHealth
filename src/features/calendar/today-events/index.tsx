import TextStyled from "@/components/ui/TextStyled";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function TodayEvents() {
  const { t } = useTranslation();

  return (
    <View className="gap-y-4">
      <Text className="font-bold text-xl dark:text-typography-white">
        {t("calendar.todays-events")}
      </Text>
      <TodayEvent />
      <TodayEvent />
    </View>
  );
}

function TodayEvent() {
  return (
    <View
      className="bg-card-light dark:bg-card-dark flex flex-row justify-between items-center p-4 rounded-md
      gap-x-4 pl-6">
      <View className="h-10 border-r border-r-gray-200 pr-2 justify-center">
        <TextStyled type="bold" className="text-primary-500 text-center">
          {"10:00"}
        </TextStyled>
      </View>

      <View className="w-4/5">
        <TextStyled type="bold" className=" dark:text-typography-white">
          {"Wizyta lekarska"}
        </TextStyled>
        <TextStyled className="text-sm color-typography-500">
          {"Kardiolog - dr Anna Kowalska"}
        </TextStyled>
      </View>
    </View>
  );
}
