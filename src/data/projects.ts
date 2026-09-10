import tinacos1 from "../assets/optimized/tinacos-1.webp";
import tinacos2 from "../assets/optimized/tinacos-2.webp";
import tinacos3 from "../assets/optimized/tinacos-3.webp";
import findMachines1 from "../assets/optimized/find-machines-1.webp";
import findMachines2 from "../assets/optimized/find-machines-2.webp";
import findMachines3 from "../assets/optimized/find-machines-3.webp";
import tinacosCover from "../assets/optimized/tinacos-1-thumb.webp";
import findMachinesCover from "../assets/optimized/find-machines-2-thumb.webp";
import qrCover from "../assets/optimized/the-qr-king-1-thumb.webp";
import pventaCover from "../assets/optimized/pventa-3-thumb.webp";
import sicCover from "../assets/optimized/sic-2-thumb.webp";
import curboCover from "../assets/optimized/curbo-1-thumb.webp";

// Image imports
import sic1 from "../assets/optimized/sic-1.webp";
import sic2 from "../assets/optimized/sic-2.webp";
import sic3 from "../assets/optimized/sic-3.webp";
import sic4 from "../assets/optimized/sic-4.webp";
import sic5 from "../assets/optimized/sic-5.webp";
import pventa1 from "../assets/optimized/pventa-1.webp";
import pventa2 from "../assets/optimized/pventa-2.webp";
import pventa3 from "../assets/optimized/pventa-3.webp";
import pventa4 from "../assets/optimized/pventa-4.webp";
import curbo1 from "../assets/optimized/curbo-1.webp";
import curbo2 from "../assets/optimized/curbo-2.webp";
import curbo3 from "../assets/optimized/curbo-3.webp";
import curbo4 from "../assets/optimized/curbo-4.webp";
import qrking1 from "../assets/optimized/the-qr-king-1.webp";
import qrking2 from "../assets/optimized/the-qr-king-2.webp";
import qrking3 from "../assets/optimized/the-qr-king-3.webp";
import qrking4 from "../assets/optimized/the-qr-king-4.webp";
import qrking5 from "../assets/optimized/the-qr-king-5.webp";
import qrking6 from "../assets/optimized/the-qr-king-6.webp";
import qrking7 from "../assets/optimized/the-qr-king-7.webp";

export type ProjectCategory =
  | "employment"
  | "contract"
  | "personal"
  | "business";

export type Project = {
  id: string;
  titleKey: string; // i18n key for title
  slug: string; // URL-friendly identifier
  year: number;
  descriptionKey: string; // i18n key for short description
  category: ProjectCategory; // Type of project
  url?: string;
  images: string[];
  technologies: string[];

  // Detailed project page content
  problemKey?: string; // i18n key for problem statement
  solutionKey?: string; // i18n key for solution description
  challengesKey?: string; // i18n key for challenges faced
  resultsKey?: string; // i18n key for results/impact
  role?: string;
  duration?: string;
  summaryKey?: string;
  roleKey?: string;
  durationKey?: string;
  cover?: string;
  company?: string; // Company/organization name
};

