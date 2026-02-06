import { type Component, createSignal } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { useLanguage } from "../providers/LanguageProvider";
import "./Sidebar.css";

const Sidebar: Component = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = createSignal(false);

  const isProjectPage = () => location.pathname.startsWith("/project/");

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      // If not on homepage, navigate to homepage with hash
      window.location.href = `/#${sectionId}`;
    } else {
      // If on homepage, smooth scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const scrollToContact = () => {
    if (location.pathname !== "/about") {
      // If not on about page, navigate to about page with hash
      window.location.href = `/about#contact`;
    } else {
      // If on about page, smooth scroll to contact section
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <button
        class="sidebar-hamburger"
        onClick={() => setIsOpen(!isOpen())}
        aria-label="Toggle menu"
      >
        <div class={`hamburger-line ${isOpen() ? "open" : ""}`}></div>
        <div class={`hamburger-line ${isOpen() ? "open" : ""}`}></div>
        <div class={`hamburger-line ${isOpen() ? "open" : ""}`}></div>
      </button>

      {/* Sidebar */}
      <aside class={`sidebar ${isOpen() ? "sidebar-open" : ""}`}>
        <nav class="sidebar-nav">
          <div class="sidebar-header">
            <A href="/" class="sidebar-logo" onClick={() => setIsOpen(false)}>
              <span class="logo-text">Marino Gomez</span>
            </A>
          </div>

          <ul class="sidebar-menu">
            <li>
              <A
                href="/about"
                class={`sidebar-link ${location.pathname === "/about" ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <span class="link-icon">👤</span>
                <span class="link-text">About Me</span>
              </A>
            </li>

            <li>
              <A
                href="/projects"
                class={`sidebar-link ${location.pathname === "/projects" || location.pathname.startsWith("/project/") ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <span class="link-icon">💼</span>
                <span class="link-text">Projects</span>
              </A>
            </li>

            <li>
              <A
                href="/experience"
                class={`sidebar-link ${location.pathname === "/experience" ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <span class="link-icon">🚀</span>
                <span class="link-text">Experience</span>
              </A>
            </li>

            <li>
              <A
                href="/skills"
                class={`sidebar-link ${location.pathname === "/skills" ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <span class="link-icon">⚡</span>
                <span class="link-text">Studies & Skills</span>
              </A>
            </li>

            <li>
              <button
                class={`sidebar-link ${location.pathname === "/about" && location.hash === "#contact" ? "active" : ""}`}
                onClick={scrollToContact}
              >
                <span class="link-icon">📧</span>
                <span class="link-text">Contact</span>
              </button>
            </li>

            <li class="sidebar-divider"></li>

            <li>
              <A
                href="/cv"
                class={`sidebar-link ${location.pathname === "/cv" ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <span class="link-icon">📄</span>
                <span class="link-text">{t("cv")}</span>
              </A>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen() && (
        <div
          class="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
