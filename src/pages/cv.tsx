import {
  createSignal,
  onMount,
  Show,
  createEffect,
  type Component,
  type Accessor,
} from "solid-js";
import { jsPDF } from "jspdf";
import * as i18n from "@solid-primitives/i18n";
import { type Locale } from "../localizations/resources";
import { certifications } from "../statics/objects";
import { format } from "date-fns";
import { isPhone } from "../utils/detect_phone";
import profileImage from "../assets/profile.png";

type CVPageProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
  locale: Accessor<Locale>;
  isDominican?: boolean;
  withImage?: boolean;
};

type RGB = [number, number, number];

const DARK: RGB = [26, 26, 26];
const GRAY: RGB = [85, 85, 85];

// Convert "MMM yyyy" (e.g. "Jan 2023") to "MM/yyyy" for ATS-consistent dates
const certDateToMMYY = (date: string | Date): string => {
  if (typeof date === "string") {
    const match = date.match(/^(\w{3})\s+(\d{4})$/);
    if (match) {
      const monthIndex = new Date(Date.parse(`${match[1]} 1, 2000`)).getMonth();
      return `${("0" + (monthIndex + 1)).slice(-2)}/${match[2]}`;
    }
    return date;
  }
  return format(date, "MM/yyyy");
};

const CVPage: Component<CVPageProps> = (props) => {
  const [pdfUrl, setPdfUrl] = createSignal<string>();
  const [isLoading, setIsLoading] = createSignal(true);
  const [previousLocale, setPreviousLocale] = createSignal<Locale>();
  const [isMobile] = createSignal(isPhone());

  const MARGIN = 14;
  const PAGE_HEIGHT = 279; // Letter height in mm
  const PAGE_WIDTH = 216; // Letter width in mm
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
  const BOTTOM = PAGE_HEIGHT - 16;

  const createPDF = async () => {
    try {
      setIsLoading(true);

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter",
      });

      const isDr = props.isDominican;
      const filename = isDr ? "marino_gomez_cv_rd" : "marino_gomez_cv";
      doc.setProperties({
        title: "Marino Gomez - Full-Stack Software Engineer Resume",
        author: "Marino Gomez",
        subject: "Full-Stack Software Engineer Resume",
        keywords:
          "Full-Stack Software Engineer, TypeScript, Go, React, Node.js, Next.js, React Native, PostgreSQL, AWS, Docker, CI/CD, Accessibility",
        creator: "Marino Gomez Portfolio",
      });

      // Single-column, ATS-safe helpers -------------------------------------
      let y = 0;

      const addPage = () => {
        doc.addPage();
        y = 18;
      };
      const need = (space: number) => {
        if (y + space > BOTTOM) addPage();
      };
      const text = (
        s: string,
        size = 10,
        font: "normal" | "bold" = "normal",
        color: RGB = DARK,
        x = MARGIN,
        leading = 4.2,
      ) => {
        doc.setFont("Helvetica", font);
        doc.setFontSize(size);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.text(s, x, y);
        y += leading;
      };
      const wrap = (
        s: string,
        size = 10,
        leading = 4.4,
        x = MARGIN,
        width = CONTENT_WIDTH,
      ) => {
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(size);
        doc.setTextColor(DARK[0], DARK[1], DARK[2]);
        const lines = doc.splitTextToSize(s, width) as string[];
        lines.forEach((line: string) => {
          doc.text(line, x, y);
          y += leading;
        });
      };
      const rule = () => {
        y += 1;
        doc.setDrawColor(140, 140, 140);
        doc.setLineWidth(0.3);
        doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
        y += 3.5;
      };
      const section = (title: string) => {
        need(22);
        y += 3.5;
        text(title.toUpperCase(), 12, "bold", DARK, MARGIN, 1.2);
        rule();
        y += 1;
      };
      const bullet = (s: string) => {
        need(6);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(DARK[0], DARK[1], DARK[2]);
        const lines = doc.splitTextToSize(s, CONTENT_WIDTH - 4) as string[];
        doc.text("-", MARGIN, y);
        lines.forEach((line: string, i: number) => {
          doc.text(line, MARGIN + 4, y + i * 4.2);
        });
        y += lines.length * 4.2 + 1.4;
      };
      const headerRow = (title: string, dates: string) => {
        need(12);
        y += 2.2;
        text(title + " | " + dates, 10.5, "bold", DARK, MARGIN, 5.5);
      };
      const workRow = (role: string, company: string, dates: string) => {
        need(12);
        y += 2.2;
        let size = 10.5;
        let roleWidth = 0;
        let restWidth = 0;
        for (; size >= 9; size -= 0.5) {
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(size);
          roleWidth = doc.getTextWidth(role);
          doc.setFont("Helvetica", "normal");
          restWidth = doc.getTextWidth(`, ${company}, ${dates}`);
          if (roleWidth + restWidth <= CONTENT_WIDTH) break;
        }
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(size);
        doc.setTextColor(DARK[0], DARK[1], DARK[2]);
        doc.text(role, MARGIN, y);
        doc.setFont("Helvetica", "normal");
        doc.text(`, ${company}, ${dates}`, MARGIN + roleWidth, y);
        y += 5.5;
      };
      const eduRow = (boldTitle: string, rest: string) => {
        need(10);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(DARK[0], DARK[1], DARK[2]);
        const titleWidth = doc.getTextWidth(boldTitle);
        doc.text(boldTitle, MARGIN, y);
        doc.setFont("Helvetica", "normal");
        const lines = doc.splitTextToSize(
          rest,
          CONTENT_WIDTH - titleWidth,
        ) as string[];
        lines.forEach((line: string, i: number) => {
          doc.text(line, MARGIN + titleWidth, y + i * 4.2);
        });
        y += lines.length * 4.2 + 1.6;
      };
      const skillRow = (label: string, values: string) => {
        need(8);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(DARK[0], DARK[1], DARK[2]);
        const labelWidth = doc.getTextWidth(label + ": ");
        doc.text(label + ": ", MARGIN, y);
        doc.setFont("Helvetica", "normal");
        const lines = doc.splitTextToSize(
          values,
          CONTENT_WIDTH - labelWidth,
        ) as string[];
        lines.forEach((line: string, i: number) => {
          doc.text(line, MARGIN + labelWidth, y + i * 4.2);
        });
        y += lines.length * 4.2 + 1.6;
      };

      // HEADER ---------------------------------------------------------------
      y = 16;

      if (props.withImage) {
        const imageSize = 24;
        const imageX = MARGIN;
        const imageY = 14;
        const centerX = imageX + imageSize / 2;
        const centerY = imageY + imageSize / 2;
        const radius = imageSize / 2;
        try {
          doc.saveGraphicsState();
          const pageHeight = doc.internal.pageSize.height;
          const scale = 2.83465;
          (doc.internal as any).write("q");
          const cx = centerX * scale;
          const cy = (pageHeight - centerY) * scale;
          const r = radius * scale;
          const k = 0.5522848;
          (doc.internal as any).write(
            [
              cx + r,
              cy,
              "m",
              cx + r,
              cy + r * k,
              cx + r * k,
              cy + r,
              cx,
              cy + r,
              "c",
              cx - r * k,
              cy + r,
              cx - r,
              cy + r * k,
              cx - r,
              cy,
              "c",
              cx - r,
              cy - r * k,
              cx - r * k,
              cy - r,
              cx,
              cy - r,
              "c",
              cx + r * k,
              cy - r,
              cx + r,
              cy - r * k,
              cx + r,
              cy,
              "c",
              "W n",
            ].join(" "),
          );
          doc.addImage(
            profileImage,
            "JPEG",
            imageX,
            imageY,
            imageSize,
            imageSize,
            undefined,
            "NONE",
            0,
          );
          (doc.internal as any).write("Q");
          doc.restoreGraphicsState();
        } catch (error) {
          console.warn("Profile image not loaded:", error);
        }

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(DARK[0], DARK[1], DARK[2]);
        doc.text("Marino Gomez", MARGIN + imageSize + 6, y + 6);
        y += 9;
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        doc.text(props.t("cv_title"), MARGIN + imageSize + 6, y);
        y = Math.max(y + 6, imageY + imageSize + 4);
      } else {
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(DARK[0], DARK[1], DARK[2]);
        doc.text("Marino Gomez", MARGIN, y);
        y += 8;
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        doc.text(props.t("cv_title"), MARGIN, y);
        y += 5;
      }

      const location = isDr ? props.t("location_dr") : "Passaic, NJ";
      text(
        `${location} | +1 (829) 926-5003 | ${props.t("email")}`,
        10,
        "normal",
        DARK,
        MARGIN,
        4.4,
      );

      // Clickable links line
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(DARK[0], DARK[1], DARK[2]);
      const links: Array<[string, string]> = [
        ["linkedin.com/in/maghiworks", "https://linkedin.com/in/maghiworks"],
        ["github.com/DarthMarino", "https://github.com/DarthMarino"],
        ["www.marinogomez.dev", "https://www.marinogomez.dev"],
      ];
      let linkX = MARGIN;
      links.forEach(([label, url]) => {
        doc.textWithLink(label, linkX, y, { url });
        linkX += doc.getTextWidth(label) + 9;
      });
      y += 6;

      // SUMMARY ---------------------------------------------------------------
      section(props.t("summary_title"));
      wrap(props.t("cv_intro"), 10, 4.4);

      // TECHNICAL SKILLS -------------------------------------------------------
      section(props.t("skills_title"));
      const skillRows: Array<[string, string]> = [
        [props.t("languages_skills"), props.t("languages_skills_list")],
        [props.t("frontend_skills"), props.t("frontend_skills_list")],
        [props.t("backend_skills"), props.t("backend_skills_list")],
        [props.t("cloud_devops_skills"), props.t("cloud_devops_skills_list")],
        [props.t("testing_skills"), props.t("testing_skills_list")],
      ];
      skillRows.forEach(([label, values]) => skillRow(label, values));

      // WORK EXPERIENCE --------------------------------------------------------
      section(props.t("experience_title"));
      workRow(
        props.t("software_eng_title"),
        props.t("tecno_company"),
        props.t("tecno_date"),
      );
      [
        props.t("tecno_exp_1"),
        props.t("tecno_exp_2"),
        props.t("tecno_exp_3"),
        props.t("tecno_exp_4"),
      ].forEach(bullet);
      workRow(
        props.t("frontend_eng_title"),
        props.t("curbo_company"),
        props.t("curbo_date"),
      );
      [
        props.t("curbo_exp_1"),
        props.t("curbo_exp_2"),
        props.t("curbo_exp_3"),
        props.t("curbo_exp_4"),
      ].forEach(bullet);

      // PROJECTS -----------------------------------------------------------------
      section(props.t("projects_title"));
      const projects: Array<{ title: string; year: string; bullets: string[] }> = [
        {
          title: props.t("find_machines"),
          year: props.t("find_machines_date"),
          bullets: [props.t("find_machines_b1"), props.t("find_machines_b2")],
        },
        {
          title: props.t("tinacos_cibao"),
          year: props.t("tinacos_cibao_date"),
          bullets: [props.t("tinacos_cibao_b1"), props.t("tinacos_cibao_b2")],
        },
        {
          title: props.t("event_detector"),
          year: props.t("event_detector_date"),
          bullets: [props.t("event_detector_b1"), props.t("event_detector_b2")],
        },
        {
          title: props.t("the_qr_king"),
          year: props.t("the_qr_king_date"),
          bullets: [props.t("the_qr_king_b1"), props.t("the_qr_king_b2")],
        },
        {
          title: props.t("caribbean_coworking"),
          year: props.t("caribbean_coworking_date"),
          bullets: [
            props.t("caribbean_coworking_b1"),
            props.t("caribbean_coworking_b2"),
          ],
        },
      ];
      projects.forEach((project) => {
        headerRow(project.title, project.year);
        project.bullets.forEach(bullet);
      });

      // EDUCATION ------------------------------------------------------------------
      section(props.t("education_title"));
      eduRow(
        props.t("software_eng"),
        `, ${props.t("intec")} | ${props.t("intec_date")}`,
      );
      eduRow(
        props.t("digital_electronics"),
        `, ${props.t("loyola")} | ${props.t("loyola_date")}`,
      );

      // CERTIFICATIONS ---------------------------------------------------------------
      section(props.t("certifications_title"));
      need(8);
      const cert =
        certifications.find((c) => c.title === "Three.js Journey") ??
        certifications[0];
      if (cert) {
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(DARK[0], DARK[1], DARK[2]);
        const titleWidth = doc.getTextWidth(cert.title);
        doc.textWithLink(cert.title, MARGIN, y, { url: cert.credentialUrl });
        doc.setFont("Helvetica", "normal");
        doc.text(` | ${certDateToMMYY(cert.date)}`, MARGIN + titleWidth, y);
        y += 4.2;
      }

      // LANGUAGES ---------------------------------------------------------------------
      section(props.t("languages"));
      need(8);
      wrap(
        `${props.t("lang_1")} (${props.t("lang_1_level")}), ${props.t("lang_2")} (${props.t("lang_2_level")}), ${props.t("lang_3")} (${props.t("lang_3_level")})`,
      );

      // Output ------------------------------------------------------------------------
      const pdfArrayBuffer = doc.output("arraybuffer");
      const blob = new Blob([pdfArrayBuffer], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url + `#filename=${filename}.pdf`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating PDF:", error);
      setIsLoading(false);
    }
  };

  onMount(() => {
    setPreviousLocale(props.locale());
    createPDF();
  });

  // Watch for locale changes and regenerate PDF
  createEffect(() => {
    const currentLocale = props.locale(); // Track the locale signal
    if (previousLocale() !== undefined && previousLocale() !== currentLocale) {
      setPreviousLocale(currentLocale);
      createPDF();
    }
  });

  return (
    <div class="min-h-screen bg-base-100">
      <Show
        when={!isLoading()}
        fallback={
          <div class="flex justify-center items-center min-h-screen">
            <div class="flex flex-col items-center gap-4">
              <span class="loading loading-spinner loading-lg"></span>
              <p class="text-lg">{props.t("generating_pdf")}</p>
            </div>
          </div>
        }
      >
        <Show
          when={pdfUrl()}
          fallback={
            <div class="flex justify-center items-center min-h-screen">
              <p class="text-lg">{props.t("no_pdf_display")}</p>
            </div>
          }
        >
          <Show
            when={!isMobile()}
            fallback={
              <div class="flex flex-col justify-center items-center min-h-screen gap-4 p-8">
                <div class="text-center">
                  <h2 class="text-2xl font-bold mb-2">PDF Ready</h2>
                  <p class="text-lg mb-4">
                    Mobile browsers don't support PDF viewing. Download the PDF
                    to view it.
                  </p>
                </div>
                <a
                  href={pdfUrl()!}
                  download={`${props.isDominican ? "marino_gomez_cv_rd" : "marino_gomez_cv"}.pdf`}
                  class="btn btn-primary btn-lg"
                >
                  Download CV PDF
                </a>
              </div>
            }
          >
            <div class="w-full h-screen">
              <iframe
                id="pdf-viewer"
                class="w-full h-full border-0"
                src={pdfUrl()!}
                title={
                  props.isDominican ? "marino_gomez_cv_rd" : "marino_gomez_cv"
                }
              />
            </div>
          </Show>
        </Show>
      </Show>
    </div>
  );
};

export default CVPage;
