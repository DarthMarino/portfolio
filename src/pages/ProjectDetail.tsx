import { For, Show, type Component } from "solid-js";
import { A, useParams } from "@solidjs/router";
import * as i18n from "@solid-primitives/i18n";
import { getProjectBySlug } from "../data/projects";
import { galleryCaptions } from "../data/galleryCaptions";
import { useLanguage } from "../providers/LanguageProvider";
import { useImageStore } from "../stores/useImageStore";
import PageShell from "../components/PageShell";
import ProjectsGrid from "../components/ProjectsGrid";
import ContactCTA from "../components/ContactCTA";

const ProjectDetail: Component<{
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
}> = (props) => {
  const params = useParams();
  const { locale } = useLanguage();
  const { previewImage } = useImageStore();
  const project = () => getProjectBySlug(params.slug);
  const caption = (index: number) =>
    galleryCaptions[params.slug]?.[locale()][index] ??
    `${props.t("project_image")} ${index + 1}`;
  return (
    <PageShell>
      <Show
        when={project()}
        fallback={
          <>
            <h1 class="text-4xl font-semibold">{props.t("not_found")}</h1>
            <A class="btn mt-6" href="/projects">
              {props.t("all_work")}
            </A>
          </>
        }
      >
        {(proj) => (
          <>
            <nav
              class="mb-8 flex flex-wrap gap-3 text-xs text-base-content/60"
              aria-label={props.t("nav_projects")}
            >
              <A class="link link-hover" href="/projects">
                {props.t("nav_projects")}
              </A>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{props.t(proj().titleKey)}</span>
            </nav>
            <header class="mb-8">
              <p class="mb-4 text-[10px] uppercase tracking-widest text-base-content/60">
                {proj().year} · {props.t(`category_${proj().category}`)}
              </p>
              <h1 class="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                {props.t(proj().titleKey)}
              </h1>
              <p class="mt-5 max-w-2xl text-lg leading-relaxed text-base-content/75">
                {props.t(proj().summaryKey ?? proj().descriptionKey)}
              </p>
            </header>
            <Show when={proj().images.length}>
              <button
                class="mb-8 block w-full overflow-hidden rounded-2xl border border-base-content/15 bg-base-300 p-5 sm:p-8"
                onClick={() =>
                  previewImage(
                    proj().images[proj().id === "sic-system" ? 1 : 0],
                    proj().images,
                  )
                }
                aria-label={props.t("open_image")}
              >
                <img
                  src={proj().images[proj().id === "sic-system" ? 1 : 0]}
                  alt={caption(proj().id === "sic-system" ? 1 : 0)}
                  class="mx-auto max-h-[430px] w-auto max-w-full rounded-lg object-contain"
                  fetchpriority="high"
                />
              </button>
            </Show>
            <dl class="mb-10 grid gap-6 border-y border-base-content/15 py-6 sm:grid-cols-3">
              <div>
                <dt class="mb-2 text-[10px] uppercase tracking-widest text-base-content/50">
                  {props.t("project_role")}
                </dt>
                <dd class="text-sm">
                  {props.t(proj().roleKey ?? "role_fullstack")}
                </dd>
                {proj().company && (
                  <dd class="mt-1 text-xs text-base-content/60">
                    {proj().company}
                  </dd>
                )}
              </div>
              <div>
                <dt class="mb-2 text-[10px] uppercase tracking-widest text-base-content/50">
                  {props.t("project_scope")}
                </dt>
                <dd class="text-sm">
                  {proj().durationKey
                    ? props.t(proj().durationKey!)
                    : proj().duration}
                </dd>
              </div>
              <div>
                <dt class="mb-2 text-[10px] uppercase tracking-widest text-base-content/50">
                  {props.t("project_stack")}
                </dt>
                <dd class="text-sm leading-relaxed text-base-content/80">
                  {proj().technologies.join(" · ")}
                </dd>
              </div>
            </dl>
            <Show when={proj().url}>
              <a
                class="btn mb-10"
                href={proj().url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.t("project_visit")} ↗
              </a>
            </Show>
            <div class="space-y-8">
              <For
                each={[
                  { heading: "project_overview", key: proj().descriptionKey },
                  { heading: "project_challenge", key: proj().problemKey },
                  { heading: "project_solution", key: proj().solutionKey },
                  { heading: "project_learnings", key: proj().challengesKey },
                  { heading: "project_results", key: proj().resultsKey },
                ].filter((section) => section.key)}
              >
                {(section) => (
                  <section class="grid gap-4 rounded-xl bg-base-200/95 p-6 md:grid-cols-[180px_1fr] md:gap-8 md:p-8">
                    <h2 class="text-lg font-medium tracking-tight">
                      {props.t(section.heading)}
                    </h2>
                    <p class="max-w-2xl text-sm leading-7 text-base-content/75">
                      {props.t(section.key!)}
                    </p>
                  </section>
                )}
              </For>
            </div>
            <Show when={proj().images.length}>
              <section class="mt-12">
                <h2 class="mb-6 text-2xl font-medium tracking-tight">
                  {props.t("project_gallery")}
                </h2>
                <div class="grid items-start gap-6 sm:grid-cols-2">
                  <For each={proj().images}>
                    {(image, index) => (
                      <figure>
                        <button
                          class="block w-full rounded-xl border border-base-content/15 bg-base-300 p-4 transition hover:border-base-content/40"
                          aria-label={`${props.t("open_image")}: ${caption(index())}`}
                          onClick={() => previewImage(image, proj().images)}
                        >
                          <img
                            src={image}
                            alt={caption(index())}
                            loading="lazy"
                            decoding="async"
                            class="mx-auto h-56 w-full rounded-md object-contain"
                          />
                        </button>
                        <figcaption class="mt-3 text-xs text-base-content/60">
                          <span class="mr-2 text-base-content/40">
                            {String(index() + 1).padStart(2, "0")}
                          </span>
                          {caption(index())}
                        </figcaption>
                      </figure>
                    )}
                  </For>
                </div>
              </section>
            </Show>
            <ProjectsGrid t={props.t} currentProjectId={proj().id} />
            <ContactCTA />
          </>
        )}
      </Show>
    </PageShell>
  );
};
export default ProjectDetail;
