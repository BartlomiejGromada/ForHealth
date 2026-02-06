import { clsx } from "clsx";
import React from "react";
import { Pressable, TouchableOpacityProps, View } from "react-native";
import IconStyled, { IconName } from "./IconStyled";
import StyledActivityIndicator from "./StyledActivityIndicator";
import TextStyled from "./TextStyled";

type ButtonStyledProps = TouchableOpacityProps & {
  text: string;
  isLoading?: boolean;
  type?: "primary" | "outlined";
  icon?: IconName;
};

const buttonVariants = {
  primary: {
    container: "bg-button-primary",
    text: "text-button-foreground-primary",
    // spinner: "bg-button-secondary",
  },
  outlined: {
    container: "bg-button-outlined border border-button-border-outlined",
    text: "text-button-foreground-outlined",
    // spinner: "bg-button-outlined-secondary",
  },
} as const;

export default function ButtonStyled({
  text,
  type = "primary",
  isLoading,
  icon,
  disabled,
  ...rest
}: ButtonStyledProps) {
  const styles = buttonVariants[type];

  return (
    <Pressable accessibilityRole="button" disabled={disabled || isLoading} {...rest}>
      {({ pressed }) => (
        <View
          className={clsx(
            `relative rounded-md flex-row items-center justify-center px-4 py-4
            ${pressed || disabled || isLoading ? "opacity-80" : ""}`,
            styles.container
          )}>
          <TextStyled className={styles.text}>{text}</TextStyled>

          {(isLoading || icon) && (
            <View className="absolute right-4 text-button-outlined-text">
              {isLoading ? (
                <StyledActivityIndicator className={styles.text} />
              ) : (
                icon && <IconStyled name={icon} className={styles.text} />
              )}
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}
