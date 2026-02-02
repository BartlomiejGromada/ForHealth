import TextStyled from "@/components/ui/TextStyled";
import { calculateAge } from "@/helpers/dates";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function Table() {
  const { t } = useTranslation();

  const user = useLoggedUser();

  const { details } = user!;

  const age = details.dateOfBirth ? `${calculateAge(details.dateOfBirth)}` : "-";

  const height = details.height != null ? `${details.height} cm` : "-";

  const weight = details.weight != null ? `${details.weight} kg` : "-";

  return (
    <View className="bg-card-light dark:bg-card-dark p-2 rounded-md gap-6">
      <TextStyled type="bold" className="dark:text-typography-white">
        {t("profile.personal-data")}
      </TextStyled>

      <View className="flex gap-4">
        <TableRow title={t("profile.age")} value={age} />
        <TableRow title={t("profile.height")} value={height} />
        <TableRow title={t("profile.weight")} value={weight} />
      </View>
    </View>
  );
}

function TableRow({ title, value }: { title: string | null; value: string }) {
  return (
    <View className="flex flex-row h-10 border-b border-b-gray-100 pr-2 justify-center">
      <TextStyled className="w-1/2 color-typography-500">{title ?? "-"}</TextStyled>
      <TextStyled className="w-1/2 text-sm color-typography-500 text-right">{value}</TextStyled>
    </View>
  );
}
