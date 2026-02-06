import { type Component, Show, For } from "solid-js";
import { useParams, A } from "@solidjs/router";
import * as i18n from "@solid-primitives/i18n";
import { getProjectBySlug, type Project } from "../data/projects";
import BackgroundScene from "../components/BackgroundScene";
import Breadcrumb, { type BreadcrumbItem } from "../components/Breadcrumb";
import ProjectsGrid from "../components/ProjectsGrid";
import "./ProjectDetail.css";

type ProjectDetailProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
};

const ProjectDetail: Component<ProjectDetailProps> = (props) => {
  const params = useParams();
  const project = () => getProjectBySlug(params.slug);

  const breadcrumbItems = (): BreadcrumbItem[] => {
    const proj = project();
    if (!proj) return [];

    const projectTitle = typeof props.t(proj.titleKey) === "function"
      ? props.t(proj.titleKey)()
      : props.t(proj.titleKey);

    return [
      { label: props.t("home"), href: "/" },
      { label: "Projects", href: "/projects" },
      { label: projectTitle }
    ];
  };

  return (
    <div class="project-detail-container">
      <BackgroundScene />

      <Show when={project()} fallback={
        <div class="project-not-found">
          <h1>Project Not Found</h1>
          <A href="/" class="back-button">← Back to Home</A>
        </div>
      }>
        {(proj) => (
          <div class="project-content">
            {/* Breadcrumb Navigation */}
            <Breadcrumb items={breadcrumbItems()} />

            {/* Hero Section */}
            <div class="project-hero">
              <div class="project-header">
                <div class="project-meta-badges">
                  <span class="project-year">{proj().year}</span>
                  <span class="project-category-badge">{proj().category}</span>
                </div>
                <h1 class="project-title">
                  {typeof props.t(proj().titleKey) === "function"
                    ? props.t(proj().titleKey)()
                    : props.t(proj().titleKey)}
                </h1>
                <p class="project-subtitle">
                  {proj().role} • {proj().duration}
                  <Show when={proj().company}>
                    <span class="project-company"> @{proj().company}</span>
                  </Show>
                </p>
              </div>

              <Show when={proj().url}>
                <a
                  href={proj().url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link-button"
                >
                  Visit Project →
                </a>
              </Show>
            </div>

            {/* Technologies */}
            <div class="project-section">
              <h2 class="project-section-title">Technologies</h2>
              <div class="tech-stack">
                <For each={proj().technologies}>
                  {(tech) => <span class="tech-tag">{tech}</span>}
                </For>
              </div>
            </div>

            {/* Problem Statement */}
            <Show when={proj().problemKey}>
              <div class="project-section">
                <h2 class="project-section-title">The Challenge</h2>
                <p class="section-content">
                  {typeof props.t(proj().problemKey!) === "function"
                    ? props.t(proj().problemKey!)()
                    : props.t(proj().problemKey!)}
                </p>
              </div>
            </Show>

            {/* Solution */}
            <Show when={proj().solutionKey}>
              <div class="project-section">
                <h2 class="project-section-title">The Solution</h2>
                <p class="section-content">
                  {typeof props.t(proj().solutionKey!) === "function"
                    ? props.t(proj().solutionKey!)()
                    : props.t(proj().solutionKey!)}
                </p>
              </div>
            </Show>

            {/* Challenges */}
            <Show when={proj().challengesKey}>
              <div class="project-section">
                <h2 class="project-section-title">Challenges & Learnings</h2>
                <p class="section-content">
                  {typeof props.t(proj().challengesKey!) === "function"
                    ? props.t(proj().challengesKey!)()
                    : props.t(proj().challengesKey!)}
                </p>
              </div>
            </Show>

            {/* Results */}
            <Show when={proj().resultsKey}>
              <div class="project-section">
                <h2 class="project-section-title">Results & Impact</h2>
                <p class="section-content">
                  {typeof props.t(proj().resultsKey!) === "function"
                    ? props.t(proj().resultsKey!)()
                    : props.t(proj().resultsKey!)}
                </p>
              </div>
            </Show>

            {/* Images Gallery */}
            <Show when={proj().images && proj().images.length > 0}>
              <div class="project-section">
                <h2 class="project-section-title">Gallery</h2>
                <div class="project-gallery">
                  <For each={proj().images}>
                    {(image) => (
                      <img
                        src={image}
                        alt={`${props.t(proj().titleKey)} screenshot`}
                        class="gallery-image"
                      />
                    )}
                  </For>
                </div>
              </div>
            </Show>

            {/* Other Projects Grid */}
            <ProjectsGrid t={props.t} currentProjectId={proj().id} />

            {/* Footer Navigation */}
            <div class="project-footer">
              <A href="/" class="back-button">
                ← Back to Portfolio
              </A>
            </div>
          </div>
        )}
      </Show>
    </div>
  );
};

export default ProjectDetail;
