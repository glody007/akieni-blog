import { env } from '@/env'
import { getArticle } from '@/lib/utilsServer'
import { OpenAIStream, StreamingTextResponse, Message } from 'ai'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
})


export async function POST(req: Request) {
  const json = await req.json()
  const { messages, articleId } = json

  const article = await getArticle(articleId)

  if (!article) {
    return new Response("Article not found", { status: 40 })
  }

  const context =  `
    title: ${article.title}, 
    description: ${article.description} 
    body: ${article.body}
    lastmessages: ${JSON.stringify(messages)}
  `
  const prompt = [
    {
      role: 'system',
      content: `AI assistant that respond to questions related to the article in the context
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
        If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
        AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
        AI assistant will not invent anything that is not drawn directly from the context.
      `,
    },
  ]


  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [...prompt, ...messages.filter((message: Message) => message.role === 'user')],
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      console.log("complete")
    }
  })

  return new StreamingTextResponse(stream)
}