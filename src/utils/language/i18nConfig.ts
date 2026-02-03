import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { use } from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./i18nResources";

const initalizeI18N = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = getLocales()[0].languageCode;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  void use(initReactI18next).init({
    debug: process.env.EXPO_PUBLIC_ENV === "DEV",
    resources: resources,
    lng: savedLanguage ?? "en",
    fallbackLng: "en",
    ns: ["common", "home", "calendar", "add", "profile", "auth", "visits"],
    defaultNS: "common",
    fallbackNS: "common",
    nsSeparator: ".",
    interpolation: {
      escapeValue: false,
    },
  });
};

void initalizeI18N();

export default initalizeI18N;
