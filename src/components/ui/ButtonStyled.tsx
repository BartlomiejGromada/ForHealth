import { clsx } from "clsx";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Pressable, TouchableOpacityProps, View } from "react-native";
import TextStyled from "./TextStyled";
import { IconStyled, IconStyledVaraint } from "./IconStyled";

type ButtonStyledProps = TouchableOpacityProps & {
  text: string;
  isLoading?: boolean;
  type?: "primary" | "outlined";
  Icon?: {
    name: LucideIcon;
    variant?: IconStyledVaraint;
  };
};

const buttonVariants = {
  primary: {
    container: "bg-button-primary",
    text: "text-button-text-primary",
    spinner: "text-button-text-primary",
  },
  outlined: {
    container: "bg-button-outlined border border-button-border",
    text: "text-button-text-outlined",
    spinner: "text-button-text-outlined",
  },
} as const;

export default function ButtonStyled({
  text,
  type = "primary",
  isLoading,
  Icon,
  disabled,
  ...rest
}: ButtonStyledProps) {
  const styles = buttonVariants[type];

  return (
    <Pressable accessibilityRole="button" disabled={disabled || isLoading} {...rest}>
      <View
        className={clsx(
          "relative rounded-md flex-row items-center justify-center px-4 py-4",
          styles.container,
          (disabled || isLoading) && "opacity-60"
        )}>
        <TextStyled className={styles.text}>{text}</TextStyled>

        {(isLoading || Icon) && (
          <View className="absolute right-4">
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              Icon && <IconStyled icon={Icon.name} variant={Icon.variant ?? "default"} size={18} />
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
}
