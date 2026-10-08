"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Language } from "../data/scenes";

type LanguageContextValue = { language: Language; toggleLanguage: () => void; entered: boolean; enterWebsite: () => void };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [entered, setEntered] = useState(false);
  const enterWebsite = useCallback(() => setEntered(true), []);

  useEffect(() => {
    const stored = window.localStorage.getItem("tamil-heritage-language") ?? window.localStorage.getItem("tamil-mandram-language");
    if (stored !== "ta" && stored !== "en") return;
    const frame = requestAnimationFrame(() => setLanguage(stored));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("tamil-heritage-language", language);
  }, [language]);

  return <LanguageContext.Provider value={{ language, toggleLanguage: () => setLanguage((current) => current === "en" ? "ta" : "en"), entered, enterWebsite }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
