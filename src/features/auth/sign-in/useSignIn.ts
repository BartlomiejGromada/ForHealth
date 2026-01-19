import { USER_KEY } from "@/constants/SecureStoreKeys";
import { useAppTheme } from "@/providers/ThemeProvider";
import { useAppStore } from "@/store";
import { ResponseStatus } from "@/types/Firebase";
import { saveInSecureStore } from "@/utils/secure-store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { signInRequest } from "../api";

export default function useSignIn() {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  const login = useAppStore(state => state.login);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await signInRequest(email, password);

      if (response.status === ResponseStatus.SUCCESS) {
        saveInSecureStore(USER_KEY, response.payload);
        login(response.payload);
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

  return { signIn, isLoading, isSuccess };
}
