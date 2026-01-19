import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./i18nResources";

const initalizeI18N = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = getLocales()[0].languageCode;
  }

  i18n.use(initReactI18next).init({
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

initalizeI18N();

export default i18n;
