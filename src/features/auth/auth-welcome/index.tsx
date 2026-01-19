import ScreenAuthWrapper from "@/components/ScreenAuthWrapper";
import ButtonStyled from "@/components/ui/ButtonStyled";
import TextStyled from "@/components/ui/TextStyled";
import { COLORS } from "@/constants/Colors";
import { useAppStore } from "@/store";
import { Redirect, useRouter } from "expo-router";
import { HeartIcon } from "lucide-react-native";
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
        <View className="flex items-center justify-center rounded-full bg-primary-200 h-36 w-36">
          <Animated.View entering={BounceIn}>
            <HeartIcon color={COLORS.primary[500]} size={70} />
          </Animated.View>
        </View>

        <View className="flex items-center gap-2">
          <TextStyled type="bold" className="dark:color-typography-white text-4xl">
            {"ForHealth"}
          </TextStyled>
          <TextStyled className="color-gray-400 text-sm">
            {t("auth.take-care-of-your-health-with-us")}
          </TextStyled>
        </View>
      </View>

      <View className="w-full gap-4 justify-end pb-10">
        <ButtonStyled text={t("auth.login")} onPress={() => navigate("/(app)/sign-in")} />
        <ButtonStyled
          text={t("auth.registration")}
          onPress={() => navigate("/(app)/sign-up")}
          type="outlined"
        />
      </View>
    </ScreenAuthWrapper>
  );
}
