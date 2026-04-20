# AGENTS.md

## Project Overview

- Aerocool Ukraine marketing and catalog site built with Hugo.
- Default language is Ukrainian (`uk`); Russian (`ru`) is the secondary language.
- The active theme is `themes/PaperMod`, included as a Git submodule.
- Deployment is configured through Netlify.

## Stack

- Hugo `0.157.0` is the pinned site generator version in Netlify config.
- Node `24` is the pinned Node version in Netlify config.
- Tailwind CSS `4` is used for styling.
- Custom SEO and schema partials live under `layouts/_partials/_seo` and `layouts/_partials/_schema`.

## Repository Layout

- `content/`: all site content.
- `content/_index.md` and `content/_index.ru.md`: localized homepages.
- `content/about`, `content/contact`, `content/faq`: localized static pages.
- `content/articles`, `content/news`: article and news page bundles with `index.md` and `index.ru.md`.
- `content/products`: product catalog. Series use `_index.md` / `_index.ru.md`; product variants live in nested folders as page bundles.
- `layouts/`: Hugo template overrides. Prefer editing here instead of touching the theme.
- `assets/css/main.css`: Tailwind entrypoint and custom CSS. Treat this as the source of truth.
- `static/`: static assets copied as-is.
- `hugo.yaml`: main site configuration, languages, permalinks, menus, and build settings.
- `netlify.toml`: production build command and headers.

## Local Guides

Use the project guides before inventing new front matter or SEO patterns:

- `GUIDE to all front matters.md`
- `GUIDE to seo-image.md`
- `GUIDE to schema_type.md`
- `GUIDE to view transitions.md`
- `GUIDE to mise.md`

## Content Conventions

- Keep Ukrainian and Russian content in sync unless the task explicitly asks for a single-language change.
- Existing localization pattern is `index.md` for Ukrainian and `index.ru.md` for Russian inside the same page bundle.
- Keep images and bundle-specific assets next to the content files that use them.
- Use explicit `slug` values for articles, news items, and product variants when URL control matters.
- Product variants are intentionally split by model/color. Keep one variant per folder and one slug per variant.
- Use `schema_types` in front matter. Templates read `.Params.schema_types`; do not switch to `schema_type`.
- Preserve `date` and `lastmod` fields when editing content. Update `lastmod` when making substantive changes.

## Images And SEO

- Use the `seo-image` shortcode for content images instead of raw `<img>` tags when possible.
- Hero/LCP images should normally use eager loading; non-critical images should normally use lazy loading.
- The local SEO image guide recommends `jsonld=true` on the primary-language page and `jsonld=false` on the translated page.
- Keep alt text descriptive and language-appropriate.
- Schema partials already exist for `website`, `organization`, `brand`, `collection`, `article`, `news`, `product`, `faq`, and `breadcrumbs`.

## Styling And Templates

- Prefer extending or overriding Hugo templates in `layouts/` instead of editing `themes/PaperMod`.
- If a theme change is required, confirm it cannot be done via an override first.
- When editing CSS, update `assets/css/main.css`.
- Tailwind class discovery depends on Hugo build stats and the configured content/layout scan paths. Avoid moving templates or content into new locations without updating Tailwind/Hugo config.

## Build And Run

- Install dependencies with `npm install`.
- Start local development with `./script_start.sh` or `hugo server`.
- Tailwind is compiled by Hugo through `css.TailwindCSS`; there is no separate Tailwind watch process to run.
- `npm run dev` is a convenience alias for `hugo server`.
- Netlify production build is `git submodule update --init --recursive && hugo --gc --minify`.
- `script_clean.sh` is destructive: it removes `public`, `resources`, `node_modules`, `.cache`, and `package-lock.json`, then reinstalls dependencies.

## Editing Rules

- Do not edit generated output in `public/` or transient Hugo caches in `resources/`.
- Avoid committing incidental `.DS_Store` changes.
- Prefer small overrides in `layouts/` and focused content edits over broad theme changes.
- When adding new content sections, keep the bilingual folder/file structure consistent with the existing site.
- When changing menus, languages, permalinks, or SEO defaults, update `hugo.yaml` carefully because these changes affect the whole site.

## Validation

- For content-only changes, run a Hugo build or local server check.
- For template or CSS changes, verify at least the homepage, one listing page, and one detail page in both languages.
- Check that localized links resolve correctly under `/` and `/ru/`.
- Check that page bundle images resolve from the correct folder.
- Check that schema-related front matter uses `schema_types` and matches the existing partials.
