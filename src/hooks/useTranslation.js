import { useLanguage } from "../contexts/LanguageContext";
import trTranslations from "../translations/tr.json";
import enTranslations from "../translations/en.json";

const translations = {
  tr: trTranslations,
  en: enTranslations,
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, language };
};
