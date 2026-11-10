import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    // Lower numbers are listed first.
    order: z.number().default(100),
    // Featured projects get a large card with media; the rest get a small tile.
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    // Paths under /public, e.g. /media/demo.mp4
    video: z.string().optional(),
    poster: z.string().optional(),
    image: z.string().optional(),
    // Set for tall media (phone recordings) so it is not letterboxed.
    portrait: z.boolean().default(false),
    mediaAlt: z.string().default(''),
  }),
});

export const collections = { projects };
