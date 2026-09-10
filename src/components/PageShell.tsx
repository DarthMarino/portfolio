import { type JSX } from "solid-js";
import { A } from "@solidjs/router";
import { useLanguage } from "../providers/LanguageProvider";

export default function PageShell(props: {
  title?: string;
  intro?: string;
  children: JSX.Element;
}) {
  const { t } = useLanguage();
  return (
    <div class="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      {props.title && (
        <header class="mb-10 max-w-3xl">
          <A
            href="/"
            class="link link-hover mb-5 inline-block text-xs tracking-widest text-base-content/60"
          >
            {t("portfolio_label")}
          </A>
          <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">
            {props.title}
          </h1>
          {props.intro && (
            <p class="mt-5 max-w-2xl text-base leading-relaxed text-base-content/70 sm:text-lg">
              {props.intro}
            </p>
          )}
        </header>
      )}
      {props.children}
    </div>
  );
}
