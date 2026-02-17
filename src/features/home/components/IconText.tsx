import IconStyled, { IconName } from "@/components/ui/IconStyled";
import TextStyled from "@/components/ui/TextStyled";
import React from "react";
import { View } from "react-native";

type IconTextProps = {
  icon: IconName;
  text: string;
  iconSize?: number;
};

export default function IconText({ icon: Icon, text, iconSize = 14 }: IconTextProps) {
  return (
    <View className="flex flex-row items-center gap-2">
      <IconStyled name={Icon} size={iconSize} className="text-foreground-muted" />
      <TextStyled variant="caption" className="text-foreground-muted">
        {text}
      </TextStyled>
    </View>
  );
}
