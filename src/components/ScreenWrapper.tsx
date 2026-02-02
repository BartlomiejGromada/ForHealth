import { StatusBar } from "expo-status-bar";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { PressableProps, SafeAreaView, ScrollView, View } from "react-native";
import IconPressable from "./ui/IconPressable";
import TextStyled from "./ui/TextStyled";

export default function ScreenWrapper({
  children,
  title,
  Icon,
}: {
  children: React.ReactNode;
  title?: string;
  Icon?: PressableProps & {
    name: LucideIcon;
    tooltip: string;
    color?: string;
  };
}) {
  return (
    <SafeAreaView className="flex-1 dark:bg-background-dark h-full">
      <StatusBar style="auto" />

      <ScrollView className="px-6">
        <View className={`flex flex-row justify-between ${title ? "pt-10" : ""} items-center pb-4`}>
          {title && (
            <TextStyled type="bold" className="text-2xl text-left  dark:text-typography-white">
              {title}
            </TextStyled>
          )}

          {Icon && (
            <IconPressable {...Icon} Icon={Icon.name} color={Icon.color} tooltip={Icon.tooltip} />
          )}
        </View>

        <View className="w-full h-full gap-4 pb-4">{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
