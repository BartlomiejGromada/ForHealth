import {
  FloatingActionButton,
  FloatingActionButtonElement,
} from "@/components/FloatingActionButton";
import ScreenHeader from "@/components/ScreenHeader";
import ScreenWrapper from "@/components/ScreenWrapper";
import StandaloneScreenWrapper from "@/components/StandaloneScreenWrapper";
import { VisitStatus } from "@/types/Visit";
import React, { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useVisitDelete } from "./hooks/useVisitDelete";
import { useVisitDetails } from "./hooks/useVisitDetails";
import { useMarkVisitAsCancelled, useMarkVisitAsCompleted } from "./hooks/useVisitStatusUpdate";
import VisitDoctorCard from "./VisitDoctorCard";
import VisitInformationsCard from "./VisitInformationsCard";

type VisitDetailsProps = {
  visitId: string;
};

export default function VisitDetails({ visitId }: VisitDetailsProps) {
  // TODO: remove unused comment block of code
  // useVisitDetailsHeaderOptions({
  //   editVisist: { mutation: updateVisit, isLoading: iLoadingUpdateVisit },
  //   deleteVisit: {
  //     mutation: deleteVisit,
  //     isLoading: isLoadingDeleteVisit,
  //     confirmation: {
  //       title: t("visits.delete-visit-confirmation-title"),
  //       message: t("visits.delete-visit-confirmation-message"),
  //     },
  //   },
  // });

  const { t } = useTranslation();

  const {
    visit,
    isLoading: isVisitDetailsLoading,
    isError: isVisitDetailsError,
  } = useVisitDetails({ visitId });

  // const { mutation: updateVisit, isLoading: iLoadingUpdateVisit } = useVisitUpdate({ visitId });

  const { mutation: deleteVisit, isLoading: isLoadingDeleteVisit } = useVisitDelete();

  const { mutation: markVisitAsCancelled, isLoading: isLoadingMarkVisitAsCancelled } =
    useMarkVisitAsCancelled();

  const { mutation: markVisitAsCompleted, isLoading: isLoadingMarkVisitAsCompleted } =
    useMarkVisitAsCompleted();

  const fabItems: FloatingActionButtonElement[] = useMemo(
    () =>
      [
        {
          text: { value: t("visits:fab.delete") },
          icon: {
            name: "Trash2",
            variant: "danger",
          },
          onPressAsync: async () => {
            await deleteVisit(visitId);
          },
        } as FloatingActionButtonElement,

        {
          text: { value: t("visits:fab.edit") },
          icon: {
            name: "Pencil",
          },
          onPressAsync: async () => {
            // await updateVisit(visitId);
          },
        } as FloatingActionButtonElement,

        visit?.status !== VisitStatus.Completed
          ? ({
              text: {
                value: t("visits:fab.mark-as-completed"),
              },
              icon: { name: "CheckCheck" },
              onPressAsync: async () => {
                await markVisitAsCompleted(visitId);
              },
            } as FloatingActionButtonElement)
          : null,

        visit?.status !== VisitStatus.Cancelled
          ? ({
              text: {
                value: t("visits:fab.mark-as-cancelled"),
                backgroundClass: "bg-primary-500 ",
              },
              icon: { name: "X" },
              onPressAsync: async () => {
                await markVisitAsCancelled(visitId);
              },
            } as FloatingActionButtonElement)
          : null,
      ].filter(item => item !== null),
    [t, visitId, visit?.status, markVisitAsCancelled, markVisitAsCompleted, deleteVisit]
  );

  const isLoadingMutation =
    isLoadingDeleteVisit || isLoadingMarkVisitAsCompleted || isLoadingMarkVisitAsCancelled;

  return (
    <Fragment>
      <ScreenHeader title={t("visits:details-of-visit")} />

      <ScreenWrapper>
        <StandaloneScreenWrapper isLoading={isVisitDetailsLoading} isError={isVisitDetailsError}>
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
        disabled={isLoadingMutation}
        isLoading={isLoadingMutation}
        className="absolute bottom-6 right-6 z-50 items-center"
        accessibilityHint={t("visits:fab.hint")}
        accessibilityLabel={t("visits:fab.label")}
      />
    </Fragment>
  );
}
