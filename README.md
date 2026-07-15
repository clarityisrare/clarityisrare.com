# clarityisrare.com

Personal static website built with [Astro](https://astro.build), styled with [Tailwind CSS](https://tailwindcss.com), and deployed to [Cloudflare Pages](https://pages.cloudflare.com).

## Stack at a glance

| Concern         | Choice                                             |
| :-------------- | :------------------------------------------------- |
| Framework       | Astro (official `blog` starter)                    |
| Rendering       | Fully static (SSG) — no server adapter             |
| Styling         | Tailwind CSS v4 (via `@tailwindcss/vite`)          |
| Language        | TypeScript (`base` / relaxed preset)               |
| Package manager | npm                                                |
| Node            | `>=22.12.0` (pinned in [`.nvmrc`](.nvmrc))         |
| Hosting         | Cloudflare Pages via GitHub Git integration        |

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for how it's deployed and the setup decisions behind this project.

## Prerequisites

- **Node** `>=22.12.0` (the version in [`.nvmrc`](.nvmrc)). If you use a version manager: `nvm use` / `fnm use`.
- **npm** (ships with Node).

## Getting started

```sh
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:4321
```

## Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Install dependencies                             |
| `npm run dev`             | Start local dev server at `localhost:4321`       |
| `npm run build`           | Build the production site to `./dist/`           |
| `npm run preview`         | Preview the production build locally             |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Project structure

```text
├── public/              # static assets served as-is
├── src/
│   ├── assets/          # images & fonts processed by Astro
│   ├── components/      # reusable .astro components
│   ├── content/blog/    # blog posts (Markdown / MDX)
│   ├── layouts/         # page layouts
│   ├── pages/           # routes (file-based)
│   ├── styles/global.css# global styles + Tailwind import
│   ├── consts.ts        # site title / description
│   └── content.config.ts# content collection schemas
├── astro.config.mjs     # Astro + integrations config
├── tsconfig.json
└── .nvmrc               # pinned Node version for local + Cloudflare
```

Astro exposes each `.astro` / `.md` file in `src/pages/` as a route based on its file name. Blog posts live in `src/content/blog/` as a typed content collection — see [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/).

## Styling with Tailwind

Tailwind v4 is enabled through the Vite plugin in [`astro.config.mjs`](astro.config.mjs) and imported at the top of [`src/styles/global.css`](src/styles/global.css) with `@import 'tailwindcss';`. Utility classes are available in any `.astro` component. The base styles below the import are inherited from the Bear Blog theme the starter ships with.

## Deployment

Deployed as static files to Cloudflare Pages. Full instructions and the required dashboard build settings are in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Credit

The blog theme is based on the [Bear Blog](https://github.com/HermanMartinus/bearblog/) starter that ships with Astro.
