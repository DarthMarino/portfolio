import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";
import chevron from "../assets/chevron.svg";
import { useImageStore } from "../stores/useImageStore";

const Dropdown = ({
  text = "",
  images = [],
  url,
  slug,
}: {
  text: string;
  images: string[];
  url?: string;
  slug?: string;
}) => {
  const [isActive, setIsActive] = createSignal(true); // Start open by default
  const { previewImage } = useImageStore();

  const toggleDropdown = () => {
    setIsActive(!isActive());
  };

  const handleImageClick = (image: string) => {
    previewImage(image, images); // Pass the entire image group for navigation
  };

  return (
    <div>
      <div class="flex items-center justify-between w-full mb-6 gap-4 flex-wrap" style={{ "padding-bottom": "1rem" }}>
        <button
          class={`dropdown-button ${isActive() ? "active" : ""}`}
          onClick={toggleDropdown}
        >
          <span class="dropdown-title">{text}</span>
          <div class="chevron">
            <img src={chevron} alt="chevron-arrow" />
          </div>
        </button>
        <div class="flex gap-4 items-center flex-wrap">
          {slug && (
            <A
              href={`/project/${slug}`}
              class="project-action-link primary"
            >
              <span>View Details</span>
              <span>→</span>
            </A>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              class="project-action-link"
            >
              <span>Live Project</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </div>
      {isActive() && (
        <div class="carousel-container">
          <div class="carousel carousel-center w-full bg-transparent">
            <For each={images}>
            {(image, index) => (
              <div class="carousel-item">
                <img
                  onClick={() => handleImageClick(image)}
                  src={image}
                  alt={`image-${index()}`}
                  class="h-80 cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            )}
          </For>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
