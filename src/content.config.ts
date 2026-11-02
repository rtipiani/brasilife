import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const machines = defineCollection({
  loader: file('src/data/machines.json'),
  schema: z.object({
    id: z.string(),
    code: z.string(),
    slug: z.string(),
    name: z.string(),
    titleLine1: z.string(),
    titleLine2: z.string(),
    series: z.string(),
    category: z.enum([
      'tren-superior',
      'tren-inferior',
      'multifuncionales',
      'cardio',
      'accesorios',
    ]),
    muscleGroups: z.array(z.string()),
    usageLevel: z.string(),
    shortDescription: z.string(),
    fullDescription: z.string(),
    highlights: z.array(z.string()),
    specs: z.object({
      dimensions: z.string(),
      machineWeight: z.string(),
      weightStackOrLoad: z.string(),
      frameProfile: z.string(),
      transmission: z.string(),
      upholstery: z.string(),
    }),
    featured: z.boolean().default(false),
    isNew: z.boolean().default(false),
    imageType: z.string(),
    imageUrl: z.string().optional(),
  }),
});

export const collections = { machines };
