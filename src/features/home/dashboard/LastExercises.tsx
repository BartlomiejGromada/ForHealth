import IntensityIndicator from "@/components/IntensityIndicator";
import TextStyled from "@/components/ui/TextStyled";
import { endOfWeek, startOfWeek } from "date-fns";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { ContainerCard } from "../components/ContainerCard";
import ContainerSection from "../components/ContainerSection";
import IconText from "../components/IconText";
import useExercises from "../hooks/useExercises";

const LAST_VISITS_COUNT = 3;

const range = {
  from: startOfWeek(new Date(), { weekStartsOn: 1 }),
  to: endOfWeek(new Date(), { weekStartsOn: 1 }),
};

export default function LastExercises() {
  const { t } = useTranslation();

  const { exercises, isLoading } = useExercises({
    count: LAST_VISITS_COUNT,
    range: range,
  });

  return (
    <ContainerSection
      title={t("home:last-exercises")}
      onPressAction={() => {
        router.navigate("/standalone/exercises-list");
      }}>
      <View className="w-full flex gap-y-4">
        {isLoading ? (
          <ActivityIndicator size={"large"} />
        ) : exercises.length === 0 ? (
          <TextStyled className="text-center text-foreground">
            {t("home:no-exercises-yet")}
          </TextStyled>
        ) : (
          exercises.map(exercise => (
            <ContainerCard
              key={exercise.id}
              icon={"Dumbbell"}
              title={exercise.name}
              subtitle={exercise.date.toLocaleDateString()}
              description={
                <View className="w-[80%] flex flex-row justify-between">
                  <IconText text={`${exercise.durationInMin} min`} icon={"Timer"} />

                  <IntensityIndicator intensity={exercise.intensity} />
                </View>
              }
              onPress={() =>
                router.push({
                  pathname: "/standalone/exercise-details",
                  params: {
                    id: exercise.id,
                  },
                })
              }
              accessibilityHint={t("exercises:open-details-exercise")}
              accessibilityLabel={`${exercise.name}, ${exercise.date.toLocaleDateString()}`}
            />
          ))
        )}
      </View>
    </ContainerSection>
  );
}
