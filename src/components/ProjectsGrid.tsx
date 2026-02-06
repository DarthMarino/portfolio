import { type Component, For } from "solid-js";
import { A } from "@solidjs/router";
import * as i18n from "@solid-primitives/i18n";
import { projects, type Project } from "../data/projects";
import "./ProjectsGrid.css";

type ProjectsGridProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
  currentProjectId?: string;
};

const ProjectsGrid: Component<ProjectsGridProps> = (props) => {
  const otherProjects = () =>
    props.currentProjectId
      ? projects.filter(p => p.id !== props.currentProjectId)
      : projects;

  return (
    <div class="projects-grid-container">
      <h2 class="projects-grid-title">
        {props.currentProjectId ? "Other Projects" : "All Projects"}
      </h2>
      <div class="related-projects-grid">
        <For each={otherProjects()}>
          {(project) => (
            <A href={`/project/${project.slug}`} class="related-project-card">
              <div class="related-project-card-header">
                <span class="related-project-card-year">{project.year}</span>
                <h3 class="related-project-card-title">
                  {typeof props.t(project.titleKey) === "function"
                    ? props.t(project.titleKey)()
                    : props.t(project.titleKey)}
                </h3>
              </div>
              <p class="related-project-card-description">
                {typeof props.t(project.descriptionKey) === "function"
                  ? props.t(project.descriptionKey)()
                  : props.t(project.descriptionKey)}
              </p>
              <div class="related-project-card-tech">
                <For each={project.technologies.slice(0, 3)}>
                  {(tech) => <span class="related-project-card-tag">{tech}</span>}
                </For>
                {project.technologies.length > 3 && (
                  <span class="related-project-card-tag">+{project.technologies.length - 3}</span>
                )}
              </div>
              <div class="related-project-card-footer">
                <span class="related-project-card-link">View Project →</span>
              </div>
            </A>
          )}
        </For>
      </div>
    </div>
  );
};

export default ProjectsGrid;
