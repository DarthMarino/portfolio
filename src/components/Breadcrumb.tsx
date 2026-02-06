import { type Component, For } from "solid-js";
import { A } from "@solidjs/router";
import "./Breadcrumb.css";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb: Component<BreadcrumbProps> = (props) => {
  return (
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        <For each={props.items}>
          {(item, index) => (
            <>
              <li class="breadcrumb-item">
                {item.href ? (
                  <A href={item.href} class="breadcrumb-link">
                    {item.label}
                  </A>
                ) : (
                  <span class="breadcrumb-current">{item.label}</span>
                )}
              </li>
              {index() < props.items.length - 1 && (
                <li class="breadcrumb-separator" aria-hidden="true">
                  /
                </li>
              )}
            </>
          )}
        </For>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
