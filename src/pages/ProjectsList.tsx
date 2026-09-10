import { createSignal, For, type Component } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { projects, type ProjectCategory } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import PageShell from "../components/PageShell";
import ContactCTA from "../components/ContactCTA";

const ProjectsList: Component<{
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
}> = (props) => {
  const [filter, setFilter] = createSignal<ProjectCategory | "all">("all");
  const categories = [
    "all",
    ...new Set(projects.map((p) => p.category)),
  ] as const;
  return (
    <PageShell
      title={props.t("nav_projects")}
      intro={props.t("projects_intro")}
    >
      <div
        class="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label={props.t("nav_projects")}
      >
        <For each={categories}>
          {(category) => (
            <button
              class={`btn btn-sm ${filter() === category ? "" : "btn-ghost"}`}
              aria-pressed={filter() === category}
              onClick={() => setFilter(category)}
            >
              {props.t(`category_${category}`)}
              <span class="opacity-45">
                {category === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === category).length}
              </span>
            </button>
          )}
        </For>
      </div>
      <div class="grid gap-6 sm:grid-cols-2" aria-live="polite">
        <For
          each={projects.filter(
            (p) => filter() === "all" || p.category === filter(),
          )}
        >
          {(project) => <ProjectCard project={project} />}
        </For>
      </div>
      <ContactCTA />
    </PageShell>
  );
};
export default ProjectsList;
