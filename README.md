# Marino Gomez — Portfolio

A bilingual SolidJS portfolio with project case studies, a contact page, and generated CVs. The visual system uses Tailwind CSS 4 and daisyUI 5 with a custom green theme.

## Development

Use the pinned pnpm version, 10.26.2:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

If your installed pnpm uses a different dependency store, run `npx --yes pnpm@10.26.2 install --frozen-lockfile`. Avoid deleting the lockfile or changing the global store configuration.

The local development server uses port 3000.

```sh
pnpm typecheck
pnpm check:content
pnpm build
pnpm serve
```

The content check verifies project and UI translation references in English and Spanish, project slugs, image imports, and gallery captions.

## Content and images

- Project records: `src/data/projects.ts`.
- Bilingual text: `src/localizations/i18n/en.ts` and `es.ts`.
- Screenshot captions: `src/data/galleryCaptions.ts`.
- Homepage selections: the `featured` list in `src/pages/Home.tsx`.
- Theme: `src/index.css`.

Keep original screenshots in `src/assets/images` and the portrait in `src/assets/profile.png`. To regenerate optimized web images, use Python with Pillow installed:

```sh
python3 scripts/optimize-images.py
```

The script retains originals and creates WebP derivatives in `src/assets/optimized`. Four cover thumbnails are generated for project cards. Projects without real screenshots use text cards; add actual project evidence rather than placeholder imagery.

## Motion and accessibility

The geometric background uses SVG and CSS, with no animation engine. It respects reduced-motion changes, pauses while the document is hidden, and provides a persistent pause control. Language selection also persists locally. Storage failures fall back to in-memory preferences.

The mobile drawer supports Escape, traps keyboard focus while open, and makes background controls inert. Screenshot previews use a native modal dialog with keyboard navigation. Form inputs use native validation and retain entered data after a failed submission.

## Deployment and remaining editorial work

`pnpm build` outputs `dist`. Existing Vercel rewrites support direct SPA routes, including `/contact`. Unknown routes show a fallback page; the rewrite does not produce an HTTP 404. Page titles and descriptions update at runtime; prerendering and crawler-specific social previews remain future deployment work.

Contact uses the existing Web3Forms endpoint. Do not send test messages without explicitly deciding to test delivery. Keep `.env` files out of version control.

See `PORTFOLIO_REVIEW.md` for the initial audit and the implementation update. Real screenshots for four projects and confirmation of roles, dates, stacks, and quantitative outcomes remain editorial inputs.
