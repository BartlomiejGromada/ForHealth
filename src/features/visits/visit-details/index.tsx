import {
  FloatingActionButton,
  FloatingActionButtonElement,
} from "@/components/FloatingActionButton";
import ScreenHeader from "@/components/ScreenHeader";
import ScreenWrapper from "@/components/ScreenWrapper";
import StandaloneScreenWrapper from "@/components/StandaloneScreenWrapper";
import { VisitStatus } from "@/types/Visit";
import { CheckCheckIcon, XCircleIcon } from "lucide-react-native";
import React, { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useVisitDelete } from "./hooks/useVisitDelete";
import { useVisitDetails } from "./hooks/useVisitDetails";
import useVisitDetailsHeaderOptions from "./hooks/useVisitDetailsHeaderOptions";
import { useMarkVisitAsCancelled, useMarkVisitAsCompleted } from "./hooks/useVisitStatusUpdate";
import { useVisitUpdate } from "./hooks/useVisitUpdate";
import VisitDoctorCard from "./VisitDoctorCard";
import VisitInformationsCard from "./VisitInformationsCard";

type VisitDetailsProps = {
  visitId: string;
};

export default function VisitDetails({ visitId }: VisitDetailsProps) {
  const { t } = useTranslation();

  const { visit, isLoading, isError } = useVisitDetails({ visitId });

  const { mutation: updateVisit, isLoading: iLoadingUpdateVisit } = useVisitUpdate({ visitId });

  const { mutation: deleteVisit, isLoading: isLoadingDeleteVisit } = useVisitDelete({ visitId });

  useVisitDetailsHeaderOptions({
    editVisist: { mutation: updateVisit, isLoading: iLoadingUpdateVisit },
    deleteVisit: {
      mutation: deleteVisit,
      isLoading: isLoadingDeleteVisit,
      confirmation: {
        title: t("visits.delete-visit-confirmation-title"),
        message: t("visits.delete-visit-confirmation-message"),
      },
    },
  });

  const { mutation: markVisitAsCancelled, isLoading: isLoadingMarkVisitAsCancelled } =
    useMarkVisitAsCancelled();

  const { mutation: markVisitAsCompleted, isLoading: isLoadingMarkVisitAsCompleted } =
    useMarkVisitAsCompleted();

  const fabItems: FloatingActionButtonElement[] = useMemo(
    () =>
      [
        visit?.status !== VisitStatus.Completed
          ? {
              text: t("visits.fab.mark-as-completed"),
              icon: CheckCheckIcon,
              onPressAsync: async () => {
                await markVisitAsCompleted(visitId);
              },
            }
          : null,

        visit?.status !== VisitStatus.Cancelled
          ? {
              text: t("visits.fab.mark-as-cancelled"),
              icon: XCircleIcon,
              onPressAsync: async () => {
                await markVisitAsCancelled(visitId);
              },
            }
          : null,
      ].filter(item => item !== null),
    [t, visitId, visit?.status, markVisitAsCancelled, markVisitAsCompleted]
  );

  return (
    <Fragment>
      <ScreenHeader title={t("visits.details-of-visit")} />

      <ScreenWrapper>
        <StandaloneScreenWrapper isLoading={isLoading} isError={isError}>
          {visit && (
            <View className="flex gap-6">
              <VisitDoctorCard
                visitStatus={visit.status}
                doctorName={visit.doctor.name}
                doctorProfession={visit.doctor.profession}
              />

              <VisitInformationsCard
                date={visit.date}
                location={visit.location}
                comment={visit.comment}
              />
            </View>
          )}
        </StandaloneScreenWrapper>
      </ScreenWrapper>

      <FloatingActionButton
        items={fabItems}
        disabled={isLoadingMarkVisitAsCancelled || isLoadingMarkVisitAsCompleted}
        isLoading={isLoadingMarkVisitAsCancelled || isLoadingMarkVisitAsCompleted}
        className="absolute bottom-6 right-6 z-50 items-center"
        accessibilityHint={t("visits.fab.hint")}
        accessibilityLabel={t("visits.fab.label")}
      />
    </Fragment>
  );
}
