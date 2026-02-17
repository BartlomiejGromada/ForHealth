import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import ButtonStyled from "./ui/ButtonStyled";
import IconStyled from "./ui/IconStyled";
import StyledActivityIndicator from "./ui/StyledActivityIndicator";
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
    <StyledActivityIndicator size={"large"} className="color-spinner" />
  ) : isError ? (
    <ErrorContainer />
  ) : (
    children
  );
}

const ErrorContainer = () => {
  return (
    <View className="p-4 rounded-md gap-4 ">
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
      <IconStyled name="CircleX" />

      <TextStyled className="text-2xl font-bold color-foreground">
        {t("common:errors.something-went-wrong")}
      </TextStyled>
      <TextStyled variant="caption" className="text-center text-lg color-foreground-muted">
        {t("common:errors.something-went-wrong-description")}
      </TextStyled>
    </View>
  );
};

const ErrorAdvise = () => {
  const { t } = useTranslation();

  return (
    <View className="flex gap-2 p-4 rounded-lg border bg-background border-border">
      <TextStyled className="text-lg color-foreground">{t("common:what-can-you-do")}</TextStyled>

      <TextStyled
        variant="caption"
        className="color-foreground-muted">{`• ${t("common:check-your-internet-connection")}`}</TextStyled>
      <TextStyled
        variant="caption"
        className="color-foreground-muted">{`• ${t("common:refresh-page")}`}</TextStyled>
      <TextStyled
        variant="caption"
        className="color-foreground-muted">{`• ${t("common:try-again-later")}`}</TextStyled>
    </View>
  );
};

const ErrorActions = () => {
  const { t } = useTranslation();

  return (
    <View className="pt-6">
      <ButtonStyled text={t("common:try-again")} icon="RefreshCcw" />
    </View>
  );
};
