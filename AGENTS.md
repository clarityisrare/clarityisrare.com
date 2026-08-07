## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.
Restart the background server after changing content files or the collection schema — its
content layer can go stale even though `astro build` is always correct.

## Project conventions

Settings and decisions to preserve across changes.

### Design & brand

- The site implements the design hand-off in `Design_hand_off/` (`Blog Site.dc.html` is the
  source of truth; the `explorations` file was rejected directions).
- Accent colour is teal `#2f8f83`, **fixed** — there is no font/accent switcher. Fonts are
  Manrope (body) + IBM Plex Mono (labels/mono). The palette and fonts are Tailwind `@theme`
  design tokens in `src/styles/global.css`; use the tokens (e.g. `text-accent-ink`,
  `bg-accent-soft`) rather than hard-coded colours.
- Author persona is "Thinkerbell"; site metadata, author name, tagline and social links live
  in `src/consts.ts`.

### Layout & responsive

- Every page uses a **16px side gutter on mobile** (`max-[760px]:px-4`), including the home
  hero — keep new pages consistent.
- The blog post reading column is capped at **760px** (`max-w-[760px]`), not full width.
- Below **640px** (Tailwind `sm`) the header (`Header.astro`) collapses to a hamburger menu
  containing **Home / About / Search**; the **Blog** link stays visible in the bar.

### Content

- Posts are one `blog` MDX collection grouped into three **series** defined in
  `src/data/series.ts`; loading/grouping helpers are in `src/lib/posts.ts`; the frontmatter
  schema is in `src/content.config.ts`.
- Rich post blocks use the components in `src/components/mdx/` (Callout, Step, ArrowNote, CTA,
  PullQuote, Lead, Num); standard prose is styled by `.post-prose` in `global.css`.
- Posts p5–p10 currently have placeholder bodies, pending real content from
  `Design_hand_off/uploads/*.docx`.
- The publish date shown on the blog list is a **manual** `publishedOn` frontmatter string
  (e.g. `'31.07.2026'`), displayed verbatim — set it from the date the author provides, do
  not auto-generate or derive it from `pubDate`. `pubDate` stays machine-only (RSS ordering).

### Publishing workflow

- Posts release **one per week**. Unreleased posts carry `draft: true`; the production build
  hides drafts everywhere (list, home, RSS, sitemap, and their own pages — `[...slug].astro`
  builds only published posts). Dev (`astro dev`) still shows drafts for preview.
- To publish the next post: set its `draft: false` (or remove the field), and restore the
  "Continue reading" CTA / teaser to the *previous* post so it links forward again.
- `archive/` (outside `src/`, not built) holds full copies of trimmed posts — e.g. the
  original Blog 1_1 with its CTA — so the removed tail can be restored when the next post
  goes live. Never load content from `archive/`.

### Behaviour

- **External links** (absolute `http(s)`) always open in a new tab — enforced by the
  `rehypeExternalLinks` plugin in `astro.config.mjs`. Internal links stay in the same tab; do
  not add `target="_blank"` to internal links or the "Continue reading" CTAs.
- The **Blog search is full-text**: it indexes title + tags + subtitle + body (via
  `postBodyText` in `src/lib/posts.ts`) and shows a highlighted snippet plus a live result
  count.
- Each post has a **read-aloud** control (`ReadAloud.astro`) using browser speech synthesis,
  or a pre-recorded `audio` file when the frontmatter sets one. Recordings live in
  `public/audio/<slug>.mp3` (served as-is, not through the Astro asset pipeline) and are
  referenced by root-absolute path, e.g. `audio: '/audio/failure-modes.mp3'`. With a recording
  the button plays/pauses and shows a seek bar; without one it falls back to speech synthesis.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
