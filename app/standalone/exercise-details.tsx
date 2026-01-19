import ExerciseDetails from "@/features/exercises/exercise-details";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function ExerciseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ExerciseDetails exerciseId={id} />;
}
