import { type Component, createSignal, Show, For } from "solid-js";
import { A } from "@solidjs/router";
import * as i18n from "@solid-primitives/i18n";
import BackgroundScene from "../components/BackgroundScene";
import Breadcrumb, { type BreadcrumbItem } from "../components/Breadcrumb";
import { projects, type ProjectCategory, type Project } from "../data/projects";
import "./ProjectsList.css";

type ProjectsListProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
};

const ProjectsList: Component<ProjectsListProps> = (props) => {
  const [selectedCategory, setSelectedCategory] = createSignal<ProjectCategory | "all">("all");

  const breadcrumbItems = (): BreadcrumbItem[] => [
    { label: props.t("home"), href: "/" },
    { label: "Projects" }
  ];

  const filteredProjects = () => {
    const category = selectedCategory();
    if (category === "all") return projects;
    return projects.filter(p => p.category === category);
  };

  const categoryLabels: Record<ProjectCategory | "all", string> = {
    all: "All Projects",
    employment: "Employment",
    contract: "Contract Work",
    business: "Business",
    personal: "Personal"
  };

  const categoryCounts = () => {
    return {
      all: projects.length,
      employment: projects.filter(p => p.category === "employment").length,
      contract: projects.filter(p => p.category === "contract").length,
      business: projects.filter(p => p.category === "business").length,
      personal: projects.filter(p => p.category === "personal").length,
    };
  };

  return (
    <div class="page-container">
      <BackgroundScene />

      <div class="page-content">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems()} />

        {/* Header */}
        <div class="page-header">
          <h1 class="page-title">Projects</h1>
          <p class="page-subtitle">
            A collection of my work across web development, mobile applications, and full-stack projects.
          </p>

          {/* Category Filters */}
          <div class="category-filters">
            <For each={Object.entries(categoryLabels) as [ProjectCategory | "all", string][]}>
              {([category, label]) => {
                const count = categoryCounts()[category];
                return (
                  <Show when={count > 0}>
                    <button
                      class={`category-filter ${selectedCategory() === category ? "active" : ""}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {label} <span class="filter-count">({count})</span>
                    </button>
                  </Show>
                );
              }}
            </For>
          </div>
        </div>

        {/* Projects Grid */}
        <div class="projects-grid">
          <For each={filteredProjects()}>
            {(project) => (
              <A href={`/project/${project.slug}`} class="project-card">
                <div class="project-card-header">
                  <div class="project-card-meta">
                    <span class="project-card-year">{project.year}</span>
                    <span class="project-card-category">{categoryLabels[project.category]}</span>
                  </div>
                  <h3 class="project-card-title">
                    {typeof props.t(project.titleKey) === "function"
                      ? props.t(project.titleKey)()
                      : props.t(project.titleKey)}
                  </h3>
                  <Show when={project.company}>
                    <p class="project-card-company">{project.company}</p>
                  </Show>
                </div>
                <p class="project-card-description">
                  {typeof props.t(project.descriptionKey) === "function"
                    ? props.t(project.descriptionKey)()
                    : props.t(project.descriptionKey)}
                </p>
                <div class="project-card-tech">
                  <For each={project.technologies.slice(0, 3)}>
                    {(tech) => <span class="project-card-tag">{tech}</span>}
                  </For>
                  {project.technologies.length > 3 && (
                    <span class="project-card-tag">+{project.technologies.length - 3}</span>
                  )}
                </div>
                <div class="project-card-footer">
                  <span class="project-card-link">View Project →</span>
                </div>
              </A>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
