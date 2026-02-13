import ButtonStyled from "@/components/ui/ButtonStyled";
import TextStyled from "@/components/ui/TextStyled";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function ContainerSection({
  title,
  onPressAction,
  children,
}: {
  title: string;
  onPressAction: () => void;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <View className="w-100 gap-y-4">
      <View className="flex flex-row justify-between items-center">
        <TextStyled variant="heading" className="text-lg text-foreground">
          {title}
        </TextStyled>
        <ButtonStyled
          type="tertiary"
          text={t("home:see-all")}
          textClassName="text-foreground-muted"
          onPress={onPressAction}
        />
      </View>

      {children}
    </View>
  );
}
