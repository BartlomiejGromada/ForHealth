import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

type ScreenAuthWrapperProps = { center?: boolean } & SafeAreaViewProps;

export default function ScreenAuthWrapper({ center, children, ...rest }: ScreenAuthWrapperProps) {
  return (
    <SafeAreaView className="flex-1 dark:bg-background-dark h-full" {...rest}>
      <StatusBar style="auto" />

      <View
        className={`${center ? "flex items-center justify-center" : "pt-12"} dark:bg-background-dark h-full gap-4 p-4 w-full`}>
        {children}
      </View>
    </SafeAreaView>
  );
}
