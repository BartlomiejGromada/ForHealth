import { COLORS } from "@/constants/Colors";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Pressable, TouchableOpacityProps, View } from "react-native";
import TextStyled from "./TextStyled";

type ButtonStyledProps = TouchableOpacityProps & {
  text: string;
  isLoading?: boolean;
  type?: "primary" | "outlined";
  Icon?: {
    name: LucideIcon;
    color: string;
  };
};

export default function ButtonStyled({
  text,
  type = "primary",
  isLoading,
  Icon,
  ...rest
}: ButtonStyledProps) {
  const styles = {
    primary: "bg-primary-500",
    outlined: "border border-primary-500 bg-card-light dark:bg-card-dark",
  };

  const spinnerColor = type === "primary" ? COLORS.white : COLORS.primary[500];

  return (
    <Pressable accessibilityRole="button" disabled={isLoading} {...rest}>
      <View
        className={`relative rounded-md flex-row justify-center items-center px-4 py-4 ${
          styles[type]
        } ${rest.disabled && "opacity-60"}`}>
        <TextStyled
          className={`${
            type === "primary" ? "text-typography-white dark:text-black" : "text-primary-500"
          }`}>
          {text}
        </TextStyled>

        {(isLoading || Icon) && (
          <View
            style={{
              position: "absolute",
              right: "50%",
              transform: [{ translateX: 40 }],
            }}>
            {isLoading ? (
              <ActivityIndicator size="small" color={spinnerColor} />
            ) : (
              Icon && <Icon.name color={Icon.color} size={18} />
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
}
