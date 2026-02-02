import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type StyledTouchableOpacityProps = TouchableOpacityProps & {};

export default function StyledTouchableOpacity({ children, ...rest }: StyledTouchableOpacityProps) {
  return (
    <TouchableOpacity activeOpacity={0.6} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
