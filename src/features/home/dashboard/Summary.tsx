import IconStyled, { IconName } from "@/components/ui/IconStyled";
import TextStyled from "@/components/ui/TextStyled";
import { endOfWeek, startOfWeek } from "date-fns";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import useExercisesCount from "../hooks/useExercisesCount";
import useUpcomingVisitsCount from "../hooks/useUpcomingVisitsCount";

const range = {
  from: startOfWeek(new Date(), { weekStartsOn: 1 }),
  to: endOfWeek(new Date(), { weekStartsOn: 1 }),
};

export default function Summary() {
  const { t } = useTranslation();

  const { count: upcomingVisitsCount, isLoading: isLoadingUpcomingVisitsCount } =
    useUpcomingVisitsCount();
  const { count: exercisesCount, isLoading: isLoadingExercisesCount } = useExercisesCount({
    range,
  });

  return (
    <View className="gap-y-4">
      <View className="flex flex-row justify-between gap-x-2">
        <SummarySquare
          icon={{ name: "Heart", className: "color-destructive" }}
          count={upcomingVisitsCount}
          text={t("home:upcoming-visits")}
          isLoading={isLoadingUpcomingVisitsCount}
        />
        <SummarySquare
          icon={{ name: "Gauge", className: "color-foreground" }}
          count={exercisesCount}
          text={t("home:training-this-week")}
          isLoading={isLoadingExercisesCount}
        />
      </View>
    </View>
  );
}

type SummarySquareProps = {
  icon: { name: IconName; className?: string };
  count: number;
  text: string;
  isLoading: boolean;
};

function SummarySquare({ icon, count, text, isLoading }: SummarySquareProps) {
  return (
    <View className="flex items-center justify-center gap-y-1 bg-card rounded-lg p-4 w-1/2 h-32 shadow-sm">
      {isLoading ? (
        <ActivityIndicator size={"large"} className="color-spinner" />
      ) : (
        <Fragment>
          <IconStyled name={icon.name} className={icon.className} />
          <TextStyled className="text-xl font-bold text-card-foreground">{count}</TextStyled>
          <TextStyled variant="caption" className="text-sm text-card-foreground text-center">
            {text}
          </TextStyled>
        </Fragment>
      )}
    </View>
  );
}
