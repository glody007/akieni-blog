import { user, articles } from './data.mjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: user
    })
    for (let article of articles) {
        const body = {
            "time":1708430429202,
            "blocks":[{
                "id":"9H3PxLZJNY",
                "type":"paragraph",
                "data":{ "text": `${article.body}` }
            }],
            "version":"2.29.0"
        }
        await prisma.article.create({
            data: {
               title: article.title,
               image: article.image,
               description: article.description,
               body: JSON.stringify(body),
               category: article.category,
               authors: {
                connect: [{ id: user.id }]
               }
            }
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})