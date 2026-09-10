import { useLanguage } from "../providers/LanguageProvider";
import { motion } from "../stores/useMotion";

export default function Navigation() {
  const { locale, t, toggleLanguage } = useLanguage();
  return (
    <div class="fixed top-3 right-4 z-[80] flex items-center gap-2 rounded-xl bg-base-100/95 p-1">
      <button
        class="btn btn-ghost btn-sm gap-2 text-xs"
        onClick={motion.toggle}
        disabled={motion.reduced()}
        aria-pressed={motion.paused() || motion.reduced()}
        title={t(
          motion.reduced()
            ? "motion_reduced"
            : motion.paused()
              ? "motion_play"
              : "motion_pause",
        )}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            d={
              motion.paused() || motion.reduced()
                ? "M5 3l7 5-7 5Z"
                : "M5 3v10M11 3v10"
            }
          />
        </svg>
        <span class="hidden sm:inline">
          {t(
            motion.reduced()
              ? "motion_reduced"
              : motion.paused()
                ? "motion_play"
                : "motion_pause",
          )}
        </span>
        <span class="sr-only sm:hidden">
          {t(
            motion.reduced()
              ? "motion_reduced"
              : motion.paused()
                ? "motion_play"
                : "motion_pause",
          )}
        </span>
      </button>
      <button
        onClick={toggleLanguage}
        class="btn btn-sm"
        aria-label={t("language_switch")}
      >
        {locale() === "en" ? "ES" : "EN"}
      </button>
    </div>
  );
}
