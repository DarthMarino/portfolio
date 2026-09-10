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
    <section class="grid items-center gap-8 py-5 sm:py-7 lg:grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-12">
      <div class="min-w-0">
        <p class="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-base-content/60">
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
      <div class="row-start-1 mx-auto w-full max-w-60 sm:max-w-72 lg:col-start-2 lg:row-start-1 lg:max-w-none">
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
