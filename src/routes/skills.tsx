import { Component } from "solid-js";
import { useLanguage } from "../providers/LanguageProvider";
import StudiesSkills from "../pages/StudiesSkills";

const SkillsRoute: Component = () => {
  const { t } = useLanguage();

  return <StudiesSkills t={t} />;
};

export default SkillsRoute;
