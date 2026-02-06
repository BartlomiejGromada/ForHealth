import TextStyled from "@/components/ui/TextStyled";
import IconStyled from "@/components/ui/IconStyled";
import React, { useState } from "react";
import { FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

export type PasswordInputProps = {
  errors?: FieldError;
} & TextInputProps;

export default function PasswordInput({ errors, ...rest }: PasswordInputProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="w-full gap-1">
      <View
        className={[
          "flex-row items-center rounded-md px-3 h-11 bg-input border w-full",
          errors ? "border-destructive" : "border-border",
        ].join(" ")}>
        <IconStyled name="Lock" size={18} className="text-icon" />

        <TextInput
          {...rest}
          secureTextEntry={!showPassword}
          className="flex-1 ml-2 text-sm leading-5 font-body text-foreground"
          placeholderTextColor="rgba(138,138,147,1)"
        />

        <TouchableOpacity
          onPress={() => setShowPassword(prev => !prev)}
          accessibilityRole="button"
          accessibilityLabel={t(showPassword ? "auth:hide-password" : "auth:show-password")}>
          <IconStyled name={showPassword ? "EyeOff" : "Eye"} size={18} className="text-icon" />
        </TouchableOpacity>
      </View>

      {/* ERROR */}
      {errors && (
        <TextStyled variant="caption" className="text-destructive">
          {t(errors.message!)}
        </TextStyled>
      )}
    </KeyboardAvoidingView>
  );
}
