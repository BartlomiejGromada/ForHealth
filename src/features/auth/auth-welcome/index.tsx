import ScreenAuthWrapper from "@/components/ScreenAuthWrapper";
import ButtonStyled from "@/components/ui/ButtonStyled";
import IconStyled from "@/components/ui/IconStyled";
import TextStyled from "@/components/ui/TextStyled";
import { useAppStore } from "@/store";
import { Redirect, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";

export default function AuthWelcome() {
  const { t } = useTranslation();
  const { navigate } = useRouter();

  const isLoggedIn = useAppStore(state => state.isLoggedIn);

  if (isLoggedIn) {
    return <Redirect href={"/(root)"} />;
  }

  return (
    <ScreenAuthWrapper center={true}>
      <View className="flex-1 items-center justify-center gap-4">
        <View className="flex items-center justify-center rounded-full bg-icon-background h-36 w-36">
          <Animated.View entering={BounceIn}>
            <IconStyled name="Heart" size={70} />
          </Animated.View>
        </View>

        <View className="flex items-center gap-2">
          <TextStyled variant="heading">{"ForHealth"}</TextStyled>
          <TextStyled variant="caption">{t("auth:take-care-of-your-health-with-us")}</TextStyled>
        </View>
      </View>

      <View className="w-full gap-4 justify-end pb-10">
        <ButtonStyled
          text={t("auth:login")}
          icon={"LogIn"}
          onPress={() => navigate("/(app)/sign-in")}
        />
        <ButtonStyled
          text={t("auth:registration")}
          onPress={() => navigate("/(app)/sign-up")}
          icon="UserPlus"
          type="outlined"
        />
      </View>
    </ScreenAuthWrapper>
  );
}
