import { lazy, createSignal, type Component } from "solid-js";
import { Router, Route } from "@solidjs/router";

import { ImagePreviewProvider } from "./providers/PreviewProvider";
import { LanguageProvider } from "./providers/LanguageProvider";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import BackgroundScene from "./components/BackgroundScene";
import RouteMetadata from "./components/RouteMetadata";
import { useLanguage } from "./providers/LanguageProvider";

const App: Component = () => {
  return (
    <LanguageProvider>
      <ImagePreviewProvider>
        <Router
          root={(props) => {
            const { t } = useLanguage();
            const [menuOpen, setMenuOpen] = createSignal(false);
            return (
              <div class="min-h-screen">
                <RouteMetadata />
                <BackgroundScene />
                <a
                  href="#main-content"
                  class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-lg focus:bg-base-100 focus:p-4"
                >
                  {t("skip_content")}
                </a>
                <Sidebar onOpenChange={setMenuOpen} />
                <div inert={menuOpen()}>
                  <Navigation />
                </div>
                <main
                  id="main-content"
                  inert={menuOpen()}
                  tabindex="-1"
                  class="main-content-with-sidebar"
                >
                  {props.children}
                </main>
              </div>
            );
          }}
        >
          <Route path="/" component={lazy(() => import("./routes/home"))} />
          <Route
            path="/about"
            component={lazy(() => import("./routes/about"))}
          />
          <Route
            path="/projects"
            component={lazy(() => import("./routes/projects"))}
          />
          <Route
            path="/experience"
            component={lazy(() => import("./routes/experience"))}
          />
          <Route
            path="/skills"
            component={lazy(() => import("./routes/skills"))}
          />
          <Route
            path="/contact"
            component={lazy(() => import("./routes/contact"))}
          />
          <Route path="/cv" component={lazy(() => import("./routes/cv"))} />
          <Route
            path="/cv-rd"
            component={lazy(() => import("./routes/cv-rd"))}
          />
          <Route
            path="/cv-img"
            component={lazy(() => import("./routes/cv-img"))}
          />
          <Route
            path="/cv-rd-img"
            component={lazy(() => import("./routes/cv-rd-img"))}
          />
          <Route
            path="/project/:slug"
            component={lazy(() => import("./routes/project"))}
          />
          <Route
            path="*404"
            component={lazy(() => import("./routes/not-found"))}
          />
        </Router>
      </ImagePreviewProvider>
    </LanguageProvider>
  );
};

export default App;
