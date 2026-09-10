import { A } from "@solidjs/router";
import { useLanguage } from "../providers/LanguageProvider";

export default function ContactCTA() {
  const { t } = useLanguage();
  return (
    <section class="mt-16 flex flex-col items-start justify-between gap-6 border-t border-base-content/15 pt-10 sm:flex-row sm:items-center">
      <div class="max-w-lg">
        <h2 class="text-2xl font-medium tracking-tight">{t("cta_title")}</h2>
        <p class="mt-3 text-sm leading-relaxed text-base-content/65">
          {t("cta_description")}
        </p>
      </div>
      <A href="/contact" class="btn shrink-0">
        {t("cta_link")} <span aria-hidden="true">↗</span>
      </A>
    </section>
  );
}
