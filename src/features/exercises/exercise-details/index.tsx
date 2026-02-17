import ScreenHeader from "@/components/ScreenHeader";
import ScreenWrapper from "@/components/ScreenWrapper";
import StandaloneScreenWrapper from "@/components/StandaloneScreenWrapper";
import TextStyled from "@/components/ui/TextStyled";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type ExerciseDetailsProps = {
  exerciseId: string;
};

export default function ExerciseDetails({ exerciseId }: ExerciseDetailsProps) {
  const { t } = useTranslation();

  // const { visit, isLoading, isError } = useExerciseDetails({ exerciseId });
  const exercise = true;

  return (
    <Fragment>
      <ScreenHeader title={t("exercises:details-of-exercise")} />

      <ScreenWrapper>
        <StandaloneScreenWrapper isLoading={false} isError={false}>
          {exercise && (
            <View className="flex gap-6">
              <TextStyled>Szczegóły</TextStyled>
            </View>
          )}
        </StandaloneScreenWrapper>
      </ScreenWrapper>
    </Fragment>
  );
}
