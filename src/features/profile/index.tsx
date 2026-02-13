import ScreenWrapper from "@/components/ScreenWrapper";
import ButtonStyled from "@/components/ui/ButtonStyled";
import React from "react";
import { useTranslation } from "react-i18next";
import ProfileInfo from "./profile-info";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper title={t("profile:profile")}>
      <ProfileInfo />
      <ButtonStyled text={t("profile:edit-profile")} onPress={() => {}} />
    </ScreenWrapper>
  );
}
