import React from "react";
import { FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, TextInput, TextInputProps, View } from "react-native";
import IconStyled, { IconName } from "./IconStyled";
import TextStyled from "./TextStyled";
import { clsx } from "clsx";

type TextInputStyledProps = {
  icon: IconName;
  errors?: FieldError;
} & TextInputProps;

export default function TextInputStyled({ icon, errors, ...rest }: TextInputStyledProps) {
  const { t } = useTranslation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="w-full gap-1">
      <View
        className={clsx(
          "flex-row items-center rounded-md px-3 bg-input w-full h-11 border",
          errors ? "border-destructive" : "border-border"
        )}>
        <IconStyled name={icon} size={18} />

        <TextInput {...rest} className="flex-1 text-sm leading-5 ml-2 text-foreground" />
      </View>

      {errors && (
        <TextStyled variant="caption" className="text-destructive">
          {t(errors.message!)}
        </TextStyled>
      )}
    </KeyboardAvoidingView>
  );
}
