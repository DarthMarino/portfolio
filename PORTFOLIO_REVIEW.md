# Portfolio review — September 10, 2026

## Implementation update

The visual recommendations are now applied locally:

- Deep green surfaces, mint accents, Inter body text, a narrower text-based sidebar, and compact page headers.
- A shorter homepage introduction followed by three curated projects with real screenshot covers, a concise experience summary, and contact.
- Short project-card summaries, localized role/duration labels, case-study cover images, captioned galleries, accessible previews, and two related projects per case study.
- A practical Skills page with visible descriptions and links to project evidence; condensed education and certificate sections. About and Experience use distinct copy rather than repeating the CV summary.
- A persistent geometric SVG background with eight drifting forms. Shapes remain visible when paused or reduced motion is requested. The pause preference persists, reduced-motion changes are observed live, and hidden tabs pause animation.
- English/Spanish UI translations and persistent language selection; translated route titles/descriptions. The CV waits for the selected dictionary before generation and releases old PDF URLs.
- Optimized web images: the full-size derivative set is 923,164 bytes versus 12,515,777 bytes of originals (about 93% smaller). Originals remain in the repository; the optional photo CV still uses the original portrait.
- Removed the legacy portfolio route, unused styles, unused 3D projection component, and unused animation/icon libraries. Repaired TypeScript module resolution, Node types, and translator typing. Third-party declaration checking is skipped; application code remains under strict checking.

Verification: strict application typecheck and the production build pass. The content check covers 181 project/UI keys in both languages, project image imports, unique slugs, and gallery-caption counts. Browser checks covered every public content/project route at 390px, representative tablet layouts at 768px, desktop rendering, filters (8/4/4), gallery navigation and Escape, language persistence, shape-pause persistence, and PDF generation for all four CV variants. No test email was sent and nothing was deployed.

Still needs source material: real screenshots for Tinacos, Find & Supply, Event Detector, and Caribbean Coworking; confirmation of the roles, dates, technology details, and numerical claims listed below. Existing detailed claims were not independently verified. Prerendering, social preview images, HTTP-level 404s, and external service/link verification remain future work.

The sections below preserve the original audit as context; their recommendations and pre-existing typecheck failure describe the state before this implementation.

The portfolio has useful real work and a recognizable green identity. The biggest opportunity is to make the work easier to evaluate: put project evidence earlier, shorten repeated introductions, and make every claim consistent across the project pages and CV.

This review covers local source, the rendered homepage, About, Projects, all eight project details, Experience, Skills, the contact flow, and CV generation. It is not a verification of employment history, project metrics, live external destinations, or email delivery.

## Fixed in this pass

- `/contact` previously mounted `routes/html.tsx`, which rendered the legacy portfolio. It now renders a dedicated contact page. Sidebar and homepage links consistently use `/contact`; the existing About contact section remains available through a shared component.
- Project details previously omitted the existing short description. Every project now has an Overview, including the sparse Find & Supply and Caribbean Coworking pages.
- TheQRKing referenced four nonexistent translation keys, producing empty case-study sections. Solution and Results now use existing bilingual CV project descriptions; unsupported Challenge and Learnings sections are omitted.
- Removed the stock Unsplash images labeled “Projects & Lab Work Gallery.” Renamed the INTEC gallery “Campus Photos” to describe the supplied images more accurately.
- Aligned Find & Supply's technology labels with the existing Go-based project description; aligned Event Detector with the existing SQLite description. These changes reconcile internal content, not independent verification of the projects.
- Aligned Loyola's Experience dates with the Skills page: 2014–2017.
- Translated sidebar labels and the contact form into Spanish. The document language now follows the selected language.
- Added a missing-page screen, a main landmark, visible keyboard focus, filter pressed states, mobile menu expanded state and Escape dismissal. Closed mobile navigation is hidden from focus after closing.
- Disabled the decorative background on initial load when reduced motion is preferred, and suppressed CSS transitions/scroll animation for that preference. Gallery images load lazily.
- Improved primary cyan button text contrast using the existing dark background color. The explicit pair improved from approximately 2.44:1 to 4.99:1. This checks that color pair only, not full accessibility conformance.
- Updated the search description from frontend-only to full-stack, matching the homepage and CV. Removed the light root background that could flash during lazy route loading.
- Added `pnpm check:content` to catch missing/empty project translation references and duplicate project slugs.

## Content still needed

| Project | Current evidence | Next addition |
| --- | --- | --- |
| Tinacos Cibao | Detailed narrative; no screenshots | Website, label designs, warranty workflow, and PDF output samples with private data removed |
| Find & Supply Solutions | Overview and live link; no screenshots | Catalog and CMS screenshots; one concrete implementation decision; confirm exact frontend/cloud stack |
| Event Detector | Detailed narrative; no screenshots | Submission form, moderation screen, calendar/list views |
| Caribbean Business Coworking | Overview and live link; no screenshots | Reservation/payment flow screenshots and your specific contribution |
| TheQRKing | Seven screenshots; repaired content sections | Confirm “Founder & Lead Developer” versus contract wording; explain one technical tradeoff |
| PVenta Mobile | Four screenshots and detailed narrative | Confirm metrics, dates, and current ownership; caption screenshots by workflow |
| SIC Web | Five screenshots and detailed narrative | Reconcile Node.js narrative with C#/SQL Server labels; explain migration scope |
| Curbo | Four screenshots and detailed narrative | Clarify frontend role versus full-stack narrative and verify performance/testing claims |

