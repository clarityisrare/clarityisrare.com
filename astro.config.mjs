// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

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
  site: 'https://www.clarityisrare.com',
  integrations: [
    mdx(),
    // Drafts aren't built in production, so everything that exists belongs in
    // the sitemap — no filtering needed.
    sitemap(),
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