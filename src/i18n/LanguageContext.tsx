"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Lang } from "./translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
    }
  }, []);

  function setLang(newLang: Lang) {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  }

  function t(key: string): string {
    return translations[lang][key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
}
