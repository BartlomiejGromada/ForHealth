import TextStyled from "@/components/ui/TextStyled";
import { SquareActivityIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ContainerCard } from "../components/ContainerCard";
import ContainerSection from "../components/ContainerSection";
import useExercises from "../hooks/useExercises";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { startOfWeek, endOfWeek } from "date-fns";

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
      title={t("home.last-exercises")}
      onPressAction={() => {
        router.navigate("/standalone/exercises-list");
      }}>
      <View className="w-full flex gap-y-4">
        {isLoading ? (
          <ActivityIndicator size={"large"} className="color-primary-300" />
        ) : exercises.length === 0 ? (
          <TextStyled className="text-center color-typography-500">
            {t("home.no-exercises-yet")}
          </TextStyled>
        ) : (
          exercises.map(exercise => (
            <ContainerCard
              key={exercise.id}
              Icon={SquareActivityIcon}
              title={exercise.name}
              subtitle={exercise.date.toLocaleDateString()}
              description={
                <View className="w-[80%] flex flex-row justify-between">
                  <TextStyled className="text-sm color-typography-500">{`${exercise.durationInMin} min`}</TextStyled>

                  <TextStyled className="text-sm color-typography-500">
                    {`${t("home.intensity")}: ${exercise.intensity}`}
                  </TextStyled>
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
            />
          ))
        )}
      </View>
    </ContainerSection>
  );
}
