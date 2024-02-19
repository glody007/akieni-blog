import { requestConfig } from "@/config/request";
import { Article, Author, Comment, commentJSONPlaceholderSchema, Like, postJSONPlaceholderSchema, userJSONPlaceholderSchema } from "@/lib/validation";
import { z } from "zod";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getUsers() {
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/users', 
        { next: { revalidate: 10 } }
    )
    const usersData = await response.json()
    const users = z.array(userJSONPlaceholderSchema).parse(usersData)

    const userMap = new Map<string, Author>()

    for(const user of users) {
        userMap.set(
            user.id.toString(),
             { 
                name: user.name, 
                image: "https://avatars.githubusercontent.com/u/25279896?v=4"
            }
        )
    }

    return userMap
}

export async function getAuthors() {
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/users', 
        { next: { revalidate: 10 } }
    )
    const usersData = await response.json()
    const users = z.array(userJSONPlaceholderSchema).parse(usersData)

    return users.slice(undefined, 5).map(user => ({ 
        name: user.name, 
        image: "https://avatars.githubusercontent.com/u/25279896?v=4"
    }))
}

export async function getArticles() {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts', 
      { next: { revalidate: 10 } }
    )
    const postsData = await response.json()
    const posts = z.array(postJSONPlaceholderSchema).parse(postsData)
    const userMap = await getUsers()
  
    const articles:  Article[] = posts.map(post => ({
      id: post.id.toString(),
      title: post.title,
      description: "lorem ipsum dolor",
      body: post.body,
      category: "category",
      publishedAt: new Date(),
      authors: [
        { 
          name: userMap.get(post.userId.toString())?.name || "", 
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
    const responsePost = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`, 
      { next: { revalidate: 10 } }
    )
    const postData = await responsePost.json()
    const post = postJSONPlaceholderSchema.parse(postData)

    const responseUser = await fetch(
        `https://jsonplaceholder.typicode.com/users/${post.userId}`, 
        { next: { revalidate: 10 } }
    )
    const userData = await responseUser.json()
    const user = userJSONPlaceholderSchema.parse(userData)
  
    const article:  Article = {
      id: post.id.toString(),
      title: post.title,
      description: "lorem ipsum dolor",
      body: post.body,
      category: "category",
      publishedAt: new Date(),
      authors: [
        { 
          name: user.name, 
          image: "https://avatars.githubusercontent.com/u/25279896?v=4"
        }
      ]
    }
  
    return article
}

export async function getArticleInteractions(articleId: string) {
    const responseComments = await fetch(
        'https://jsonplaceholder.typicode.com/comments', 
        { next: { revalidate: 10 } }
    )
    const commentsData = await responseComments.json()
    const commentsPlaceholder = z.array(commentJSONPlaceholderSchema).parse(commentsData)
    const likesPlaceHolder = z.array(commentJSONPlaceholderSchema).parse(commentsData)
    
    const comments: Comment[] = commentsPlaceholder.filter(
        comment => comment.postId.toString() === articleId
    ).map(comment => ({
        name: comment.name,
        articleId: comment.postId.toString(),
        body: comment.body,
        createdAt: new Date()
    }))

    const likes: Like[] = likesPlaceHolder.filter(
        comment => comment.postId.toString() === articleId
    ).map(comment => ({
        name: comment.name,
        articleId: comment.postId.toString(),
        createdAt: new Date()
    }))

    return {
        comments,
        likes
    }
}

export async function getArticlesPages(query: string) {
    const allArticles = await getArticles()
    const filteredArticles =  allArticles.filter(
        article => article.title.toLowerCase().includes(query.toLocaleLowerCase())
    )
    return Math.ceil(filteredArticles.length / requestConfig.pageSize)
}

export async function getFilteredArticles(query: string, currentPage: number) {
    const allArticles = await getArticles()
    const filteredArticles =  allArticles.filter(
        article => article.title.toLowerCase().includes(query.toLocaleLowerCase())
    )
    const startIndex = (currentPage - 1) * requestConfig.pageSize
    const endIndex = startIndex + requestConfig.pageSize
    return filteredArticles.slice(startIndex, endIndex)
}

export async function getMetrics() {
    const responseComments = await fetch(
        'https://jsonplaceholder.typicode.com/comments', 
        { next: { revalidate: 10 } }
    )
    const commentsData = await responseComments.json()
    const comments = z.array(commentJSONPlaceholderSchema).parse(commentsData)
    const articles = await getArticles()
    const authors = await getAuthors()

    return {
        articles: articles.length,
        authors: authors.length,
        comments: comments.length,
        likes: comments.length * 2.5
    }
}
