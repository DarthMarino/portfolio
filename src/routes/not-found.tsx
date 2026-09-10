import { A } from "@solidjs/router";
import { useLanguage } from "../providers/LanguageProvider";
import PageShell from "../components/PageShell";
export default function NotFound() {
  const { t } = useLanguage();
  return (
    <PageShell title={t("not_found")} intro={t("not_found_description")}>
      <A class="btn" href="/">
        {t("back_home")} →
      </A>
    </PageShell>
  );
}
