import { useLanguage } from "../providers/LanguageProvider";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  const { t } = useLanguage();
  return (
    <section
      id="contact"
      class="grid items-start gap-10 lg:grid-cols-[1fr_2fr]"
    >
      <div>
        <h2 class="mb-3 text-base font-medium">{t("contact_direct")}</h2>
        <a class="link text-sm" href="mailto:marinogomez24@gmail.com">
          marinogomez24@gmail.com
        </a>
        <h2 class="mt-8 mb-3 text-base font-medium">{t("contact_social")}</h2>
        <div class="flex flex-wrap gap-5 text-sm text-base-content/65">
          <a
            class="link link-hover"
            href="https://github.com/DarthMarino"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a
            class="link link-hover"
            href="https://www.linkedin.com/in/maghiworks/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
      <div class="card card-border bg-base-200">
        <div class="card-body p-6 sm:p-8">
          <h2 class="mb-4 text-xl font-medium">{t("get_in_touch")}</h2>
          <ContactForm t={t} />
        </div>
      </div>
    </section>
  );
}
