import VisitDetails from "@/features/visits/visit-details";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function VisitDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <VisitDetails visitId={id} />;
}
