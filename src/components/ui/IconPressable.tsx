import { COLORS } from "@/constants/Colors";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { ColorValue, TouchableOpacityProps } from "react-native";
import StyledTouchableOpacity from "./StyledTouchableOpacity";

type IconPressableProps = TouchableOpacityProps & {
  Icon: LucideIcon;
  color?: ColorValue;
};

export default function IconPressable({ Icon, color, ...rest }: IconPressableProps) {
  const defaultColor = COLORS.primary[500];

  return (
    <StyledTouchableOpacity {...rest}>
      <Icon color={color ?? defaultColor} />
    </StyledTouchableOpacity>
  );
}
