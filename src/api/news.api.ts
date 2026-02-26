import { Hono } from "hono";
import { slugify } from "../slugify.js";
import { prisma } from '../prisma.js'
import {zValidator} from '@hono/zod-validator'
import { Prisma } from "../generated/prisma/client.js";
import {newsSchema,pagingSchema} from "../schema.zod.js"

export const app = new Hono();


app.get('/',zValidator('query',pagingSchema) ,async(c)=>{
    try{
        const limit=c.req.valid('query').limit
        const offset =c.req.valid('query').offset

        const news = await prisma.news.findMany({skip:offset, take:limit});

        const newsCount = await prisma.news.count()

        const response = {
            data: news,
            paging: {
                limit,
                offset,
                count: newsCount
            }}

    return c.json(response)
    }
    catch(error){
        console.error(error)
        return c.json({ error: 'Internal error' }, 500);
    }

})

app.get('/:slug',zValidator('query',pagingSchema) ,async(c)=>{
    try{
        const slug = c.req.param('slug')
    
        const news = await prisma.news.findUnique({
            where: { slug:slug },});
    
        if (!news) {
            return c.json({ error: 'no such news' }, 404);
        }    
        const response = {data: news}

        return c.json(response)
    
        }
        catch(error){
            console.error(error)
            return c.json({ error: 'Internal error' }, 500);
}})

app.post('/',zValidator('query',newsSchema,(result, c) => {
    if (!result.success) {
        return c.json("Bad request",400)}}), async(c)=>{    
    try{
        const title =c.req.valid('query').title
        const excerpt=c.req.valid('query').excerpt
        const content=c.req.valid('query').content
        const published=c.req.valid('query').published
        const authorName=c.req.valid('query').author

        const author = await prisma.author.findFirst({
            where: { name: authorName },});

        const newNews = await prisma.news.create({
            data:{
                slug:slugify(title),
                title:title,
                excerpt:excerpt,
                content:content,
                published:published,
                authorId:Number(author?.id)

            }
        })

        const response = {data: newNews}

        return c.json(response,201)

    }catch(error){
        console.error(error)
        return c.json({ error: 'Internal error' }, 500);
    }
})

app.put('/:slug',zValidator('query',newsSchema,(result, c) => { if (!result.success) {
      return c.json("Bad request",400)} }), async(c)=>{
    try{
        const slug = c.req.param('slug')
        const title =c.req.valid('query').title
        const excerpt=c.req.valid('query').excerpt
        const content=c.req.valid('query').content
        const published=c.req.valid('query').published
        const authorName=c.req.valid('query').author
        try{
            const author = await prisma.author.findFirst({
                where: { name: authorName },});

            const newNews = await prisma.news.update({
                where: {slug:slug,},
                data:{
                    title:title,
                    excerpt:excerpt,
                    content:content,
                    published:published,
                    authorId:Number(author?.id)
                    }})

            const response = {data: newNews}

            return c.json(response)
        }
        catch(e){
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === "P2002") {
                    return c.json({ error: 'No author found' }, 404);
                }
            } throw e;
        }
    }
    catch(error){
        console.error(error)
        return c.json({ error: 'Internal error' }, 500);
    }
})

app.delete('/:slug',zValidator('query',pagingSchema) ,async(c)=>{

    try{
        const slug = c.req.param('slug')
    
        try{
            await prisma.news.delete({
            where: { slug:slug },
            });    
            return c.json(204)
                
            }
        catch(e){
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    if (e.code === "P2002") {
                        return c.json({ error: 'No author found' }, 404);
                    }
                } throw e;
        }
            
        }
        catch(error){
            console.error(error)
            return c.json({ error: 'Internal error' }, 500);
        }
})