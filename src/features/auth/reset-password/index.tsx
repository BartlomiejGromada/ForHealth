import ScreenAuthWrapper from "@/components/ScreenAuthWrapper";
import TextInputStyled from "@/components/ui/TextInputStyled";
import TextStyled from "@/components/ui/TextStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { MailIcon } from "lucide-react-native";
import React from "react";
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import useResetPassword from "./useResetPassword";
import TextPressable from "@/components/ui/TextPressable";
import ButtonStyled from "@/components/ui/ButtonStyled";
import { z } from "zod";

type ResetPasswordType = {
  email: string;
};

export default function ResetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { resetPassword, isLoading } = useResetPassword();

  const onHandleSubmit = async (data: ResetPasswordType) => {
    await resetPassword(data.email);
    reset();
  };

  return (
    <ScreenAuthWrapper className="justify-start items-start">
      <ScrollView>
        <View className="gap-6">
          <FormContainer control={control} errors={errors} isLoading={isLoading} />

          <ActionsContainer isLoading={isLoading} onSubmit={handleSubmit(onHandleSubmit)} />
        </View>
      </ScrollView>
    </ScreenAuthWrapper>
  );
}

const FormContainer = ({
  control,
  errors,
  isLoading,
}: {
  control: Control<ResetPasswordType, any, ResetPasswordType>;
  errors: FieldErrors<ResetPasswordType>;
  isLoading: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <View className="gap-4">
      <View className="gap-2">
        <TextStyled type="bold" className="text-3xl dark:color-typography-white">
          {t("auth.reset-password")}
        </TextStyled>
      </View>

      <View className="gap-2 w-full">
        <TextStyled type="bold" className=" dark:color-typography-white">
          {t("auth.email")}
        </TextStyled>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputStyled
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errors={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder={t("auth.email")}
              Icon={MailIcon}
              editable={!isLoading}
            />
          )}
        />
      </View>
    </View>
  );
};

const ActionsContainer = ({
  isLoading,
  onSubmit,
}: {
  isLoading: boolean;
  onSubmit: () => void;
}) => {
  const { t } = useTranslation();
  const { navigate } = useRouter();

  return (
    <View className="gap-2">
      <View className="flex items-end">
        <TextPressable
          text={t("auth.log-in")}
          onPress={() => navigate("/(app)/sign-in")}
          disabled={isLoading}
        />
      </View>

      <ButtonStyled
        text={t("auth.reset-password")}
        disabled={isLoading}
        isLoading={isLoading}
        onPress={onSubmit}
        className="pt-4"
      />
    </View>
  );
};

const validationSchema = z.object({
  email: z.string().min(1, { message: "auth:errors.email-is-required" }).email({
    message: "auth:errors.email-is-invalid",
  }),
});
