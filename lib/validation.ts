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

export const commentJSONPlaceholderSchema = z.object({
    postId: z.number(),
    id: z.number(),
    body: z.string(),
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
    body: z.string(),
    category: z.string(),
    publishedAt: z.coerce.date(),
    authors: z.array(authorSchema)
})

export const commentSchema = z.object({
    articleId: z.string(),
    name: z.string(),
    image: z.string(),
    body: z.string(),
    createdAt: z.coerce.date()
})

export const likeSchema = z.object({
    articleId: z.string(),
    name: z.string(),
    image: z.string(),
    createdAt: z.coerce.date()
})

export type Author = z.infer<typeof authorSchema>
export type Article = z.infer<typeof articleSchema>
export type Comment = z.infer<typeof commentSchema>
export type Like = z.infer<typeof likeSchema>