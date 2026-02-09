import { StatusBar } from "expo-status-bar";
import React from "react";
import { PressableProps, SafeAreaView, ScrollView, View } from "react-native";
import IconPressable from "./ui/IconPressable";
import { IconName } from "./ui/IconStyled";
import TextStyled from "./ui/TextStyled";

export default function ScreenWrapper({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title?: string;
  icon?: PressableProps & {
    name: IconName;
    tooltip: string;
  };
}) {
  return (
    <SafeAreaView className="flex-1 dark:bg-background-dark h-full">
      <StatusBar style="auto" />

      <ScrollView className="px-6">
        <View className={`flex flex-row justify-between ${title ? "pt-10" : ""} items-center pb-4`}>
          {title && (
            <TextStyled variant="heading" className="text-2xl text-left text-foreground">
              {title}
            </TextStyled>
          )}

          {icon && <IconPressable icon={icon.name} tooltip={icon.tooltip} />}
        </View>

        <View className="w-full h-full gap-4 pb-4">{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
