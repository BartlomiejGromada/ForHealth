import { useAppTheme } from "@/providers/ThemeProvider";
import { FirebaseReponse, ResponseStatus } from "@/types/Firebase";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

type useFetchProps<T> = {
  onFetch: () => Promise<FirebaseReponse<T>>;
  onSuccess: (payload: T) => void;
  i18nNamespace?: string;
  onError?: (error: any) => void;
};

export const useFetch = <T>({
  onFetch,
  onSuccess,
  i18nNamespace = "common",
  onError,
}: useFetchProps<T>) => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await onFetch();

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
      setIsError(true);

      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [onFetch, onSuccess, onError, t, i18nNamespace, theme]);

  return { fetch, isLoading, isSuccess, isError };
};
