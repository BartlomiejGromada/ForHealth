import TextStyled from "@/components/ui/TextStyled";
import { formatDateTime } from "@/helpers/dates";
import { doctorTypeTranslationKeys } from "@/helpers/enums";
import { DoctorProfession } from "@/types/Visit";
import { router } from "expo-router";
import { CalendarClockIcon, HandIcon, StethoscopeIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { ContainerCard } from "../components/ContainerCard";
import ContainerSection from "../components/ContainerSection";
import IconText from "../components/IconText";
import useUpcomingVisits from "../hooks/useUpcomingVisits";

const UPCOMING_VISITS_COUNT = 3;

export default function UpcomingVisits() {
  const { t } = useTranslation();

  const { visits, isLoading } = useUpcomingVisits({ count: UPCOMING_VISITS_COUNT });

  return (
    <ContainerSection
      title={t("home:upcoming-visits")}
      onPressAction={() => {
        router.navigate("/standalone/visits-list");
      }}>
      <View className="flex gap-y-4">
        {isLoading ? (
          <ActivityIndicator size={"large"} />
        ) : visits.length === 0 ? (
          <TextStyled className="text-center text-foreground">
            {t("home:no-upcoming-visits")}
          </TextStyled>
        ) : (
          visits.map(visit => (
            <ContainerCard
              key={visit.id}
              Icon={
                visit.doctor.profession === DoctorProfession.Physiotherapist
                  ? HandIcon
                  : StethoscopeIcon
              }
              title={t(doctorTypeTranslationKeys[visit.doctor.profession])}
              subtitle={`${visit.doctor.name}`}
              description={<IconText text={formatDateTime(visit.date)} icon={CalendarClockIcon} />}
              onPress={() =>
                router.push({
                  pathname: "/standalone/visit-details",
                  params: {
                    id: visit.id,
                  },
                })
              }
              accessibilityHint={t("visits:open-details-visit")}
              accessibilityLabel={`${visit.doctor}, ${visit.date.toLocaleDateString()}`}
            />
          ))
        )}
      </View>
      )
    </ContainerSection>
  );
}
