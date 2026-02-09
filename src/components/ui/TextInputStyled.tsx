import { clsx } from "clsx";
import React from "react";
import { FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, TextInput, TextInputProps, View } from "react-native";
import IconStyled, { IconName } from "./IconStyled";
import TextStyled from "./TextStyled";

type TextInputStyledProps = TextInputProps & {
  icon: IconName;
  errors?: FieldError;
};

export default function TextInputStyled({
  icon,
  errors,
  editable = true,
  ...rest
}: TextInputStyledProps) {
  const { t } = useTranslation();

  const isDisabled = editable === false;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="w-full gap-1">
      <View
        className={clsx(
          "flex-row items-center h-14 w-full rounded-md border bg-input px-3",
          errors ? "border-destructive" : "border-border",
          isDisabled && "opacity-50"
        )}>
        <IconStyled name={icon} size={20} className="text-foreground-muted" />

        <TextInput
          {...rest}
          editable={editable}
          autoCorrect={false}
          textAlignVertical="center"
          className="flex-1 ml-2 text-foreground placeholder:text-foreground"
        />
      </View>

      {errors && (
        <TextStyled variant="caption" className="pl-4 text-xs text-destructive">
          {t(errors.message!)}
        </TextStyled>
      )}
    </KeyboardAvoidingView>
  );
}
