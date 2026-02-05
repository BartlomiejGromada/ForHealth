import { clsx } from "clsx";
import React from "react";
import { Text, TextProps } from "react-native";

type TextStyledProps = TextProps & {
  variant?: "body" | "heading" | "caption";
};

const variants = {
  body: "font-body text-base leading-6 text-text-primary",
  heading: "font-heading text-4xl text-lg leading-7 text-text-primary",
  caption: "font-caption text-sm leading-5 text-text-secondary",
};

export default function TextStyled({ variant = "body", className, ...props }: TextStyledProps) {
  return <Text {...props} className={clsx(variants[variant], className)} />;
}
