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
    container: "bg-button-primary h-12",
    text: "text-button-foreground-primary",
  },
  outlined: {
    container: "bg-button-outlined border border-button-border-outlined h-11",
    text: "text-button-foreground-outlined",
  },
  tertiary: {
    container: "h-10",
    text: "",
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
            `relative rounded-md flex-row items-center justify-center p-2
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
