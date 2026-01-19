import TextStyled from "@/components/ui/TextStyled";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

// TODO: Implement logic
export default function Table() {
  const { t } = useTranslation();

  return (
    <View className="bg-card-light dark:bg-card-dark p-2 rounded-md gap-6">
      <TextStyled type="bold" className="dark:text-typography-white">
        {t("profile.personal-data")}
      </TextStyled>

      <View className="flex gap-4">
        <TableRow title={t("profile.age")} value={"35 lat"} />
        <TableRow title={t("profile.height")} value={"178 cm"} />
        <TableRow title={t("profile.weight")} value={"75 kg"} />
      </View>
    </View>
  );
}

function TableRow({ title, value }: { title: string; value: string }) {
  return (
    <View className="flex flex-row h-10 border-b border-b-gray-100 pr-2 justify-center">
      <TextStyled className="w-1/2 color-typography-500">{title}</TextStyled>
      <TextStyled className="w-1/2 text-sm color-typography-500 text-right">{value}</TextStyled>
    </View>
  );
}
