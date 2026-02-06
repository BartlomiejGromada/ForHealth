import React from "react";
import { FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, TextInput, TextInputProps, View } from "react-native";
import IconStyled, { IconName } from "./IconStyled";
import TextStyled from "./TextStyled";

type TextInputStyledProps = {
  icon: IconName;
  errors?: FieldError;
} & TextInputProps;

export default function TextInputStyled({ icon, errors, ...rest }: TextInputStyledProps) {
  const { t } = useTranslation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="w-full gap-2">
      <View
        className={`flex-row items-center border  ${errors ? "border-error-light dark:border-error-dark" : "border-gray-300"} rounded-md px-3 py-2 bg-white w-full  dark:bg-card-dark`}>
        <IconStyled name={icon} />

        <TextInput
          {...rest}
          className="font-lato flex-1 text-base ml-2 text-black dark:text-typography-white"
          placeholderTextColor="#999"
        />
      </View>

      {errors && (
        <TextStyled className="color-error-light dark:color-error-dark text-sm">
          {t(errors.message!)}
        </TextStyled>
      )}
    </KeyboardAvoidingView>
  );
}
