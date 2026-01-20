import { useHeaderOptions } from "@/contexts/HeaderOptionsContext";
import VisitDetails from "@/features/visits/visit-details";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect } from "react";

export default function VisitDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { setOptions } = useHeaderOptions();

  const editVisit = useCallback(() => {
    console.log("Edit visit", id);
  }, [id]);

  const deleteVisit = useCallback(() => {
    console.log("Delete visit", id);
  }, [id]);

  useEffect(() => {
    setOptions([
      { label: "Edytuj wizytę", onPress: editVisit },
      { label: "Usuń wizytę", onPress: deleteVisit, destructive: true },
    ]);

    return () => setOptions([]);
  }, [editVisit, deleteVisit, setOptions]);

  return <VisitDetails visitId={id} />;
}
