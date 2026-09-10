import { For, type Component } from "solid-js";
import { A } from "@solidjs/router";
import * as i18n from "@solid-primitives/i18n";
import PageShell from "../components/PageShell";
import ContactCTA from "../components/ContactCTA";
import { projects } from "../data/projects";

const Experience: Component<{
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
}> = (props) => {
  const work = [
    {
      company: "Xoultec",
      date: () => props.t("duration_current"),
      role: "role_fullstack",
      ids: ["pventa-mobile", "sic-system"],
    },
    {
      company: "TheQRKing",
      date: () => "2024",
      role: "role_fullstack",
      ids: ["theqrking"],
    },
    {
      company: "Curbo Technologies",
      date: () => "2021 – 2023",
      role: "role_frontend",
      ids: ["curbo"],
    },
  ];
  return (
    <PageShell
      title={props.t("nav_experience")}
      intro={props.t("experience_intro")}
    >
      <div class="space-y-10">
        <For each={work}>
          {(item) => (
            <section class="grid gap-4 border-t border-base-content/15 pt-7 sm:grid-cols-[150px_1fr]">
              <p class="text-xs tabular-nums text-base-content/55">
                {item.date()}
              </p>
              <div>
                <h2 class="text-2xl font-medium">{item.company}</h2>
                <p class="mt-1 text-sm text-base-content/60">
                  {props.t(item.role)}
                </p>
                <div class="mt-5 space-y-5">
                  <For
                    each={item.ids.map(
                      (id) => projects.find((p) => p.id === id)!,
                    )}
                  >
                    {(project) => (
                      <div>
                        <p class="max-w-2xl text-sm leading-relaxed text-base-content/75">
                          {props.t(project.summaryKey!)}
                        </p>
                        <A
                          class="link link-hover mt-2 inline-block text-xs"
                          href={`/project/${project.slug}`}
                        >
                          {props.t(project.titleKey)} ↗
                        </A>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </section>
          )}
        </For>
      </div>
      <section class="mt-14">
        <h2 class="mb-6 text-2xl font-medium">
          {props.t("experience_recent")}
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <For
            each={projects.filter(
              (p) => p.year >= 2025 || p.id === "caribbean-coworking",
            )}
          >
            {(project) => (
              <A
                href={`/project/${project.slug}`}
                class="card card-border bg-base-200 transition hover:border-base-content/35"
              >
                <div class="card-body p-6">
                  <span class="text-xs text-base-content/50">
                    {project.year} · {props.t(`category_${project.category}`)}
                  </span>
                  <h3 class="card-title text-base font-medium">
                    {props.t(project.titleKey)} ↗
                  </h3>
                  <p class="text-sm leading-relaxed text-base-content/65">
                    {props.t(project.summaryKey!)}
                  </p>
                </div>
              </A>
            )}
          </For>
        </div>
      </section>
      <ContactCTA />
    </PageShell>
  );
};
export default Experience;
