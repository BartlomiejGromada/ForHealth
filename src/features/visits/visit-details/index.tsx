import {
  FloatingActionButton,
  FloatingActionButtonElement,
} from "@/components/FloatingActionButton";
import ScreenHeader from "@/components/ScreenHeader";
import ScreenWrapper from "@/components/ScreenWrapper";
import StandaloneScreenWrapper from "@/components/StandaloneScreenWrapper";
import { CheckCheckIcon, XCircleIcon } from "lucide-react-native";
import React, { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useVisitDelete } from "./hooks/useVisitDelete";
import { useVisitDetails } from "./hooks/useVisitDetails";
import useVisitDetailsHeaderOptions from "./hooks/useVisitDetailsHeaderOptions";
import { useVisitUpdate } from "./hooks/useVisitUpdate";
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

  const fabItems: FloatingActionButtonElement[] = useMemo(
    () => [
      { index: 1, text: t("visits.fab.mark-as-completed"), icon: CheckCheckIcon },
      {
        index: 2,
        text: t("visits.fab.mark-as-cancelled"),
        icon: XCircleIcon,
      },
    ],
    [t]
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

      <FloatingActionButton items={fabItems} />
    </Fragment>
  );
}
