import ScreenHeader from "@/components/ScreenHeader";
import ScreenWrapper from "@/components/ScreenWrapper";
import StandaloneScreenWrapper from "@/components/StandaloneScreenWrapper";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useVisitDetails } from "./hooks/useVisitDetails";
import VisistOptionsCard from "./VisistOptionsCard";
import VisitDoctorCard from "./VisitDoctorCard";
import VisitInformationsCard from "./VisitInformationsCard";

type VisitDetailsProps = {
  visitId: string;
};

export default function VisitDetails({ visitId }: VisitDetailsProps) {
  const { t } = useTranslation();

  const { visit, isLoading, isError } = useVisitDetails({ visitId });

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
