import TextStyled from "@/components/ui/TextStyled";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

// TODO: Implement Calendar component + logic
export default function CalendarWrapper() {
  const { t } = useTranslation();

  return (
    <View className="gap-y-4">
      <View className="flex justify-center items-center bg-card h-80 rounded-lg">
        <TextStyled className="text-foreground-muted">{t("calendar:calendar")}</TextStyled>
      </View>
    </View>
  );
}
