# Deployment & setup notes

This document records how `clarityisrare.com` is built, how it deploys to
Cloudflare Pages, and the decisions made when the project was bootstrapped, so
the setup is reproducible later.

## Overview

The site is a **fully static (SSG)** Astro build. Running `npm run build`
prerenders every page to plain HTML/CSS/JS in the `dist/` directory. There is no
server runtime and no Astro adapter — `dist/` is uploaded to Cloudflare Pages and
served from the edge.

## Prerequisites

- **Node** `>=22.12.0`. The exact version is pinned in [`.nvmrc`](../.nvmrc)
  (`22.12.0`) so local machines and the Cloudflare build image agree.
- **npm** (bundled with Node).

## Local build & preview

```sh
npm install      # install dependencies
npm run build    # → dist/ (the deployable static site)
npm run preview  # serve dist/ locally to sanity-check before deploying
```

## Deploying to Cloudflare Pages (Git integration)

Deployment uses Cloudflare's native **Git integration**: Cloudflare watches the
GitHub repository and rebuilds automatically on every push. There is **no CI
workflow file** in this repo — the build runs on Cloudflare.

### One-time setup in the Cloudflare dashboard

1. Push this repository to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository and authorize access.
4. Configure the build with these settings:

   | Setting                  | Value           |
   | :----------------------- | :-------------- |
   | Framework preset         | `Astro`         |
   | Build command            | `npm run build` |
   | Build output directory   | `dist`          |
   | Root directory           | `/` (default)   |

5. Add an environment variable (belt-and-suspenders alongside `.nvmrc`):

   | Variable       | Value      |
   | :------------- | :--------- |
   | `NODE_VERSION` | `22.12.0`  |

6. Save and deploy. Cloudflare builds a preview for every branch/PR and deploys
   the production branch (`main`) to the live URL.

### Custom domain

After the first successful deploy, attach the domain in the Pages project under
**Custom domains → Set up a custom domain** and add `clarityisrare.com`. If the
domain's DNS is managed in the same Cloudflare account, records are configured
automatically; otherwise follow the CNAME instructions Cloudflare shows.

### Branch model

- Pushing to `main` → production deploy.
- Pushing any other branch / opening a PR → an isolated preview deploy with its
  own URL.

## Setup decisions (bootstrap record)

The project was scaffolded from the official Astro `blog` starter with these
choices:

- **Package manager:** npm.
- **Rendering:** fully static (SSG); no Cloudflare/SSR adapter.
- **Styling:** Tailwind CSS v4, added with `npx astro add tailwind`. This
  installs `@tailwindcss/vite` and registers it as a Vite plugin in
  [`astro.config.mjs`](../astro.config.mjs). Tailwind is activated by
  `@import 'tailwindcss';` at the top of
  [`src/styles/global.css`](../src/styles/global.css), which is imported globally
  via `src/components/BaseHead.astro`.
- **TypeScript:** `astro/tsconfigs/base` (relaxed) in
  [`tsconfig.json`](../tsconfig.json).
- **Site metadata:** `site` is set to `https://clarityisrare.com` in
  `astro.config.mjs` (used for canonical URLs, sitemap, and RSS). Title and
  description live in [`src/consts.ts`](../src/consts.ts).
- **Node:** installed locally via Homebrew; the project requires `>=22.12.0`
  (`package.json` `engines`) and pins `22.12.0` in `.nvmrc`.

## Re-scaffolding from scratch

If you ever need to recreate the base project:

```sh
npm create astro@latest -- --template blog --typescript base
npx astro add tailwind
```

Then set `site` in `astro.config.mjs`, update `src/consts.ts`, and add
`@import 'tailwindcss';` to the top of `src/styles/global.css`.
