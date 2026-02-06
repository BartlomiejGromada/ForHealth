import { IntensityEnum } from "@/types/Exercise";
import React from "react";
import { View } from "react-native";
import IconStyled from "./ui/IconStyled";

type IntensityIndicatorProps = {
  intensity: IntensityEnum;
  max?: number;
};

const INTENSITY_MAP: Record<IntensityEnum, number> = {
  [IntensityEnum.LOW]: 1,
  [IntensityEnum.MEDIUM]: 2,
  [IntensityEnum.HIGH]: 3,
};

export default function IntensityIndicator({ intensity, max = 3 }: IntensityIndicatorProps) {
  const count = INTENSITY_MAP[intensity] ?? 0;

  return (
    <View className="flex flex-row">
      <View className="flex flex-row">
        {Array.from({ length: Math.min(count, max) }).map((_, index) => (
          <IconStyled name="Flame" key={index} />
        ))}
      </View>
    </View>
  );
}
