import { type Component, For } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import BackgroundScene from "../components/BackgroundScene";
import Breadcrumb, { type BreadcrumbItem } from "../components/Breadcrumb";
import Range from "../components/Range";
import Dropdown from "../components/Dropdown";
import { getProjectsByCategory } from "../data/projects";
import "./Experience.css";

// Import project images
import sic1 from "../assets/images/sic-1.png";
import sic2 from "../assets/images/sic-2.png";
import sic3 from "../assets/images/sic-3.png";
import sic4 from "../assets/images/sic-4.png";
import sic5 from "../assets/images/sic-5.png";
import pventa1 from "../assets/images/pventa-1.png";
import pventa2 from "../assets/images/pventa-2.png";
import pventa3 from "../assets/images/pventa-3.png";
import pventa4 from "../assets/images/pventa-4.png";
import curbo1 from "../assets/images/curbo-1.png";
import curbo2 from "../assets/images/curbo-2.jpeg";
import curbo3 from "../assets/images/curbo-3.png";
import curbo4 from "../assets/images/curbo-4.png";
import qrking1 from "../assets/images/the-qr-king-1.png";
import qrking2 from "../assets/images/the-qr-king-2.png";
import qrking3 from "../assets/images/the-qr-king-3.png";
import qrking4 from "../assets/images/the-qr-king-4.png";
import qrking5 from "../assets/images/the-qr-king-5.png";
import qrking6 from "../assets/images/the-qr-king-6.png";
import qrking7 from "../assets/images/the-qr-king-7.png";

type ExperienceProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
};

const Experience: Component<ExperienceProps> = (props) => {
  const breadcrumbItems = (): BreadcrumbItem[] => [
    { label: props.t("home"), href: "/" },
    { label: "Experience" }
  ];

  const employmentProjects = getProjectsByCategory("employment");
  const businessProjects = getProjectsByCategory("business");
  const contractProjects = getProjectsByCategory("contract");

  return (
    <div class="page-container">
      <BackgroundScene />

      <div class="page-content">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems()} />

        {/* Header */}
        <div class="page-header">
          <h1 class="page-title">Experience</h1>
          <p class="page-subtitle">
            {typeof props.t("cv_intro") === "function"
              ? props.t("cv_intro")()
              : props.t("cv_intro")}
          </p>
        </div>

        {/* Work Experience Section */}
        <div class="page-section">
          <h2 class="section-title">Professional Experience</h2>

          {/* Xoultec - Current Employment */}
          <div class="company-block">
            <Range
              t={props.t}
              year1={2022}
              roleKey="software_eng_title"
              companyKey="tecno_company"
            />

            <div class="company-description">
              <For each={[
                props.t("tecno_exp_1"),
                props.t("tecno_exp_2"),
                props.t("tecno_exp_3"),
                props.t("tecno_exp_4"),
                props.t("tecno_exp_5"),
              ]}>
                {(desc) => <p class="experience-item">{desc}</p>}
              </For>
            </div>

            <div class="projects-showcase">
              <h3 class="projects-heading">Key Projects</h3>
              <Dropdown
                text={props.t("pventa_mobile")}
                images={[pventa1, pventa2, pventa3, pventa4]}
                url={"https://play.google.com/store/apps/details?id=pventa.mobile"}
                slug="pventa-mobile"
              />
              <Dropdown
                text={props.t("sic_project")}
                images={[sic1, sic2, sic3, sic4, sic5]}
                slug="sic-system"
              />
            </div>
          </div>

          {/* TheQRKing - Business/Contract */}
          <div class="company-block">
            <Range
              t={props.t}
              year1={2024}
              roleKey="software_eng_title"
              companyKey="qrking_company"
              link="https://www.theqrking.com/"
            />

            <div class="company-description">
              <For each={[
                props.t("qrking_exp_1"),
                props.t("qrking_exp_2"),
                props.t("qrking_exp_3"),
              ]}>
                {(desc) => <p class="experience-item">{desc}</p>}
              </For>
            </div>

            <div class="projects-showcase">
              <h3 class="projects-heading">Project</h3>
              <Dropdown
                text={props.t("the_qr_king")}
                images={[
                  qrking1,
                  qrking2,
                  qrking3,
                  qrking4,
                  qrking5,
                  qrking6,
                  qrking7,
                ]}
                url={"https://www.theqrking.com/"}
                slug="theqrking"
              />
            </div>
          </div>

          {/* Curbo Technologies */}
          <div class="company-block">
            <Range
              t={props.t}
              year1={2021}
              year2={2023}
              roleKey="frontend_eng_title"
              companyKey="curbo_company"
            />

            <div class="company-description">
              <For each={[
                props.t("curbo_exp_1"),
                props.t("curbo_exp_2"),
                props.t("curbo_exp_3"),
              ]}>
                {(desc) => <p class="experience-item">{desc}</p>}
              </For>
            </div>

            <div class="projects-showcase">
              <h3 class="projects-heading">Project</h3>
              <Dropdown
                text={props.t("curbo_project")}
                images={[curbo1, curbo2, curbo3, curbo4]}
                url={"https://curbo.do/"}
                slug="curbo"
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div class="page-section">
          <h2 class="section-title">{props.t("studies_title")}</h2>

          <div class="education-grid">
            <Range
              t={props.t}
              year1={2017}
              year2={2021}
              roleKey="software_eng"
              companyKey="intec"
              link="https://www.intec.edu.do/en/"
            />
            <Range
              t={props.t}
              year1={2017}
              year2={2021}
              roleKey="digital_electronics"
              companyKey="loyola"
              link="https://ipl.edu.do/"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
