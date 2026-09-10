import { For, type Component } from "solid-js";
import { A } from "@solidjs/router";
import * as i18n from "@solid-primitives/i18n";
import ProfileImage from "../components/ProfileImage";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import PageShell from "../components/PageShell";
import ContactCTA from "../components/ContactCTA";

const featured = ["theqrking", "pventa-mobile", "curbo"].map(
  (id) => projects.find((p) => p.id === id)!,
);
const Home: Component<{
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
}> = (props) => (
  <PageShell>
    <section class="relative grid items-center gap-8 py-5 sm:py-7 md:grid-cols-[1fr_180px] xl:grid-cols-[1fr_220px]">
      <div>
        <p class="mb-4 pr-20 text-[10px] md:pr-0 font-medium uppercase tracking-[0.2em] text-base-content/60">
          {props.t("hero_eyebrow")}
        </p>
        <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl xl:text-6xl">
          Marino Gomez<span class="text-primary">.</span>
        </h1>
        <h2 class="mt-5 max-w-xl text-xl font-normal leading-snug text-base-content/90 sm:text-2xl">
          {props.t("hero_intro")}
        </h2>
        <p class="mt-4 max-w-xl text-sm leading-relaxed text-base-content/65">
          {props.t("hero_description")}
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <A href="/projects" class="btn btn-primary">
            {props.t("view_work")} <span aria-hidden="true">↗</span>
          </A>
          <A href="/contact" class="btn btn-ghost">
            {props.t("cta_link")} <span aria-hidden="true">→</span>
          </A>
        </div>
      </div>
      <div class="absolute top-3 right-0 w-14 md:relative md:top-auto md:right-auto md:col-start-2 md:row-start-auto md:w-full">
        <ProfileImage />
      </div>
    </section>
    <section class="mt-10 border-t border-base-content/15 pt-8">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="mb-2 text-[10px] uppercase tracking-widest text-base-content/50">
            01 / {props.t("selected_work")}
          </p>
          <h2 class="text-2xl font-medium tracking-tight">
            {props.t("selected_intro")}
          </h2>
        </div>
        <A
          href="/projects"
          class="link link-hover text-xs text-base-content/70"
        >
          {props.t("all_work")} ↗
        </A>
      </div>
      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <For each={featured}>
          {(project) => <ProjectCard project={project} compact />}
        </For>
      </div>
    </section>
    <section class="mt-14 grid gap-6 border-t border-base-content/15 pt-8 md:grid-cols-2">
      <div>
        <p class="mb-3 text-[10px] uppercase tracking-widest text-base-content/50">
          02 / {props.t("nav_experience")}
        </p>
        <h2 class="max-w-sm text-2xl font-medium leading-snug tracking-tight">
          {props.t("home_experience")}
        </h2>
      </div>
      <div>
        <p class="text-sm leading-relaxed text-base-content/70">
          {props.t("home_experience_desc")}
        </p>
        <A href="/experience" class="link link-hover mt-5 inline-block text-sm">
          {props.t("nav_experience")} →
        </A>
      </div>
    </section>
    <ContactCTA />
  </PageShell>
);
export default Home;
