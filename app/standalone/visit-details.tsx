import VisitDetails from "@/features/visits/visit-details";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useLocalSearchParams } from "expo-router";
import { EditIcon, Trash2 } from "lucide-react-native";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function VisitDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();

  const editVisit = useCallback(() => {
    console.log("Edit visit", id);
  }, [id]);

  const deleteVisit = useCallback(() => {
    console.log("Delete visit", id);
  }, [id]);

  const headerOptions = useMemo(
    () => [
      { label: t("common.edit"), onPress: editVisit, icon: EditIcon },
      { label: t("common.delete"), onPress: deleteVisit, icon: Trash2, destructive: true },
    ],
    [editVisit, deleteVisit, t]
  );

  useHeaderOptions({ options: headerOptions });

  return <VisitDetails visitId={id} />;
}
