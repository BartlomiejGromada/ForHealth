import TextStyled from "@/components/ui/TextStyled";
import clsx from "clsx";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type ActionButtonProps = TouchableOpacityProps & {
  text: string;
  action: "basic" | "finish" | "cancel" | "remove";
  isLoading?: boolean;
  disabled?: boolean;
  Icon: LucideIcon;
  buttonClassName?: string;
};

export default function ActionButton({
  text,
  action,
  isLoading,
  disabled,
  Icon,
  buttonClassName,
  ...rest
}: ActionButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.6} {...rest}>
      <View
        className={clsx(
          `flex flex-row justify-between items-center gap-2 p-4 border border-primary-500 rounded-md bg-card-light dark:bg-card-dark ${disabled && "opacity-60"}`,
          buttonClassName
        )}>
        <TextStyled className={"text-typography-dark dark:text-typography-white pl-3"}>
          {text}
        </TextStyled>

        {isLoading ? (
          <ActivityIndicator
            className={`${action === "remove" ? "color-red-500" : action === "cancel" ? "color-orange-500" : action === "finish" ? "color-green-500" : "color-secondary-500"}`}
          />
        ) : (
          <Icon
            color={`${action === "remove" ? "#ef4444" : action === "cancel" ? "#f97316" : action === "finish" ? "#22c55e" : "#26A69A"}`}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
