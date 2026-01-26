import { useAppTheme } from "@/providers/ThemeProvider";
import { FirebaseReponse, FirebaseReponseWithoutPayload, ResponseStatus } from "@/types/Firebase";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

/* ---------- TYPES ---------- */

type UseMutationWithPayload<T, R> = {
  onMutation: (args: T) => Promise<FirebaseReponse<R>>;
  onSuccess: {
    funtion: (args: R) => void;
    text: string;
  };
  onSuccessText: string;
  i18nNamespace?: string;
  onError?: (error: any) => void;
};

type UseMutationWithoutPayload<T> = {
  onMutation: (args: T) => Promise<FirebaseReponseWithoutPayload>;
  onSuccess: {
    funtion: () => void;
    text: string;
  };
  i18nNamespace?: string;
  onError?: (error: any) => void;
};

/* ---------- OVERLOADS ---------- */

export function useMutation<T, R>(
  props: UseMutationWithPayload<T, R>
): {
  mutation: (args: T) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
};

export function useMutation<T>(props: UseMutationWithoutPayload<T>): {
  mutation: (args: T) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
};

/* ---------- IMPLEMENTATION ---------- */

export function useMutation<T, R>({
  onMutation,
  onSuccess,
  i18nNamespace = "common",
  onError,
}: UseMutationWithPayload<T, R> | UseMutationWithoutPayload<T>) {
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
          if ("payload" in response) {
            (onSuccess.funtion as (arg: R) => void)(response.payload as R);
          } else {
            (onSuccess.funtion as () => void)();
          }

          Toast.show({
            type: "success",
            text1: t("common.success"),
            text2: onSuccess.text,
            props: {
              theme,
            },
            position: "bottom",
            bottomOffset: 100,
          });

          setIsSuccess(true);
        } else {
          Toast.show({
            type: "error",
            text1: t("common.error"),
            text2: t(`firebase-errors.${response.error.code}`, {
              ns: i18nNamespace,
            }),
            props: { theme },
            position: "bottom",
            bottomOffset: 100,
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: t("errors.something-went-wrong", { ns: "common" }),
          props: { theme },
          position: "bottom",
          bottomOffset: 100,
        });

        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [onMutation, onSuccess, onError, t, i18nNamespace, theme]
  );

  return { mutation, isLoading, isSuccess };
}
