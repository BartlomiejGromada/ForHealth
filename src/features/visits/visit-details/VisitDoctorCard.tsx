import TextStyled from "@/components/ui/TextStyled";
import { COLORS } from "@/constants/Colors";
import { doctorTypeTranslationKeys } from "@/helpers/enums";
import { DoctorProfession, VisitStatus } from "@/types/Visit";
import { HandIcon, StethoscopeIcon } from "lucide-react-native";
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
    <View className="flex flex-row items-center justify-between bg-card-light dark:bg-card-dark p-4 rounded-lg">
      <View className="flex flex-row items-center gap-4">
        <View className="flex items-center justify-center bg-primary-200 rounded-full p-4">
          {doctorProfession === DoctorProfession.Physiotherapist ? (
            <HandIcon color={COLORS.primary[500]} />
          ) : (
            <StethoscopeIcon color={COLORS.primary[500]} />
          )}
        </View>

        <View>
          <TextStyled type="bold" className="text-xl dark:text-typography-white">
            {doctorName}
          </TextStyled>
          <TextStyled className="color-typography-500">
            {t(doctorTypeTranslationKeys[doctorProfession])}
          </TextStyled>
        </View>
      </View>

      <View>
        <VisitStatusBadge status={visitStatus} />
      </View>
    </View>
  );
}
