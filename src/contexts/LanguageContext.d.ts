import { ReactNode } from "react";

export interface LanguageContextType {
  language: "tr" | "en";
  setLanguage: (language: "tr" | "en") => void;
  toggleLanguage: () => void;
}

export declare const useLanguage: () => LanguageContextType;

export interface LanguageProviderProps {
  children: ReactNode;
}

export declare const LanguageProvider: ({ children }: LanguageProviderProps) => JSX.Element;
