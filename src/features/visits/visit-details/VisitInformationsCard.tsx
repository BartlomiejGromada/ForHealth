import TextStyled from "@/components/ui/TextStyled";
import { COLORS } from "@/constants/Colors";
import { CalendarIcon, MapPinIcon, NotepadTextIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type VisitInformationsCardProps = {
  date: Date;
  location?: string;
  comment: string;
};

export default function VisitInformationsCard({
  date,
  location,
  comment,
}: VisitInformationsCardProps) {
  const { t } = useTranslation();

  return (
    <View className="flex justify-center bg-card-light dark:bg-card-dark p-4 rounded-lg gap-4">
      <TextStyled
        type="bold"
        className="text-xl dark:text-typography-white">{`${t("visits.information-about-visit")}:`}</TextStyled>

      <View className="flex flex-row items-center gap-2">
        <CalendarIcon color={COLORS.primary[500]} />
        <TextStyled className="color-typography-500">{formatDate(date)}</TextStyled>
      </View>

      <View className="flex flex-row items-center gap-2">
        <MapPinIcon color={COLORS.primary[500]} />
        <TextStyled className="color-typography-500">{location}</TextStyled>
      </View>

      <View className="flex flex-row items-center gap-2">
        <NotepadTextIcon color={COLORS.primary[500]} />
        <TextStyled className="color-typography-500">{comment ?? "-"}</TextStyled>
      </View>
    </View>
  );
}

const formatDate = (date: Date) => {
  const dateFormatted = date.toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeFormatted = date.toLocaleDateString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dateFormatted}; ${timeFormatted}`;
};
