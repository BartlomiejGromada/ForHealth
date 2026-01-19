import { LucideIcon } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
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

  return (
    <TouchableOpacity activeOpacity={0.6} {...rest}>
      <View
        className={`rounded-md flex flex-row justify-center items-center gap-2 p-4 ${styles[type]}  ${rest.disabled && "opacity-60"}`}>
        <TextStyled
          className={`${type === "primary" ? "text-typography-white dark:text-black" : "text-primary-500"}`}>
          {text}
        </TextStyled>

        {isLoading && <ActivityIndicator className="color-white dark:color-black" />}

        {Icon && <Icon.name color={Icon.color} />}
      </View>
    </TouchableOpacity>
  );
}
