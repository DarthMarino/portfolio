import { Component } from "solid-js";
import { useLanguage } from "../providers/LanguageProvider";
import Experience from "../pages/Experience";

const ExperienceRoute: Component = () => {
  const { t } = useLanguage();

  return <Experience t={t} />;
};

export default ExperienceRoute;
