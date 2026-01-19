import { useAppTheme } from "@/providers/ThemeProvider";
import { ResponseStatus } from "@/types/Firebase";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { resetPasswordRequest } from "../api";

export default function useResetPassword() {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await resetPasswordRequest(email);

      if (response.status === ResponseStatus.SUCCESS) {
        Toast.show({
          type: "success",
          text1: t("common.success"),
          text2: `${(t("auth.passsword-has-been-reseted"), { email: email })}`,
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

  return { resetPassword, isLoading, isSuccess };
}
