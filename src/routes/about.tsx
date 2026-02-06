import { Component } from "solid-js";
import { useLanguage } from "../providers/LanguageProvider";
import AboutMe from "../pages/AboutMe";

const AboutRoute: Component = () => {
  const { t } = useLanguage();

  return <AboutMe t={t} />;
};

export default AboutRoute;
