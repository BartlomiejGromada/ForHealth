import ScreenAuthWrapper from "@/components/ScreenAuthWrapper";
import ButtonStyled from "@/components/ui/ButtonStyled";
import TextInputStyled from "@/components/ui/TextInputStyled";
import TextStyled from "@/components/ui/TextStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { z } from "zod";
import useResetPassword from "./useResetPassword";

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
        <TextStyled variant="heading" className="text-xl text-foreground">
          {t("auth:reset-password")}
        </TextStyled>

        <TextStyled variant="caption" className="text-sm text-foreground-muted">
          {`${t("auth:reset-password-description")}.`}
        </TextStyled>
      </View>

      <View className="gap-2 w-full">
        <TextStyled className="text-foreground">{t("auth:email")}</TextStyled>
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
              placeholder={t("auth:email")}
              icon={"Mail"}
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
        <ButtonStyled
          text={t("auth:log-in")}
          type="tertiary"
          disabled={isLoading}
          onPress={() => navigate("/(app)/sign-in")}
        />
      </View>

      <ButtonStyled
        text={t("auth:reset-password")}
        disabled={isLoading}
        isLoading={isLoading}
        onPress={onSubmit}
        icon="Lock"
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
