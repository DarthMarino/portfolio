import { createEffect } from "solid-js";
import { useLocation } from "@solidjs/router";
import { useLanguage } from "../providers/LanguageProvider";
import { getProjectBySlug } from "../data/projects";

const pages: Record<string, [string, string]> = {
  "/": ["portfolio_label", "hero_description"],
  "/about": ["nav_about", "about_intro"],
  "/projects": ["nav_projects", "projects_intro"],
  "/experience": ["nav_experience", "experience_intro"],
  "/skills": ["nav_skills", "skills_intro"],
  "/contact": ["contact_nav", "contact_intro"],
};
export default function RouteMetadata() {
  const location = useLocation();
  const { t, dict } = useLanguage();
  createEffect(() => {
    if (!dict()) return;
    const project = location.pathname.startsWith("/project/")
      ? getProjectBySlug(location.pathname.split("/")[2])
      : undefined;
    const [titleKey, descriptionKey] =
      pages[location.pathname] ??
      (location.pathname.startsWith("/cv")
        ? ["view_cv", "cv_intro"]
        : ["not_found", "not_found_description"]);
    const title = `${t(project?.titleKey ?? titleKey)} — Marino Gomez`;
    const description = t(project?.summaryKey ?? descriptionKey);
    document.title = title;
    const meta = (
      selector: string,
      attribute: string,
      key: string,
      content: string,
    ) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.content = content;
    };
    meta('meta[name="description"]', "name", "description", description);
    meta('meta[property="og:title"]', "property", "og:title", title);
    meta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description,
    );
    meta('meta[property="og:type"]', "property", "og:type", "website");
  });
  return null;
}
