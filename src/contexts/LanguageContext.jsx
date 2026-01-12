import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Tarayıcı dil tercihini kontrol et veya localStorage'dan al
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      return savedLanguage;
    }
    // Tarayıcı dilini kontrol et
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith("tr") ? "tr" : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "tr" ? "en" : "tr"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
