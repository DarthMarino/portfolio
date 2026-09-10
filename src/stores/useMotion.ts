import { createSignal } from "solid-js";

const [paused, setPaused] = createSignal(false);
const [reduced, setReduced] = createSignal(false);
export const motion = {
  paused,
  reduced,
  setReduced,
  restore() {
    try {
      setPaused(localStorage.getItem("portfolio-motion") === "paused");
    } catch {
      /* Storage can be unavailable. */
    }
  },
  toggle() {
    setPaused((value) => !value);
    try {
      localStorage.setItem(
        "portfolio-motion",
        paused() ? "paused" : "animated",
      );
    } catch {
      /* Keep the in-memory choice. */
    }
  },
};
