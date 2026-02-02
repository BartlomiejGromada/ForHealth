import ScreenWrapper from "@/components/ScreenWrapper";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { useAppStore } from "@/store";
import { removeFromSecureStore } from "@/utils/secure-store";
import { Redirect, router } from "expo-router";
import { LogOutIcon } from "lucide-react-native";
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
      title={`${t("home.welcome")}, ${firstName}!`}
      Icon={{
        name: LogOutIcon,
        tooltip: t("common.logout"),
        onPress: async () => {
          console.log("AAA");
          await removeFromSecureStore("user");
          logout();
          router.navigate("/(app)/auth-welcome");
        },
        accessibilityHint: t("common.logout"),
        accessibilityLabel: t("common.logout-action"),
      }}>
      <Dashboard />
    </ScreenWrapper>
  );
}
