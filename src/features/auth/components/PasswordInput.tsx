import TextStyled from "@/components/ui/TextStyled";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react-native";
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

  const [showPassword, setShowPasword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="w-full">
      <View
        className={`flex-row items-center border ${errors ? "border-error-light dark:border-error-dark" : "border-gray-300"} rounded-md px-3 py-2 bg-white w-full dark:bg-card-dark`}>
        {/* <LockIcon color={COLORS.primary[500]} size={20} /> */}
        <TextInput
          {...rest}
          secureTextEntry={!showPassword}
          className="font-lato flex-1 text-base ml-2 text-black dark:text-typography-white"
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowPasword(!showPassword)}>
          {showPassword ? (
            <EyeOffIcon size={20} color="#666" />
          ) : (
            <EyeIcon size={20} color="#666" />
          )}
        </TouchableOpacity>
      </View>

      {errors && (
        <TextStyled className="color-error-light dark:color-error-dark text-sm pt-2">
          {t(errors.message!)}
        </TextStyled>
      )}
    </KeyboardAvoidingView>
  );
}
