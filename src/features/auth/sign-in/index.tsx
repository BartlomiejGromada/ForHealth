import ScreenAuthWrapper from "@/components/ScreenAuthWrapper";
import ButtonStyled from "@/components/ui/ButtonStyled";
import TextInputStyled from "@/components/ui/TextInputStyled";
import TextPressable from "@/components/ui/TextPressable";
import TextStyled from "@/components/ui/TextStyled";
import PasswordInput from "@/features/auth/components/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useNavigation, useRouter } from "expo-router";
import { MailIcon } from "lucide-react-native";
import React, { useEffect } from "react";
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { z } from "zod";
import useSignIn from "./useSignIn";

type SignInFormType = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn, isLoading, isSuccess } = useSignIn();

  const onHandleSubmit = async (data: SignInFormType) => {
    await signIn(data.email, data.password);
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace("/(root)");
    }
  }, [isSuccess, navigation]);

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
  control: Control<SignInFormType, any, SignInFormType>;
  errors: FieldErrors<SignInFormType>;
  isLoading: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <View className="gap-4">
      <View className="gap-2">
        <TextStyled type="bold" className="text-3xl dark:color-typography-white">
          {t("auth.login")}
        </TextStyled>
        <TextStyled className="text-sm color-typography-500">
          {`${t("auth.welcome-back")}! ${t("auth.log-in-to-your-account")}`}
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

      <View className="gap-2 w-full">
        <TextStyled type="bold" className="dark:color-typography-white">
          {t("auth.password")}
        </TextStyled>
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
              placeholder={t("auth.password")}
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
      <TextPressable
        text={t("auth.forgot-password")}
        classNameText={"text-right text-primary-500 font-light text-sm"}
        onPress={() => {
          navigate("/(app)/reset-password");
        }}
        disabled={isLoading}
      />

      <ButtonStyled
        text={t("auth.log-in")}
        disabled={isLoading}
        isLoading={isLoading}
        onPress={onSubmit}
        className="pt-4"
      />

      <View className="flex flex-row justify-center gap-2 pt-4">
        <TextStyled className=" text-typography-400">
          {t("auth.dont-have-an-account-yet")}
        </TextStyled>
        <TextPressable
          text={t("auth.sign-up")}
          type={"bold"}
          onPress={() => navigate("/(app)/sign-up")}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

const validationSchema = z.object({
  email: z.string().min(1, { message: "auth.errors.email-is-required" }).email({
    message: "auth.errors.email-is-invalid",
  }),
  password: z
    .string()
    .min(1, {
      message: "auth.errors.password-is-required",
    })
    .min(8, {
      message: "auth.errors.password-must-have-atleast-count-characters",
    })
    .regex(/\d/, {
      message: "auth.errors.password-must-contain-digit",
    }) // Przynajmniej jedna cyfra
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "auth.errors.password-must-contain-special-character",
    }), // Przynajmniej jeden znak specjalny
});
