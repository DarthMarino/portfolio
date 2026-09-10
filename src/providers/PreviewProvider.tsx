import { createEffect, onCleanup, type Component, type JSX } from "solid-js";
import { useImageStore } from "../stores/useImageStore";
import { useLanguage } from "./LanguageProvider";

export const ImagePreviewProvider: Component<{ children: JSX.Element }> = (
  props,
) => {
  const {
    imageSrc,
    imageGroup,
    currentIndex,
    nextImage,
    prevImage,
    closePreview,
  } = useImageStore();
  const { t } = useLanguage();
  let dialog: HTMLDialogElement | undefined;
  let oldOverflow = "";
  createEffect(() => {
    if (imageSrc() && dialog && !dialog.open) {
      oldOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.showModal();
    } else if (!imageSrc() && dialog?.open) {
      dialog.close();
      document.body.style.overflow = oldOverflow;
    }
  });
  onCleanup(() => {
    if (dialog?.open) document.body.style.overflow = oldOverflow;
  });
  return (
    <>
      {props.children}
      <dialog
        ref={dialog}
        class="modal"
        aria-label={t("project_image")}
        onCancel={(event) => {
          event.preventDefault();
          closePreview();
        }}
        onClose={closePreview}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            prevImage();
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            nextImage();
          }
        }}
      >
        <div class="modal-box flex max-h-[95vh] w-[95vw] max-w-6xl flex-col gap-4 p-4">
          <div class="flex items-center justify-between">
            <span class="text-xs text-base-content/60">
              {t("project_image")} · {currentIndex() + 1} /{" "}
              {Math.max(imageGroup().length, 1)}
            </span>
            <button
              class="btn btn-square btn-sm"
              onClick={closePreview}
              aria-label={t("close_preview")}
            >
              ×
            </button>
          </div>
          {imageSrc() && (
            <img
              src={imageSrc()!}
              alt={t("project_image")}
              class="min-h-0 w-full flex-1 object-contain"
            />
          )}
          {imageGroup().length > 1 && (
            <div class="flex justify-between">
              <button class="btn btn-sm" onClick={prevImage}>
                {t("previous_image")} ←
              </button>
              <button class="btn btn-sm" onClick={nextImage}>
                {t("next_image")} →
              </button>
            </div>
          )}
        </div>
        <form method="dialog" class="modal-backdrop">
          <button onClick={closePreview}>{t("close_preview")}</button>
        </form>
      </dialog>
    </>
  );
};
