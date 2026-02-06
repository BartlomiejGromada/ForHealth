import TextStyled from "@/components/ui/TextStyled";
import { THEME_TOKENS } from "@/constants/ThemeTokens";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

type IconTextProps = {
  icon: LucideIcon;
  text: string;
  iconSize?: number;
  iconColor?: string;
};

export default function IconText({
  icon: Icon,
  text,
  iconSize = 14,
  iconColor = THEME_TOKENS.primary,
}: IconTextProps) {
  return (
    <View className="flex flex-row items-center gap-x-1">
      <Icon size={iconSize} color={iconColor} />
      <TextStyled className="text-sm color-typography-500">{text}</TextStyled>
    </View>
  );
}
