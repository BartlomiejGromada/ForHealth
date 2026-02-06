// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getLocales } from "expo-localization";
// import { use } from "i18next";
// import { initReactI18next } from "react-i18next";
// import { resources } from "./i18nResources";

// const initalizeI18N = async () => {
//   let savedLanguage = await AsyncStorage.getItem("language");

//   if (!savedLanguage) {
//     savedLanguage = getLocales()[0].languageCode;
//   }

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   void use(initReactI18next).init({
//     debug: process.env.EXPO_PUBLIC_ENV === "DEV",
//     resources: resources,
//     lng: savedLanguage ?? "en",
//     fallbackLng: "en",
//     ns: ["common", "home", "calendar", "add", "profile", "auth", "visits"],
//     defaultNS: "common",
//     fallbackNS: "common",
//     nsSeparator: ".",
//     interpolation: {
//       escapeValue: false,
//     },
//   });
// };

// void initalizeI18N();

// export default initalizeI18N;

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./i18nResources";

const SUPPORTED_LANGUAGES = ["pl", "en"] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function getDeviceLanguage(): SupportedLanguage {
  const locale = Localization.getLocales()[0];

  const languageCode = locale?.languageCode as SupportedLanguage | undefined;

  if (languageCode && SUPPORTED_LANGUAGES.includes(languageCode)) {
    return languageCode;
  }

  return "en";
}

export async function initializeI18n() {
  const storedLanguage = await AsyncStorage.getItem("language");

  const language = (storedLanguage as SupportedLanguage | null) ?? getDeviceLanguage();

  await i18n.use(initReactI18next).init({
    debug: process.env.EXPO_PUBLIC_ENV === "DEV",

    resources,
    lng: language,
    fallbackLng: "en",

    ns: ["common", "home", "calendar", "add", "profile", "auth", "visits"],
    defaultNS: "common",

    nsSeparator: ":",
    keySeparator: ".",

    interpolation: {
      escapeValue: false,
    },

    compatibilityJSON: "v4",
  });
}

export default i18n;
