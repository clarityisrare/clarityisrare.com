// @ts-check

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Draft posts get a real URL (serving an "Upcoming soon" placeholder), but must
// stay out of the sitemap. Collect their slugs from frontmatter at config time.
const blogDir = fileURLToPath(new URL('./src/content/blog', import.meta.url));
const draftSlugs = new Set(
  readdirSync(blogDir)
    .filter((f) => /\.mdx?$/.test(f))
    .filter((f) => /^draft:\s*true\b/m.test(readFileSync(`${blogDir}/${f}`, 'utf8')))
    .map((f) => f.replace(/\.mdx?$/, '')),
);

// Mirror the `COMING_SOON_MODE` flag from consts.ts (read here so the sitemap
// can be limited to the two public pages while the takeover is active).
const constsSrc = readFileSync(
  fileURLToPath(new URL('./src/consts.ts', import.meta.url)),
  'utf8',
);
const comingSoonMode = /COMING_SOON_MODE\s*=\s*true\b/.test(constsSrc);

// Open every absolute http(s) link (i.e. external links) in a new tab.
// Internal links (relative paths, e.g. "Continue reading" CTAs) are untouched.
function rehypeExternalLinks() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'a') {
        const href = node.properties?.href;
        if (typeof href === 'string' && /^https?:\/\//i.test(href)) {
          node.properties.target = '_blank';
          node.properties.rel = ['noopener', 'noreferrer'];
        }
      }
      if (node.children) node.children.forEach(visit);
    };
    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://clarityisrare.com',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        // Coming-soon takeover: only the landing and About are public.
        if (comingSoonMode) return pathname === '/' || pathname === '/about/';
        const slug = page.replace(/.*\/blog\/([^/]+)\/?$/, '$1');
        return !draftSlugs.has(slug);
      },
    }),
  ],

  markdown: {
    rehypePlugins: [rehypeExternalLinks],
  },

  fonts: [
      {
          provider: fontProviders.google(),
          name: 'Manrope',
          cssVariable: '--font-manrope',
          weights: [400, 500, 600, 700, 800],
          fallbacks: ['sans-serif'],
      },
      {
          provider: fontProviders.google(),
          name: 'IBM Plex Mono',
          cssVariable: '--font-ibm-mono',
          weights: [400, 500],
          fallbacks: ['monospace'],
      },
	],

  vite: {
    plugins: [tailwindcss()],
  },
});