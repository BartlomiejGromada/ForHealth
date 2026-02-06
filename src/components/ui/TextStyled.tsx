import { clsx } from "clsx";
import React from "react";
import { Text, TextProps } from "react-native";

export type TextStyledVariant = "body" | "heading" | "caption";

type TextStyledProps = TextProps & {
  variant?: TextStyledVariant;
};

const variants = {
  body: "font-body text-base leading-6 text-foreground",
  heading: "font-heading text-4xl leading-10 text-foreground",
  caption: "font-caption text-sm leading-5 text-foreground-muted",
};

export default function TextStyled({ variant = "body", className, ...props }: TextStyledProps) {
  return <Text {...props} className={clsx(variants[variant], className)} />;
}