Do not fill missing screenshots with stock photos or made-up dashboards. The compact overviews are valid until you have real material. Missing images now occur on four of eight projects; missing translation references are resolved.

Several existing statements need your confirmation: 95%+ test coverage, 60% faster dashboards, 40% lower maintenance costs, 90%+ coverage at Curbo, and specific user/client counts. They may be accurate, but the repository cannot substantiate them. Prefer one measured outcome with context over a paragraph of percentages. For a performance claim, state what was measured, the before/after values, and your contribution.

Experience lists three organizations but Projects includes other recent engagements. Add the recent work to the chronology if it belongs there. Confirm which engagements remain current and whether TheQRKing's six-month project duration and ongoing Experience entry describe different phases.

## Recommended design direction

Keep green, but simplify its use. My suggested palette for a later visual pass is deep green `#10231D` for the page, `#19352B` for panels, off-white `#F4F7F5` for text, and mint `#6FE0BC` for the primary action. These are design proposals, not a theme applied in this pass. Use one accent consistently and test actual foreground/background pairs. Normal-size text should reach 4.5:1 under [W3C contrast guidance](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).

1. **Homepage:** shorten the hero, reduce the name size, and show three selected projects immediately after it. At 1280×720, the current intro nearly fills the first screen. A compact left-aligned introduction with the portrait beside it would make room for evidence. Suggested sequence: introduction → selected work → concise experience → contact.
2. **Projects:** use real cover images, one sentence of context, role, and a few key technologies. Current cards have long paragraphs and no visual previews. Prefer a manually chosen featured order over year alone.
3. **Case studies:** start with a screenshot and a compact role/scope summary, then challenge, contribution, tradeoff, and outcome. Caption galleries. Reduce “Other Projects” from seven full cards to two or three relevant links so it does not overwhelm a short case study.
4. **Typography:** reserve uppercase for small labels. Use sentence case for headings and less heavy body text. The site currently loads Sofia Sans at 600/800 while using it globally, which contributes to the uniformly bold appearance.
5. **Navigation:** replace the mixed emoji icons with one consistent icon set, or simple text. A narrower sidebar would give project screenshots more room; mobile navigation can keep its current pattern.
6. **About/Experience:** avoid repeating the same CV summary. Make About more personal and specific; make Experience a concise timeline with links to the relevant case studies.
7. **Skills:** move practical expertise before long education details. Link skills to actual projects rather than emphasizing self-assigned “expert” levels. Hover-only descriptions need keyboard/touch equivalents.
8. **Background:** reduce or remove animation behind dense reading sections. Honor changes to reduced-motion preferences while a page remains open; the current JavaScript check only runs on mount. [W3C's reduced-motion technique](https://www.w3.org/WAI/WCAG21/Techniques/css/C39) explains the preference.

## Engineering follow-ups

- Finish translation of page titles, category filters, project section headings, hero text, skills descriptions, and role/duration labels. Contact and sidebar are translated; the rest still mixes languages. Consider persisting the language choice across reloads.
- Optimize image delivery. The build includes a 1.37 MB portrait and two QR screenshots around 2.45–2.53 MB each. Generate appropriately sized modern image variants and retain originals separately. Lazy loading helps galleries but does not reduce individual image size.
- Repair the existing TypeScript setup: old module resolution, missing Node types, a missing `three` import in the legacy projection component, and the translator's incompatible declared type. Audit obsolete legacy components/dependencies before removing them.
- Add route-specific titles/descriptions and social preview metadata. Consider prerendering important public routes. The new missing-page UI still uses the host's SPA rewrite, so it does not itself return an HTTP 404.
- The CV route generates its PDF successfully in the preview, but PDF typography, pagination, download behavior, and all regional/image variants need a separate artifact review. The homepage's “Download CV” opens a preview; “View CV” would describe that action more precisely.
- Verify external project links, certificates, and Web3Forms delivery separately. No message was submitted during this review.

## Verification

- `pnpm build`: passed after the changes.
- `pnpm check:content`: passed for 38 project content references in each of English and Spanish across eight projects.
- `git diff --check`: passed.
- Browser: all eight project routes render their overviews; TheQRKing Solution and Results render in English and Spanish. Direct `/contact` loading and sidebar navigation reach the new page. Spanish contact labels and document language update correctly.
- Mobile at 390×844: no horizontal document overflow on Home, About, Projects, Caribbean Coworking detail, Experience, Skills, Contact, and the missing-page screen. Menu expansion/Escape dismissal checked. This is a representative responsive check, not exhaustive device testing.
- CV: the generated PDF viewer appears. No email was sent and no deployment was performed.
- `pnpm exec tsc --noEmit`: still fails on the pre-existing configuration/dependency/translator errors described above. Production bundling succeeding does not replace a clean typecheck.
