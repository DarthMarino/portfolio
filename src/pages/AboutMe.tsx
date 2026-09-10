import { For, type Component } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { A } from "@solidjs/router";
import ProfileImage from "../components/ProfileImage";
import PageShell from "../components/PageShell";
import ContactCTA from "../components/ContactCTA";

const AboutMe: Component<{
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
}> = (props) => (
  <PageShell title={props.t("nav_about")}>
    <section class="grid items-start gap-10 md:grid-cols-[1fr_200px]">
      <div>
        <p class="text-xl leading-relaxed">{props.t("about_intro")}</p>
        <p class="mt-6 text-base leading-7 text-base-content/70">
          {props.t("about_body")}
        </p>
      </div>
      <div class="row-start-1 w-32 md:col-start-2 md:row-start-auto md:w-full">
        <ProfileImage />
      </div>
    </section>
    <section class="mt-12 border-t border-base-content/15 pt-8">
      <h2 class="text-2xl font-medium">{props.t("about_approach")}</h2>
      <p class="mt-4 max-w-2xl text-sm leading-7 text-base-content/70">
        {props.t("about_approach_body")}
      </p>
      <A href="/projects" class="link link-hover mt-5 inline-block text-sm">
        {props.t("view_work")} ↗
      </A>
    </section>
    <section class="mt-12">
      <h2 class="mb-5 text-2xl font-medium">{props.t("languages")}</h2>
      <div class="grid gap-4 sm:grid-cols-3">
        <For each={[2, 1, 3]}>
          {(i) => (
            <div class="card card-border bg-base-200">
              <div class="card-body p-5">
                <h3 class="font-medium">{props.t(`lang_${i}`)}</h3>
                <p class="text-xs text-base-content/60">
                  {props.t(`lang_${i}_level`)}
                </p>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
    <div id="contact">
      <ContactCTA />
    </div>
  </PageShell>
);
export default AboutMe;
