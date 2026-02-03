import TextStyled from "@/components/ui/TextStyled";
import { visitStatusTranslationKeys } from "@/helpers/enums";
import { VisitStatus } from "@/types/Visit";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, ViewProps } from "react-native";

type VisitStatusBadgeProps = ViewProps & {
  status: VisitStatus;
};

export default function VisitStatusBadge({ status, className, ...rest }: VisitStatusBadgeProps) {
  const { t } = useTranslation();

  const classNamesBadge = {
    "bg-blue-100": status === VisitStatus.New,
    "bg-red-100": status === VisitStatus.Cancelled,
    "bg-green-100": status === VisitStatus.Completed,
  };

  return (
    <View {...rest} className={clsx(classNamesBadge, className, "h-8 p-4 rounded-full")}>
      <TextStyled type="bold" className="text-center text-sm truncate" numberOfLines={1}>
        {t(visitStatusTranslationKeys[status])}
      </TextStyled>
    </View>
  );
}
