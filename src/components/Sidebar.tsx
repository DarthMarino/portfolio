import { createSignal, createEffect, For, onMount, onCleanup } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { useLanguage } from "../providers/LanguageProvider";
import "./Sidebar.css";

const links = [
  { href: "/", key: "home" },
  { href: "/projects", key: "nav_projects" },
  { href: "/experience", key: "nav_experience" },
  { href: "/about", key: "nav_about" },
  { href: "/skills", key: "nav_skills" },
  { href: "/contact", key: "contact_nav" },
];

export default function Sidebar(props: {
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = createSignal(false);
  createEffect(() => props.onOpenChange(open()));
  onCleanup(() => props.onOpenChange(false));
  let menuButton: HTMLButtonElement | undefined;
  let sidebar: HTMLElement | undefined;
  const active = (href: string) =>
    href === "/projects"
      ? /^\/projects?$|^\/project\//.test(location.pathname)
      : location.pathname === href;
  createEffect(() => {
    location.pathname;
    setOpen(false);
  });
  onMount(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (!open()) return;
      if (event.key === "Escape") {
        setOpen(false);
        menuButton?.focus();
      }
      if (event.key === "Tab") {
        const items = [
          menuButton,
          ...Array.from(
            sidebar?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0],
          last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const desktop = window.matchMedia("(min-width: 1025px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", keyboard);
    onCleanup(() => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", keyboard);
    });
  });
  return (
    <>
      <button
        ref={menuButton}
        class="btn btn-square fixed top-3 left-4 z-[110] min-[1025px]:hidden"
        onClick={() => setOpen(!open())}
        aria-expanded={open()}
        aria-controls="portfolio-sidebar"
        aria-label={t(open() ? "nav_close" : "nav_open")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path
            d={open() ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
          />
        </svg>
      </button>
      {open() && (
        <div
          class="fixed inset-0 z-[90] bg-base-100/80 backdrop-blur-sm min-[1025px]:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        ref={sidebar}
        id="portfolio-sidebar"
        class="portfolio-sidebar"
        data-open={open()}
      >
        <A href="/" class="mb-12 block" aria-label="Marino Gomez — home">
          <span class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-base-content/25 text-sm font-semibold">
            mg<span class="text-primary">.</span>
          </span>
          <span class="block text-lg font-semibold tracking-tight">
            Marino Gomez
          </span>
          <span class="mt-1 block text-xs text-base-content/55">
            {t("title")}
          </span>
        </A>
        <nav aria-label={t("nav_label")}>
          <ul class="menu w-full gap-1 p-0">
            <For each={links}>
              {(item, index) => (
                <li>
                  <A
                    href={item.href}
                    onClick={() => setOpen(false)}
                    end={item.href === "/"}
                    class={active(item.href) ? "menu-active" : ""}
                    aria-current={active(item.href) ? "page" : undefined}
                  >
                    <span class="mr-2 text-[10px] tabular-nums opacity-40">
                      0{index() + 1}
                    </span>
                    {t(item.key)}
                  </A>
                </li>
              )}
            </For>
          </ul>
        </nav>
        <div class="mt-auto pt-12">
          <A
            href="/cv"
            onClick={() => setOpen(false)}
            class="btn w-full justify-between"
          >
            {t("view_cv")} <span aria-hidden="true">↗</span>
          </A>
          <div class="mt-6 flex gap-4 text-xs text-base-content/65">
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
          <p class="mt-6 text-[10px] tracking-widest text-base-content/40">
            © {new Date().getFullYear()} · MARINO GOMEZ
          </p>
        </div>
      </aside>
    </>
  );
}
