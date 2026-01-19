import { useAppTheme } from "@/providers/ThemeProvider";
import { FirebaseReponse, ResponseStatus } from "@/types/Firebase";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

type useMutationProps<T, R> = {
  onMutation: (args: T) => Promise<FirebaseReponse<R>>;
  onSuccess: (args: R) => void;
  i18nNamespace?: string;
  onError?: (error: any) => void;
};

export const useMutation = <T, R>({
  onMutation,
  onSuccess,
  i18nNamespace = "common",
  onError,
}: useMutationProps<T, R>) => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useCallback(
    async (args: T) => {
      setIsLoading(true);
      setIsSuccess(false);

      try {
        const response = await onMutation(args);

        if (response.status === ResponseStatus.SUCCESS) {
          onSuccess(response.payload);
          setIsSuccess(true);
        } else {
          Toast.show({
            type: "error",
            text1: t("common.error"),
            text2: t(`firebase-errors.${response.error.code}`, { ns: i18nNamespace }),
            props: { theme },
          });
        }
      } catch (error) {
        console.error(error);

        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: t("errors.something-went-wrong", { ns: "common" }),
          props: { theme },
        });

        if (onError) {
          onError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [onMutation, onSuccess, onError, t, i18nNamespace, theme]
  );

  return { mutation, isLoading, isSuccess };
};
