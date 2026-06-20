import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    publishDate: z.date(),
    cover: z.string().optional(),
    liveUrl: z.string().optional(),
    cta: z.string().optional(),
    outcome: z.string().optional(),
  }),
});

export const collections = {
  projects,
};
