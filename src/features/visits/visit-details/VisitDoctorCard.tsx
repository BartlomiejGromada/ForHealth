import IconStyled from "@/components/ui/IconStyled";
import TextStyled from "@/components/ui/TextStyled";
import { doctorTypeTranslationKeys } from "@/helpers/enums";
import { DoctorProfession, VisitStatus } from "@/types/Visit";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import VisitStatusBadge from "../components/VisitStatusBadge";

type VisitDoctorCardProps = {
  visitStatus: VisitStatus;
  doctorName: string;
  doctorProfession: DoctorProfession;
};

export default function VisitDoctorCard({
  visitStatus,
  doctorName,
  doctorProfession,
}: VisitDoctorCardProps) {
  const { t } = useTranslation();

  return (
    <View className="flex flex-row gap-4 items-center justify-between bg-card-light dark:bg-card-dark px-2 py-4 rounded-lg">
      <View className="flex-1/2 flex-row items-center gap-4">
        <View className="flex items-center justify-center bg-primary-200 rounded-full p-4">
          {doctorProfession === DoctorProfession.Physiotherapist ? (
            <IconStyled name={"Hand"} />
          ) : (
            <IconStyled name={"Stethoscope"} />
          )}
        </View>

        <View>
          <TextStyled className="text-xl dark:text-typography-white">{doctorName}</TextStyled>
          <TextStyled className="color-typography-500">
            {t(doctorTypeTranslationKeys[doctorProfession])}
          </TextStyled>
        </View>
      </View>

      <VisitStatusBadge status={visitStatus} className="flex-1" />
    </View>
  );
}
