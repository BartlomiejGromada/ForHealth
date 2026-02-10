import ScreenWrapper from "@/components/ScreenWrapper";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { useAppStore } from "@/store";
import { removeFromSecureStore } from "@/utils/secure-store";
import { Redirect } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import Dashboard from "./dashboard";

export default function Home() {
  const { t } = useTranslation();

  const user = useLoggedUser();

  const logout = useAppStore(state => state.logout);

  const firstName = `${user?.details.firstName}`;

  if (!user) {
    return <Redirect href={"/(app)/auth-welcome"} />;
  }

  return (
    <ScreenWrapper
      title={`${t("home:welcome")}, ${firstName}!`}
      icon={{
        name: "LogOut",
        tooltip: t("common.logout"),
        onPress: async () => {
          await removeFromSecureStore("user");
          logout();
        },
        accessibilityHint: t("common.logout"),
        accessibilityLabel: t("common.logout-action"),
      }}>
      <Dashboard />
    </ScreenWrapper>
  );
}
