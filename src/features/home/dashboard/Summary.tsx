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
          icon={"Heart"}
          count={upcomingVisitsCount}
          text={t("home.upcoming-visits")}
          isLoading={isLoadingUpcomingVisitsCount}
        />
        <SummarySquare
          icon={"SquareActivity"}
          count={exercisesCount}
          text={t("home.training-this-week")}
          isLoading={isLoadingExercisesCount}
        />
      </View>
    </View>
  );
}

type SummarySquareProps = {
  icon: IconName;
  count: number;
  text: string;
  isLoading: boolean;
};

function SummarySquare({ icon, count, text, isLoading }: SummarySquareProps) {
  return (
    <View className="flex items-center gap-y-1 bg-card-light dark:bg-card-dark rounded-lg p-4 w-1/2 h-28">
      {isLoading ? (
        <ActivityIndicator size={"large"} className="color-primary-300" />
      ) : (
        <Fragment>
          <IconStyled name={icon} />
          <TextStyled className="text-2xl dark:text-typography-white">{count}</TextStyled>
          <TextStyled className="text-xs color-typography-500">{text}</TextStyled>
        </Fragment>
      )}
    </View>
  );
}
