import { type Component } from "solid-js";
import * as i18n from "@solid-primitives/i18n";

type RangeProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
  year1?: number;
  year2?: number;
  companyKey?: string;
  roleKey?: string;
  link?: string;
};

const Range: Component<RangeProps> = (props) => (
  <div>
    <div class="range-header">
      <h4>{props.roleKey ? props.t(props.roleKey) : ""}</h4>
      <h4 style={{ opacity: 0.7 }}>{props.t("at")}</h4>
      <h4>
        {props.link ? (
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            {props.companyKey ? props.t(props.companyKey) : ""}
          </a>
        ) : (
          <>{props.companyKey ? props.t(props.companyKey) : ""}</>
        )}
      </h4>
    </div>
    <div class="year-range" style={{ height: "2rem" }}>
      <span class="yearBox">{props.year1}</span>
      <p>
        <i class="arrow" />
      </p>
      <span class="yearBox">
        {props.year2 ? props.year2 : props.t("present")}
      </span>
    </div>
  </div>
);

export default Range;
