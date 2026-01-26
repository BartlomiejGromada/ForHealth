import clsx from "clsx";
import React from "react";
import { Text, TextProps } from "react-native";

export type TextType = "regular" | "bold" | "light" | "thin";

type TextStyledProps = {
  type?: TextType;
} & TextProps;

const fontMap: Record<TextType, string> = {
  regular: "font-lato",
  bold: "font-lato-bold",
  light: "font-lato-light",
  thin: "font-lato-thin",
};

export default function TextStyled({
  type = "regular",
  className,
  children,
  ...rest
}: TextStyledProps) {
  return (
    <Text className={clsx(fontMap[type], className)} {...rest}>
      {children}
    </Text>
  );
}
