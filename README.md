# clarityisrare.com

**Clarity Is Rare** — a requirements-engineering blog (persona: *Thinkerbell*) about making
requirements clear enough for people *and* machines. Built with
[Astro](https://astro.build), styled with [Tailwind CSS](https://tailwindcss.com), and
deployed to [Cloudflare Pages](https://pages.cloudflare.com).

## Stack at a glance

| Concern         | Choice                                             |
| :-------------- | :------------------------------------------------- |
| Framework       | Astro                                              |
| Rendering       | Fully static (SSG) — no server adapter             |
| Styling         | Tailwind CSS v4 (via `@tailwindcss/vite`)          |
| Fonts           | Manrope + IBM Plex Mono (Astro Google font provider) |
| Content         | MDX content collection, grouped into series        |
| Language        | TypeScript                                         |
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

> The project ships with an `astro dev --background` workflow — manage it with
> `astro dev stop` / `status` / `logs`. Restart the background server after changing content
> files or the collection schema, as its content layer can go stale.

## Project structure

```text
├── public/                  # static assets served as-is (favicon)
├── src/
│   ├── assets/images/       # logos, hero, series & about images (Astro-optimized)
│   ├── components/          # Header, Footer, ScrollControls, ReadAloud, BaseHead
│   │   └── mdx/             # rich post blocks: Callout, Step, ArrowNote, CTA, PullQuote, Lead, Num
│   ├── content/blog/        # blog posts (MDX)
│   ├── data/series.ts       # the three post series (category grouping)
│   ├── layouts/BlogPost.astro
│   ├── lib/posts.ts         # post loading, grouping & reading-order helpers
│   ├── pages/               # routes (file-based): index, about, blog, blog/[...slug]
│   ├── styles/global.css    # Tailwind import, design tokens (@theme), .post-prose
│   ├── consts.ts            # site metadata, author, social links
│   └── content.config.ts    # blog collection schema
├── astro.config.mjs         # Astro + integrations + fonts config
├── tsconfig.json
└── .nvmrc                   # pinned Node version for local + Cloudflare
```

Astro exposes each file in `src/pages/` as a route based on its name. Blog posts live in
`src/content/blog/` as a typed content collection — see
[Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/).

## Content

Each post is an `.mdx` file with frontmatter validated by
[`src/content.config.ts`](src/content.config.ts):

```yaml
---
title: 'Post title'
subtitle: 'Optional subtitle'          # optional
description: 'Used for SEO / OG / RSS'
pubDate: 2026-01-15
series: 'series-01'                    # one of the ids in src/data/series.ts
order: 1                               # position within the series
tags: ['AI', 'Documentation']
minutes: 12                            # reading time shown on cards & posts
heroImage: '../../assets/images/hero-01-1.png'   # optional
audio: '/audio/post.mp3'               # optional pre-recorded narration
draft: false                           # hidden in production builds
---
```

Posts are grouped into **series** (defined in [`src/data/series.ts`](src/data/series.ts)),
which drives the home "Recent posts" grid and the series sections on the Blog page. Post
bodies can use the components in `src/components/mdx/` for callouts, numbered steps,
arrow notes, pull-quotes, and inter-post CTAs — import them at the top of the `.mdx` file:

```mdx
import Callout from '../../components/mdx/Callout.astro';

<Callout>Ambiguity is not something AI can fix later.</Callout>
```

Every post also has a **Read aloud** control that plays a pre-recorded `audio` file when one
is set, otherwise falls back to the browser's speech synthesis.

## Styling

Tailwind v4 is enabled through the Vite plugin in [`astro.config.mjs`](astro.config.mjs) and
imported at the top of [`src/styles/global.css`](src/styles/global.css). The design system —
the teal accent, warm neutral palette, and fonts — is defined there as `@theme` design tokens
(e.g. `--color-accent`, `--color-ink`, `--color-line`), exposed as Tailwind utilities
(`text-accent-ink`, `bg-accent-soft`, …). Post body typography lives under `.post-prose`.

## Deployment

Deployed as static files to Cloudflare Pages. Full instructions and the required dashboard
build settings are in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Credit

Bootstrapped from Astro's blog starter, then rebuilt to a bespoke design.
