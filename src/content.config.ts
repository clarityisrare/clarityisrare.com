import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			subtitle: z.string().optional(),
			description: z.string(),
			// Transform string to Date object (used for RSS ordering, not display).
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// Human-entered publish date shown verbatim on the blog list, e.g. '31.07.2026'.
			publishedOn: z.string().optional(),
			// Which series (category) the post belongs to, and its position within it.
			series: z.enum(['series-01', 'series-02', 'series-03', 'toolkits']),
			order: z.number(),
			tags: z.array(z.string()).default([]),
			// Reading time in minutes (from the design hand-off).
			minutes: z.number().optional(),
			heroImage: z.optional(image()),
			// Optional pre-recorded narration for the read-aloud feature.
			audio: z.string().optional(),
			// Set false to hide the read-aloud control on a post (e.g. short
			// announcement pieces that are not part of the narrated series).
			readAloud: z.boolean().default(true),
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
