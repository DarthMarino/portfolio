import {
  createEffect,
  createContext,
  useContext,
  createResource,
  createSignal,
  type Component,
  type JSX,
} from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { fetchDictionary, type Locale } from "../localizations/resources";

// Language context type
type LanguageContextType = {
  locale: () => Locale;
  setLocale: (locale: Locale) => void;
  dict: () => i18n.Flatten<Record<string, any>> | undefined;
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
  toggleLanguage: () => void;
  loading: () => boolean;
};

const LanguageContext = createContext<LanguageContextType>();

export const LanguageProvider: Component<{ children: JSX.Element }> = (
  props,
) => {
  const savedLocale = (): Locale => {
    try {
      return localStorage.getItem("portfolio-language") === "es" ? "es" : "en";
    } catch {
      return "en";
    }
  };
  const [locale, setLocale] = createSignal<Locale>(savedLocale());
  const [dict] = createResource(locale, fetchDictionary);

  const t = i18n.translator(
    (): i18n.Flatten<Record<string, any>> => dict() ?? {},
  );

  createEffect(() => {
    document.documentElement.lang = locale();
    try {
      localStorage.setItem("portfolio-language", locale());
    } catch {
      /* Use the in-memory preference. */
    }
  });

  const toggleLanguage = () => {
    setLocale(locale() === "en" ? "es" : "en");
  };

  const value: LanguageContextType = {
    locale,
    setLocale,
    dict,
    t,
    toggleLanguage,
    loading: () => dict.loading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
