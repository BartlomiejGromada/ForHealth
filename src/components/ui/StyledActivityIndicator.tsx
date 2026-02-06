import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

type StyledActivityIndicatorProps = ActivityIndicatorProps & {};

export default function StyledActivityIndicator({
  className = "",
  ...rest
}: StyledActivityIndicatorProps) {
  return <ActivityIndicator className={className} {...rest} />;
}
