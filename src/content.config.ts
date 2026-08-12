import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['he', 'en']),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    coverImage: z.object({ src: z.string(), alt: z.string() }).optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional(),
    translationOf: z.string().optional(),
    stickyCta: z.object({
      href: z.string().url(),
      label: z.string(),
      eyebrow: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { blog };
