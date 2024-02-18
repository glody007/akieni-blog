import { Article, postJSONPlaceholderSchema } from "@/lib/validation";
import { z } from "zod";

export async function getArticles() {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts', 
      { next: { revalidate: 10 } }
    )
    const postsData = await response.json()
    const posts = z.array(postJSONPlaceholderSchema).parse(postsData)
  
    const articles:  Article[] = posts.map(post => ({
      id: post.id.toString(),
      title: post.title,
      description: "lorem ipsum dolor",
      body: post.body,
      category: "category",
      publishedAt: new Date(),
      authors: [
        { 
          name: "Glody mbutwile", 
          image: "https://avatars.githubusercontent.com/u/25279896?v=4"
        }
      ]
    }))
  
    return articles
}

export async function getFeaturedArticles() {
    const allArticles = await getArticles()
    return allArticles.slice(0, 5)
}

export async function getArticle(id: string) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`, 
      { next: { revalidate: 10 } }
    )
    const postData = await response.json()
    const post = postJSONPlaceholderSchema.parse(postData)
  
    const article:  Article = {
      id: post.id.toString(),
      title: post.title,
      description: "lorem ipsum dolor",
      body: post.body,
      category: "category",
      publishedAt: new Date(),
      authors: [
        { 
          name: "Glody mbutwile", 
          image: "https://avatars.githubusercontent.com/u/25279896?v=4"
        }
      ]
    }
  
    return article
}