import IconStyled from "@/components/ui/IconStyled";
import TextStyled from "@/components/ui/TextStyled";
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
    <View className="flex justify-center bg-card p-4 rounded-lg gap-4">
      <TextStyled
        variant="heading"
        className="text-lg color-foreground">{`${t("visits:information-about-visit")}:`}</TextStyled>

      <View className="flex flex-row items-center gap-4">
        <IconStyled name="Calendar" />
        <TextStyled className="text-sm color-foreground w-3/4">{formatDate(date)}</TextStyled>
      </View>

      <View className="flex flex-row items-center gap-4">
        <IconStyled name="MapPin" />
        <TextStyled className="text-sm  color-foreground">{location}</TextStyled>
      </View>

      <View className="flex flex-row items-center gap-4">
        <IconStyled name="NotepadText" />
        <TextStyled className="text-sm color-foreground">{comment ?? "-"}</TextStyled>
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
