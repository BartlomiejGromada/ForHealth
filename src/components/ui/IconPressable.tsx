import { THEME_TOKENS } from "@/constants/ThemeTokens";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { ColorValue, Pressable, PressableProps, View } from "react-native";
import { Tooltip } from "react-native-paper";

type IconPressableProps = PressableProps & {
  Icon: LucideIcon;
  tooltip: string;
  color?: ColorValue;
};

export default function IconPressable({ Icon, color, tooltip, ...rest }: IconPressableProps) {
  return (
    <Tooltip title={tooltip}>
      <Pressable {...rest} accessibilityRole="button" hitSlop={8}>
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <Icon color={color ?? THEME_TOKENS.button.background} />
          </View>
        )}
      </Pressable>
    </Tooltip>
  );
}
