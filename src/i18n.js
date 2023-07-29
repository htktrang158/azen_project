import i18next from "i18next";
import EN_TRANSTALTE from "./locales/en/translate";
import VI_TRANSTALTE from "./locales/vi/translate";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
    en: { translation: EN_TRANSTALTE },
    vi: { translation: VI_TRANSTALTE },
};
i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        detection:{
        order: ["queryString", "cookie", "localStorage", "navigate"],
        lookupQueryString: "lng",
        lookupCookie: "lang",
        lookupLocalStorage: "lang",
        caches: ["localStorage", "cookie"],
    },
        lng: "vi",
        debug: true,
        interpolation: {
        escapeValue: false,

    },
});
export default i18next;
