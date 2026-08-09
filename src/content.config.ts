import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const post = defineCollection({
	loader: glob({ base: './src/content/post', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).default([]),
			categories: z.array(z.string()).default([]),
			heroImageUrl: z.string().optional(),
			wordpressId: z.number().int().optional(),
			oldUrl: z.string().optional(),
			draft: z.boolean().default(false),
		}),
});

const page = defineCollection({
	loader: glob({ base: './src/content/page', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImageUrl: z.string().optional(),
		wordpressId: z.number().int().optional(),
		oldUrl: z.string().optional(),
		allowComments: z.boolean().default(false),
		draft: z.boolean().default(false),
	}),
});

const moments = defineCollection({
	loader: glob({ base: './src/content/moments', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
			pubDate: z.coerce.date(),
			tags: z.array(z.string()).default([]),
			wordpressId: z.number().int().optional(),
			oldUrl: z.string().optional(),
			draft: z.boolean().default(false),
		}),
});

export const collections = { post, page, moments };
