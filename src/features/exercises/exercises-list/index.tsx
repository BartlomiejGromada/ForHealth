import ScreenWrapper from "@/components/ScreenWrapper";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

export default function ExercisesList() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper title={"Ćwiczenia - lista"}>
      <Text>Lista ćwiczeń</Text>
    </ScreenWrapper>
  );
}
