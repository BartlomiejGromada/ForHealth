import { COLORS } from "@/constants/Colors";
import { useAppTheme } from "@/providers/ThemeProvider";
import { RefreshCcwIcon, XCircleIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import ButtonStyled from "./ui/ButtonStyled";
import TextStyled from "./ui/TextStyled";

type StandaloneScreenWrapperProps = {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
};

export default function StandaloneScreenWrapper({
  isLoading,
  isError,
  children,
}: StandaloneScreenWrapperProps) {
  return isLoading ? (
    <ActivityIndicator size={"large"} className="color-primary-500" />
  ) : isError ? (
    <ErrorContainer />
  ) : (
    children
  );
}

const ErrorContainer = () => {
  return (
    <View className="p-4 rounded-md gap-4 h-[88vh] bg-card-light dark:bg-card-dark">
      <ErrorTitle />

      <ErrorAdvise />

      <ErrorActions />
    </View>
  );
};

const ErrorTitle = () => {
  const { t } = useTranslation();

  return (
    <View className="flex items-center gap-2 p-2">
      <XCircleIcon color={COLORS.error.light} size={100} fill={"#f8a4a4"} />
      <TextStyled className="text-2xl font-bold dark:color-typography-white">
        {t("common.errors.something-went-wrong")}
      </TextStyled>
      <TextStyled className="text-center text-lg color-typography-500">
        {t("common.errors.something-went-wrong-description")}
      </TextStyled>
    </View>
  );
};

const ErrorAdvise = () => {
  const { t } = useTranslation();

  return (
    <View className="flex gap-2 p-4 rounded-lg bg-card-light dark:bg-card-dark border border-primary-500">
      <TextStyled type="bold" className="text-lg dark:text-typography-white">
        {t("common.what-can-you-do")}
      </TextStyled>

      <TextStyled className="color-typography-500">{`• ${t("common.check-your-internet-connection")}`}</TextStyled>
      <TextStyled className="color-typography-500">{`• ${t("common.refresh-page")}`}</TextStyled>
      <TextStyled className="color-typography-500">{`• ${t("common.try-again-later")}`}</TextStyled>
    </View>
  );
};

const ErrorActions = () => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  return (
    <View className="pt-6">
      <ButtonStyled
        text={t("common.try-again")}
        Icon={{
          name: RefreshCcwIcon,
          color: theme === "dark" ? COLORS.black : COLORS.white,
        }}
      />
    </View>
  );
};
