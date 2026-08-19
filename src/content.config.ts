import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const tutors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tutors' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    grade: z.string(),
    average: z.string(),
    accent: z.enum(['sage', 'amber', 'ink']).default('sage'),
    subjects: z.array(z.enum(['math', 'science', 'french', 'coding', 'chess'])),
    specialties: z.array(z.string()),
    blurb: z.string(),
    photo: z.string().nullish(),
  }),
})

const subjects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/subjects' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    tagline: z.string(),
    levels: z.string(),
    topics: z.array(z.string()),
    bring: z.string(),
    photo: z.string().nullish(),
  }),
})

export const collections = { tutors, subjects }