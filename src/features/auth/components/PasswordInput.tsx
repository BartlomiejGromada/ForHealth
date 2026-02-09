import IconStyled from "@/components/ui/IconStyled";
import TextStyled from "@/components/ui/TextStyled";
import React, { useState } from "react";
import { FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

export type PasswordInputProps = TextInputProps & {
  errors?: FieldError;
};

export default function PasswordInput({ errors, ...rest }: PasswordInputProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="w-full gap-1">
      <View
        className={[
          "flex-row items-center h-14 w-full rounded-md border bg-input px-3",
          errors ? "border-destructive" : "border-border",
        ].join(" ")}>
        <IconStyled name="Lock" size={20} className="text-foreground-muted" />

        <TextInput
          {...rest}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          textAlignVertical="center"
          className="flex-1 ml-2 text-foreground placeholder:text-foreground"
        />

        <Pressable
          onPress={() => setShowPassword(prev => !prev)}
          accessibilityRole="button"
          accessibilityLabel={t(showPassword ? "auth:hide-password" : "auth:show-password")}
          hitSlop={8}
          className="ml-2 h-10 w-10 items-center justify-center">
          <IconStyled
            name={showPassword ? "EyeOff" : "Eye"}
            size={20}
            className="text-foreground-muted"
          />
        </Pressable>
      </View>

      {errors && (
        <TextStyled variant="caption" className="pl-4 text-xs text-destructive">
          {t(errors.message!)}
        </TextStyled>
      )}
    </KeyboardAvoidingView>
  );
}
