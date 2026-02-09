import ScreenAuthWrapper from "@/components/ScreenAuthWrapper";
import ButtonStyled from "@/components/ui/ButtonStyled";
import TextInputStyled from "@/components/ui/TextInputStyled";
import TextStyled from "@/components/ui/TextStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { z } from "zod";
import PasswordInput from "../components/PasswordInput";
import useSignUp from "./useSignUp";

type SignUpFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SingUpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormType>({
    resolver: zodResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { signUp, isLoading, isSuccess } = useSignUp();

  const onHandleSubmit = async (data: SignUpFormType) => {
    await signUp(data.email, data.password, data.name);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <ScreenAuthWrapper className="justify-start items-start">
      <ScrollView>
        <View className="gap-4">
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
  control: Control<SignUpFormType, any, SignUpFormType>;
  errors: FieldErrors<SignUpFormType>;
  isLoading: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <View className="gap-4">
      <View className="gap-2">
        <TextStyled variant="heading" className="text-xl text-foreground">
          {t("auth:registration")}
        </TextStyled>
        <TextStyled variant="caption" className="text-foreground-muted">
          {`${t("auth:create-new-account-and-take-care-of-your-health")}.`}
        </TextStyled>
      </View>

      <View className="gap-2 w-full">
        <TextStyled className="text-foreground">{t("auth:firstname-and-lastname")}</TextStyled>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputStyled
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errors={errors.name}
              autoCapitalize="words"
              placeholder={t("auth:firstname-and-lastname")}
              icon="User"
              editable={!isLoading}
            />
          )}
        />
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
              icon="Mail"
              editable={!isLoading}
            />
          )}
        />
      </View>

      <View className="gap-2 w-full">
        <TextStyled className="text-foreground">{t("auth:password")}</TextStyled>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errors={errors.password}
              autoCapitalize="none"
              placeholder={t("auth:password")}
              editable={!isLoading}
            />
          )}
        />
      </View>

      <View className="gap-2 w-full">
        <TextStyled className="text-foreground">{t("auth:confirm-password")}</TextStyled>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errors={errors.confirmPassword}
              autoCapitalize="none"
              placeholder={t("auth:confirm-password")}
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
    <View>
      <ButtonStyled
        text={t("auth:sign-up")}
        disabled={isLoading}
        onPress={onSubmit}
        isLoading={isLoading}
        className="pt-12"
      />

      <View className="flex flex-row items-center justify-center gap-2 pt-6">
        <TextStyled className="text-foreground">{t("auth:already-have-an-account")}</TextStyled>

        <ButtonStyled
          text={t("auth:log-in")}
          type="tertiary"
          disabled={isLoading}
          onPress={() => navigate("/(app)/sign-in")}
        />
      </View>
    </View>
  );
};

const validationSchema = z
  .object({
    name: z.string().min(1, {
      message: "auth:errors.firstname-and-lastname-is-required",
    }),
    email: z
      .string()
      .min(1, { message: "auth:errors.email-is-required" })
      .email({ message: "auth:errors.email-is-invalid" }),
    password: z
      .string()
      .min(1, {
        message: "auth:errors.password-is-required",
      })
      .min(8, {
        message: "auth:errors.password-must-have-atleast-count-characters",
      })
      .regex(/\d/, {
        message: "auth:errors.password-must-contain-digit",
      }) // Przynajmniej jedna cyfra
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "auth:errors.password-must-contain-special-character",
      }), // Przynajmniej jeden znak specjalny
    confirmPassword: z.string().min(1, {
      message: "auth:errors.confirm-password-is-required",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "auth:errors.confirm-password-is-not-match-to-password",
        path: ["confirmPassword"],
      });
    }
  });