export const projects: Project[] = [
  // 2026
  {
    id: "tinacos-cibao",
    summaryKey: "summary_tinacos",
    roleKey: "role_brand",
    durationKey: "duration_4",

    titleKey: "tinacos_cibao",
    slug: "tinacos-cibao",
    year: 2026,
    descriptionKey: "tinacos_cibao_desc",
    category: "contract",
    url: "https://www.tinacoscibao.com.do/",
    images: [tinacos1, tinacos2, tinacos3],
    cover: tinacosCover,
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Google Apps Script",
      "Google Sheets API",
      "Figma",
      "PDF Generation",
    ],
    role: "Full-Stack Developer & Brand Designer",
    duration: "4 months",
    company: "Polímeros del Cibao",
    problemKey: "tinacos_cibao_problem",
    solutionKey: "tinacos_cibao_solution",
    challengesKey: "tinacos_cibao_challenges",
    resultsKey: "tinacos_cibao_results",
  },
  // 2025
  {
    id: "find-machines",
    summaryKey: "summary_find",
    roleKey: "role_fullstack",
    durationKey: "duration_3",

    titleKey: "find_machines",
    slug: "find-machines",
    year: 2025,
    descriptionKey: "find_machines_desc",
    category: "employment",
    url: "https://www.findmachines.com.do/",
    images: [findMachines1, findMachines2, findMachines3],
    cover: findMachinesCover,
    technologies: ["Go", "CMS", "Cloud Infrastructure"],
    role: "Full-Stack Developer",
    duration: "3 months",
    company: "Find & Supply Solutions",
  },
  {
    id: "event-detector",
    summaryKey: "summary_event",
    roleKey: "role_fullstack",
    durationKey: "duration_3",

    titleKey: "event_detector",
    slug: "event-detector",
    year: 2025,
    descriptionKey: "event_detector_desc",
    category: "contract",
    url: "https://www.eventdetector.com/",
    images: [],
    technologies: ["React", "TypeScript", "Node.js", "SQLite", "Calendar API"],
    role: "Full-Stack Developer",
    duration: "3 months",
    problemKey: "event_detector_problem",
    solutionKey: "event_detector_solution",
    challengesKey: "event_detector_challenges",
    resultsKey: "event_detector_results",
  },
  // 2024
  {
    id: "theqrking",
    summaryKey: "summary_qr",
    roleKey: "role_founder",
    durationKey: "duration_6",
    cover: qrCover,

    titleKey: "the_qr_king",
    slug: "theqrking",
    year: 2024,
    descriptionKey: "the_qr_king_desc",
    category: "contract",
    url: "https://www.theqrking.com/",
    images: [qrking1, qrking2, qrking3, qrking4, qrking5, qrking6, qrking7],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
    role: "Founder & Lead Developer",
    duration: "6 months",
    solutionKey: "the_qr_king_b1",
    resultsKey: "the_qr_king_b2",
  },
  {
    id: "caribbean-coworking",
    summaryKey: "summary_caribbean",
    roleKey: "role_frontend_brand",
    durationKey: "duration_2",

    titleKey: "caribbean_coworking",
    slug: "caribbean-coworking",
    year: 2024,
    descriptionKey: "caribbean_coworking_desc",
    category: "contract",
    url: "https://www.caribbeanbiz.com/",
    images: [],
    technologies: ["React", "TypeScript", "TailwindCSS", "Vite", "Figma"],
    role: "Frontend Developer & Brand Designer",
    duration: "2 months",
    company: "Caribbean Biz",
  },
  // 2022
  {
    id: "pventa-mobile",
    summaryKey: "summary_pventa",
    roleKey: "role_fullstack",
    durationKey: "duration_current",
    cover: pventaCover,

    titleKey: "pventa_mobile",
    slug: "pventa-mobile",
    year: 2022,
    descriptionKey: "pventa_exp",
    category: "employment",
    url: "https://play.google.com/store/apps/details?id=pventa.mobile",
    images: [pventa1, pventa2, pventa3, pventa4],
    technologies: ["React Native", "TypeScript", "Ionic", "C#", "Node.js"],
    role: "Full Stack Developer",
    duration: "2022 - Present",
    company: "Xoultec",
    problemKey: "pventa_problem",
    solutionKey: "pventa_solution",
    challengesKey: "pventa_challenges",
    resultsKey: "pventa_results",
  },
  {
    id: "sic-system",
    summaryKey: "summary_sic",
    roleKey: "role_fullstack",
    durationKey: "duration_year",
    cover: sicCover,

    titleKey: "sic_project",
    slug: "sic-system",
    year: 2022,
    descriptionKey: "sic_exp",
    category: "employment",
    images: [sic1, sic2, sic3, sic4, sic5],
    technologies: ["React", "TypeScript", "TailwindCSS", "C#", "SQL Server"],
    role: "Full-Stack Developer",
    duration: "1 year",
    company: "Xoultec",
    problemKey: "sic_problem",
    solutionKey: "sic_solution",
    challengesKey: "sic_challenges",
    resultsKey: "sic_results",
  },
  // 2021
  {
    id: "curbo",
    summaryKey: "summary_curbo",
    roleKey: "role_frontend",
    cover: curboCover,

    titleKey: "curbo_project",
    slug: "curbo",
    year: 2021,
    descriptionKey: "curbo_exp",
    category: "employment",
    url: "https://curbo.do/",
    images: [curbo1, curbo2, curbo3, curbo4],
    technologies: ["React", "JavaScript", "Node.js", "MongoDB", "Express"],
    role: "Frontend Engineer",
    duration: "2021 - 2023",
    company: "Curbo Technologies",
    problemKey: "curbo_problem",
    solutionKey: "curbo_solution",
    challengesKey: "curbo_challenges",
    resultsKey: "curbo_results",
  },
];

// Helper functions
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return projects.filter((p) => p.category === category);
};

export const getProjectsByYear = (year: number): Project[] => {
  return projects.filter((p) => p.year === year);
};
