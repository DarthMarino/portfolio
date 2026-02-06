import { Component } from "solid-js";
import { useLanguage } from "../providers/LanguageProvider";
import ProjectsList from "../pages/ProjectsList";

const ProjectsRoute: Component = () => {
  const { t } = useLanguage();

  return <ProjectsList t={t} />;
};

export default ProjectsRoute;
