import { For, type Component } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const ProjectsGrid: Component<{
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
  currentProjectId?: string;
}> = (props) => {
  const related = () => {
    const current = projects.find((p) => p.id === props.currentProjectId);
    return projects
      .filter((p) => p.id !== props.currentProjectId)
      .sort(
        (a, b) =>
          Number(b.category === current?.category) -
            Number(a.category === current?.category) ||
          Number(!!b.cover) - Number(!!a.cover),
      )
      .slice(0, 2);
  };
  return (
    <section class="mt-16">
      <h2 class="mb-6 text-2xl font-medium tracking-tight">
        {props.t("project_more")}
      </h2>
      <div class="grid gap-6 sm:grid-cols-2">
        <For each={related()}>
          {(project) => <ProjectCard project={project} compact />}
        </For>
      </div>
    </section>
  );
};
export default ProjectsGrid;
