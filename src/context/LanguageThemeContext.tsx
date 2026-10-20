"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, TRANSLATIONS } from "@/lib/translations";

interface LanguageThemeContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
  t: typeof TRANSLATIONS.en;
}

const LanguageThemeContext = createContext<LanguageThemeContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
  t: TRANSLATIONS.en,
});

export function LanguageThemeProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setThemeState] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Read stored language
    const savedLang = localStorage.getItem("newmodel_lang") as Language;
    if (savedLang === "en" || savedLang === "kn") {
      setLanguageState(savedLang);
      applyLanguage(savedLang);
    } else {
      applyLanguage("en");
    }

    // Read stored theme
    const savedTheme = localStorage.getItem("newmodel_theme") as "dark" | "light";
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("dark");
    }
  }, []);

  const applyLanguage = (nextLang: Language) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = nextLang;
      document.documentElement.setAttribute("data-language", nextLang);
      document.documentElement.setAttribute("lang", nextLang);
    }
  };

  const applyTheme = (nextTheme: "dark" | "light") => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.setAttribute("data-theme", nextTheme);
      if (nextTheme === "light") {
        root.classList.remove("dark");
        root.classList.add("light");
        document.body.classList.remove("dark");
        document.body.classList.add("light");
      } else {
        root.classList.remove("light");
        root.classList.add("dark");
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      }
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("newmodel_lang", lang);
    applyLanguage(lang);
    window.dispatchEvent(new Event("newmodel-lang-changed"));
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "kn" : "en";
    setLanguage(nextLang);
  };

  const setTheme = (nextTheme: "dark" | "light") => {
    setThemeState(nextTheme);
    localStorage.setItem("newmodel_theme", nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new Event("newmodel-theme-changed"));
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  const activeTranslations = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <LanguageThemeContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        t: activeTranslations,
      }}
    >
      {children}
    </LanguageThemeContext.Provider>
  );
}

export function useLanguageTheme() {
  return useContext(LanguageThemeContext);
}
