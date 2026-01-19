import TextStyled from "@/components/ui/TextStyled";
import { visitStatusTranslationKeys } from "@/helpers/enums";
import { VisitStatus } from "@/types/Visit";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type VisitStatusBadgeProps = {
  status: VisitStatus;
};

export default function VisitStatusBadge({ status }: VisitStatusBadgeProps) {
  const { t } = useTranslation();

  const classNames = {
    "bg-blue-100": status === VisitStatus.New,
    "bg-red-100": status === VisitStatus.Canceled,
    "bg-green-100": status === VisitStatus.Finished,
  };

  return (
    <View className={clsx(classNames, `w-28 p-4 rounded-full`)}>
      <TextStyled type="bold" className="text-center">
        {t(visitStatusTranslationKeys[status])}
      </TextStyled>
    </View>
  );
}
