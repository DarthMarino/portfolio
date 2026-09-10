import { useLanguage } from "../providers/LanguageProvider";
import PageShell from "../components/PageShell";
import ContactSection from "../components/ContactSection";
export default function ContactRoute() {
  const { t } = useLanguage();
  return (
    <PageShell title={t("contact_nav")} intro={t("contact_intro")}>
      <ContactSection />
    </PageShell>
  );
}
