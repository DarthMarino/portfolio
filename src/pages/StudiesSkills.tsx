import { For, type Component } from "solid-js";
import { A } from "@solidjs/router";
import * as i18n from "@solid-primitives/i18n";
import PageShell from "../components/PageShell";
import ContactCTA from "../components/ContactCTA";

const groups = [
  {
    key: "frontend",
    tools: [
      "React",
      "TypeScript",
      "JavaScript",
      "SolidJS",
      "Tailwind CSS",
      "HTML / CSS",
      "Three.js",
    ],
    project: "curbo",
    name: "curbo_project",
  },
  {
    key: "backend",
    tools: [
      "Node.js",
      "Go",
      "Rust",
      "C#",
      "Express",
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
      "SQL Server",
      "MongoDB",
      "Redis",
    ],
    project: "find-machines",
    name: "find_machines",
  },
  {
    key: "mobile",
    tools: ["React Native", "Flutter", "Ionic"],
    project: "pventa-mobile",
    name: "pventa_mobile",
  },
  {
    key: "design",
    tools: ["Figma", "Affinity", "Google Apps Script", "PDF Generation"],
    project: "tinacos-cibao",
    name: "tinacos_cibao",
  },
];
const StudiesSkills: Component<{
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
}> = (props) => (
  <PageShell title={props.t("nav_skills")} intro={props.t("skills_intro")}>
    <div class="grid gap-5 sm:grid-cols-2">
      <For each={groups}>
        {(group) => (
          <section class="card card-border bg-base-200">
            <div class="card-body gap-4 p-6">
              <h2 class="card-title text-xl font-medium">
                {props.t(`skills_${group.key}`)}
              </h2>
              <p class="text-sm text-base-content/65">
                {props.t(`skills_${group.key}_desc`)}
              </p>
              <ul class="flex flex-wrap gap-2">
                <For each={group.tools}>
                  {(tool) => (
                    <li class="badge badge-outline border-base-content/20 text-xs text-base-content/80">
                      {tool}
                    </li>
                  )}
                </For>
              </ul>
              <div class="mt-3 border-t border-base-content/10 pt-4">
                <p class="mb-2 text-[10px] uppercase tracking-widest text-base-content/45">
                  {props.t("skills_evidence")}
                </p>
                <A
                  class="link link-hover text-sm"
                  href={`/project/${group.project}`}
                >
                  {props.t(group.name)} ↗
                </A>
              </div>
            </div>
          </section>
        )}
      </For>
    </div>
    <section class="mt-8 rounded-xl border border-base-content/15 p-6">
      <h2 class="mb-4 text-base font-medium">
        {props.t("cloud_devops_skills")} & {props.t("testing_skills")}
      </h2>
      <p class="text-sm leading-7 text-base-content/65">
        AWS · Docker · Git · GitHub Actions · CI/CD · Jest · Playwright ·
        Cypress
      </p>
    </section>
    <section class="mt-14">
      <h2 class="mb-6 text-2xl font-medium">{props.t("education")}</h2>
      <div class="space-y-6">
        <For
          each={[
            {
              dates: "2017 – 2021",
              degree: "software_eng",
              school: "intec",
              url: "https://www.intec.edu.do/en/",
            },
            {
              dates: "2014 – 2017",
              degree: "digital_electronics",
              school: "loyola",
              url: "https://ipl.edu.do/",
            },
          ]}
        >
          {(study) => (
            <div class="grid gap-3 border-t border-base-content/15 pt-6 sm:grid-cols-[150px_1fr]">
              <p class="text-xs text-base-content/55">{study.dates}</p>
              <div>
                <h3 class="text-base font-medium">{props.t(study.degree)}</h3>
                <a
                  class="link link-hover mt-2 inline-block text-sm text-base-content/60"
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.t(study.school)} ↗
                </a>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
    <section class="mt-14">
      <h2 class="mb-6 text-2xl font-medium">{props.t("certificates")}</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <For
          each={[
            {
              title: "Three.js Journey",
              date: "2023",
              tools: "Three.js · React · Blender",
              url: "https://threejs-journey.com/certificate/view/1913",
            },
            {
              title: "DesignCourse — UI/UX",
              date: "2022",
              tools: "Figma · HTML / CSS",
              url: "https://designcourse.com/certificate/63968757b7b36500195474bc",
            },
          ]}
        >
          {(cert) => (
            <div class="card card-border bg-base-200">
              <div class="card-body p-6">
                <p class="text-xs text-base-content/50">{cert.date}</p>
                <h3 class="card-title text-base font-medium">{cert.title}</h3>
                <p class="text-xs text-base-content/65">{cert.tools}</p>
                <a
                  class="link link-hover mt-4 text-sm"
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.t("show_certificate")} ↗
                </a>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
    <ContactCTA />
  </PageShell>
);
export default StudiesSkills;
