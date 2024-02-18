import { z } from "zod";

export const postJSONPlaceholderSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string()
})

export const userJSONPlaceholderSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export const authorSchema = z.object({
    name: z.string(),
    image: z.string()
})

export const articleSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishedAt: z.coerce.date(),
    authors: z.array(authorSchema)
})

export type Author = z.infer<typeof authorSchema>
export type Article = z.infer<typeof articleSchema>