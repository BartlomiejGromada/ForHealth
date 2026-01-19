import { useAppTheme } from "@/providers/ThemeProvider";
import { ResponseStatus } from "@/types/Firebase";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { signUpRequest } from "../api";

export default function useSignUp() {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const signUp = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await signUpRequest(email, password, displayName);

      if (response.status === ResponseStatus.SUCCESS) {
        Toast.show({
          type: "success",
          text1: t("common.success"),
          text2: `${t("auth.account-has-been-created", { email: response.payload.email })}`,
          props: {
            theme,
          },
        });
        setIsSuccess(true);
      } else {
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: `${t(`firebase-errors.${response.error.code}`, { ns: "auth" })}`,
          props: {
            theme,
          },
        });
        setIsSuccess(false);
      }
    } catch (e) {
      console.error(e);

      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: `${t(`errors.something-went-wrong`, { ns: "common" })}`,
        props: {
          theme,
        },
      });
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, isSuccess };
}
