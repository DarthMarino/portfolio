import { Show, For } from "solid-js";
import { A } from "@solidjs/router";
import type { Project } from "../data/projects";
import { useLanguage } from "../providers/LanguageProvider";

export default function ProjectCard(props: {
  project: Project;
  compact?: boolean;
}) {
  const { t } = useLanguage();
  const project = () => props.project;
  return (
    <A
      href={`/project/${project().slug}`}
      class="card card-border group h-full overflow-hidden bg-base-200 transition duration-200 hover:-translate-y-1 hover:border-base-content/35"
    >
      <Show when={project().cover}>
        <figure class="aspect-[16/10] overflow-hidden border-b border-base-content/10 bg-base-300 p-4 sm:p-5">
          <img
            src={project().cover}
            alt=""
            loading="lazy"
            decoding="async"
            width="720"
            height="450"
            class={`h-full w-full rounded-md object-contain transition duration-500 group-hover:scale-[1.03] ${project().id === "pventa-mobile" ? "" : "shadow-lg"}`}
          />
        </figure>
      </Show>
      <div class="card-body gap-3 p-5 sm:p-6">
        <div class="flex items-center justify-between gap-3 text-[10px] uppercase tracking-widest text-base-content/55">
          <span>{t(`category_${project().category}`)}</span>
          <span>{project().year}</span>
        </div>
        <h3 class="card-title text-lg font-medium tracking-tight">
          {t(project().titleKey)}
        </h3>
        <p class="text-sm leading-relaxed text-base-content/70">
          {t(project().summaryKey ?? project().descriptionKey)}
        </p>
        <Show when={!props.compact}>
          <p class="text-xs text-base-content/55">
            {t(project().roleKey ?? "role_fullstack")}
          </p>
          <div class="mt-2 flex flex-wrap gap-2">
            <For each={project().technologies.slice(0, 3)}>
              {(tech) => (
                <span class="badge badge-outline border-base-content/20 text-[10px] text-base-content/70">
                  {tech}
                </span>
              )}
            </For>
          </div>
        </Show>
        <span class="mt-3 flex items-center justify-between border-t border-base-content/10 pt-4 text-xs font-medium">
          {t("view_project")}
          <span
            class="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            ↗
          </span>
        </span>
      </div>
    </A>
  );
}
