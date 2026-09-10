import { createSignal, For, onCleanup, onMount } from "solid-js";
import { motion } from "../stores/useMotion";
import "./BackgroundScene.css";

const forms = [
  { x: 300, y: 150, size: 98, kind: "hexagon", duration: 48, delay: -12 },
  { x: 1420, y: 100, size: 220, kind: "circle", duration: 62, delay: -35 },
  { x: 1190, y: 390, size: 130, kind: "diamond", duration: 56, delay: -20 },
  { x: 100, y: 590, size: 160, kind: "circle", duration: 70, delay: -8 },
  { x: 620, y: 780, size: 100, kind: "diamond", duration: 58, delay: -27 },
  { x: 1500, y: 830, size: 200, kind: "hexagon", duration: 66, delay: -42 },
  { x: 920, y: 80, size: 36, kind: "circle", duration: 42, delay: -18 },
  { x: 350, y: 990, size: 68, kind: "hexagon", duration: 53, delay: -5 },
];

export default function BackgroundScene() {
  const [hidden, setHidden] = createSignal(false);
  onMount(() => {
    motion.restore();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => motion.setReduced(preference.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    onCleanup(() => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    });
  });

  return (
    <div
      class="geometric-background"
      aria-hidden="true"
      data-paused={motion.paused() || motion.reduced() || hidden()}
    >
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <For each={forms}>
          {(form) => (
            <g transform={`translate(${form.x} ${form.y})`}>
              <g
                class="geometric-form"
                style={{
                  "animation-duration": `${form.duration}s`,
                  "animation-delay": `${form.delay}s`,
                }}
              >
                {form.kind === "circle" ? (
                  <>
                    <circle r={form.size} />
                    <circle r={form.size * 0.8} stroke-dasharray="2 14" />
                  </>
                ) : form.kind === "diamond" ? (
                  <>
                    <rect
                      x={-form.size / 2}
                      y={-form.size / 2}
                      width={form.size}
                      height={form.size}
                      transform="rotate(35)"
                    />
                    <path
                      d={`M ${-form.size} 0 H ${form.size} M 0 ${-form.size} V ${form.size}`}
                      opacity="0.35"
                    />
                  </>
                ) : (
                  <polygon
                    points={Array.from({ length: 6 }, (_, i) => {
                      const angle = (Math.PI / 3) * i;
                      return `${Math.cos(angle) * form.size},${Math.sin(angle) * form.size}`;
                    }).join(" ")}
                  />
                )}
              </g>
            </g>
          )}
        </For>
        <path
          d="M 0 300 H 1600 M 0 700 H 1600 M 500 0 V 1000 M 1100 0 V 1000"
          stroke-dasharray="1 15"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
