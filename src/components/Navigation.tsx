import { type Component } from "solid-js";
import { useLanguage } from "../providers/LanguageProvider";
import "./Navigation.css";

const Navigation: Component = () => {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <div class="fixed top-4 right-4 z-50">
      <button
        onClick={toggleLanguage}
        class="language-toggle"
        aria-label="Toggle language"
      >
        {locale() === "en" ? "ES" : "EN"}
      </button>
    </div>
  );
};

export default Navigation;
