import React from "react";
import { ColorValue, Pressable, PressableProps, View } from "react-native";
import { Tooltip } from "react-native-paper";
import IconStyled, { IconName } from "./IconStyled";

type IconPressableProps = PressableProps & {
  icon: IconName;
  tooltip: string;
  color?: ColorValue;
};

export default function IconPressable({ icon, color, tooltip, ...rest }: IconPressableProps) {
  return (
    <Tooltip title={tooltip}>
      <Pressable {...rest} accessibilityRole="button" hitSlop={8}>
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <IconStyled name={icon} />
          </View>
        )}
      </Pressable>
    </Tooltip>
  );
}
