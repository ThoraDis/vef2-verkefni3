import { Hono } from "hono";
import * as z from 'zod'
import { prisma } from '../prisma.js'
import {zValidator} from '@hono/zod-validator'


export const app = new Hono();

const pagingSchema=z.object({
    limit:z.coerce.number().min(1).max(100).optional().default(10),
    offset: z.coerce.number().min(0).max(100).optional().default(0)
})

//TODO gera optional
const newsSchemaCreate = z.object({
    limit:z.coerce.number().min(1).max(100).optional().default(10),
    offset: z.coerce.number().min(0).max(100).optional().default(0),
    slug:z.coerce.string(),
    author:z.coerce.string(),
    content:z.coerce.string(),
    excerpt:z.coerce.string(),
    published:z.coerce.boolean(),
    title:z.coerce.string()

})

const newsSchemaUpdate = z.object({
    limit:z.coerce.number().min(1).max(100).optional().default(10),
    offset: z.coerce.number().min(0).max(100).optional().default(0),
    updatedSlug:z.coerce.string(),
    author:z.coerce.string(),
    content:z.coerce.string(),
    excerpt:z.coerce.string(),
    published:z.coerce.boolean(),
    title:z.coerce.string()

})

app.get('/',zValidator('query',pagingSchema) ,async(c)=>{
    const limit=c.req.valid('query').limit
    const offset =c.req.valid('query').offset

    const news = await prisma.news.findMany({skip:offset, take:limit});
    if (!news) {
        return c.json({ error: 'not found' }, 404)
    }
    const newsCount = await prisma.author.count()

    const response = {
        data: news,
        paging: {
            limit,
            offset,
            count: newsCount
        }
    }

    return c.json(response)
})

app.get('/:slug',zValidator('query',pagingSchema) ,async(c)=>{
    const limit=c.req.valid('query').limit
    const offset =c.req.valid('query').offset


    const slug = c.req.param('slug')
    const news = await prisma.news.findUnique({
      where: { slug:slug },
    });

    const newsCount = await prisma.news.count()

    if(!news){
        return c.json({error: 'Not found'}, 404)

    }
        const response = {
        data: news,
        paging: {
            limit,
            offset,
            count: newsCount
        }
    }

    return c.json(response)
})

app.post('/',zValidator('query',newsSchemaCreate) ,async(c)=>{
    const limit=c.req.valid('query').limit
    const slug=c.req.valid('query').slug
    const offset =c.req.valid('query').offset
    const title =c.req.valid('query').title
    const excerpt=c.req.valid('query').excerpt
    const content=c.req.valid('query').content
    const published=c.req.valid('query').published
    const authorName=c.req.valid('query').author

    const author = await prisma.author.findFirst({
      where: { name: authorName },
    });
    

    const newNews = await prisma.news.create({
        data:{
            slug:slug,
            title:title,
            excerpt:excerpt,
            content:content,
            published:published,
            authorId:Number(author?.id)

        }
    })

    const response = {
        data: newNews,
        paging: {
            limit,
            offset,
            count: 1
        }
    }

    return c.json(response)
})

app.put('/:slug',zValidator('query',newsSchemaUpdate) ,async(c)=>{
    const limit=c.req.valid('query').limit
    const slug = c.req.param('slug')
    const updatedSlug = c.req.valid('query').updatedSlug
    const offset =c.req.valid('query').offset
    const title =c.req.valid('query').title
    const excerpt=c.req.valid('query').excerpt
    const content=c.req.valid('query').content
    const published=c.req.valid('query').published
    const authorName=c.req.valid('query').author

    const author = await prisma.author.findFirst({
      where: { name: authorName },
    });

    const newNews = await prisma.news.update({
        where: {slug:slug,},
        data:{
            slug:updatedSlug,
            title:title,
            excerpt:excerpt,
            content:content,
            published:published,
            authorId:Number(author?.id)

        }
    })

    const response = {
        data: newNews,
        paging: {
            limit,
            offset,
            count: 1
        }
    }

    return c.json(response)
})

app.delete('/:id',zValidator('query',pagingSchema) ,async(c)=>{
    const limit=c.req.valid('query').limit
    const offset =c.req.valid('query').offset
    const slug = c.req.param('slug')

    const news = await prisma.news.delete({
      where: { slug:slug },
    });

    const response = {
        data: news,
        paging: {
            limit,
            offset,
            count: 1
        }
    }

    return c.json(response)
})