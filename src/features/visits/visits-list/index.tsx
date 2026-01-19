import ScreenWrapper from "@/components/ScreenWrapper";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

export default function VisitsList() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper title={"Wizyty - lista"}>
      <Text>Lista</Text>
    </ScreenWrapper>
  );
}
