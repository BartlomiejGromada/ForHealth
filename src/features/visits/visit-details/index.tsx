import ScreenHeader from "@/components/ScreenHeader";
import ScreenWrapper from "@/components/ScreenWrapper";
import StandaloneScreenWrapper from "@/components/StandaloneScreenWrapper";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useVisitDelete } from "./hooks/useVisitDelete";
import { useVisitDetails } from "./hooks/useVisitDetails";
import useVisitDetailsHeaderOptions from "./hooks/useVisitDetailsHeaderOptions";
import { useVisitUpdate } from "./hooks/useVisitUpdate";
import VisistOptionsCard from "./VisistOptionsCard";
import VisitDoctorCard from "./VisitDoctorCard";
import VisitInformationsCard from "./VisitInformationsCard";

type VisitDetailsProps = {
  visitId: string;
};

export default function VisitDetails({ visitId }: VisitDetailsProps) {
  const { t } = useTranslation();

  const { visit, isLoading, isError } = useVisitDetails({ visitId });

  const { mutation: updateVisit, isLoading: isUpdateLoading } = useVisitUpdate({ visitId });

  const { mutation: deleteVisit, isLoading: isDeleteLoading } = useVisitDelete({ visitId });

  useVisitDetailsHeaderOptions({
    editVisist: { mutation: updateVisit, isLoading: isUpdateLoading },
    deleteVisit: {
      mutation: deleteVisit,
      isLoading: isDeleteLoading,
      confirmation: {
        title: t("visits.delete-visit-confirmation-title"),
        message: t("visits.delete-visit-confirmation-message"),
      },
    },
  });

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

              <VisistOptionsCard visitId={visitId} />
            </View>
          )}
        </StandaloneScreenWrapper>
      </ScreenWrapper>
    </Fragment>
  );
}
