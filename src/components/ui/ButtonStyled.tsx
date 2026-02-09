import { clsx } from "clsx";
import React from "react";
import { Pressable, TouchableOpacityProps, View } from "react-native";
import IconStyled, { IconName } from "./IconStyled";
import StyledActivityIndicator from "./StyledActivityIndicator";
import TextStyled from "./TextStyled";

type ButtonStyledProps = TouchableOpacityProps & {
  text: string;
  isLoading?: boolean;
  type?: "primary" | "outlined" | "tertiary";
  icon?: IconName;
};

const buttonVariants = {
  primary: {
    container: "bg-button-primary h-14 px-6 rounded-md flex-row items-center justify-center",
    text: "text-button-foreground-primary text-base font-semibold",
    iconSize: 24,
  },

  outlined: {
    container:
      "bg-transparent h-11 px-5 rounded-md border border-button-border-outlined flex-row items-center justify-center",
    text: "text-button-foreground-outlined text-sm font-medium",
    iconSize: 20,
  },

  tertiary: {
    container: "bg-transparent h-10 px-3 flex-row items-center justify-center",
    text: "text-foreground text-sm font-medium underline",
    iconSize: 18,
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
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || isLoading }}
      disabled={disabled || isLoading}
      {...rest}>
      {({ pressed }) => (
        <View
          className={clsx(
            styles.container,
            "gap-2",
            (pressed || disabled || isLoading) && "opacity-80"
          )}>
          {(isLoading || icon) && (
            <View>
              {isLoading ? (
                <StyledActivityIndicator size="small" />
              ) : (
                icon && <IconStyled name={icon} size={styles.iconSize} className={styles.text} />
              )}
            </View>
          )}

          <TextStyled className={clsx(styles.text, `${pressed && "opacity-80"}`)}>
            {text}
          </TextStyled>
        </View>
      )}
    </Pressable>
  );
}
