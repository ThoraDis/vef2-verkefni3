import { Hono } from "hono";
import * as z from 'zod'
import type { Auth } from "hono/utils/basic-auth";
import { prisma } from '../prisma.js'
import {zValidator} from '@hono/zod-validator'


export const app = new Hono();

const pagingSchema=z.object({
    limit:z.coerce.number().min(1).max(100).optional().default(10),
    offset: z.coerce.number().min(0).max(100).optional().default(0)
})

const authorSchema=z.object({
    limit:z.coerce.number().min(1).max(100).optional().default(10),
    offset: z.coerce.number().min(0).max(100).optional().default(0),
    email: z.coerce.string().min(1).max(100),
    name: z.coerce.string().min(1).max(255)
})

app.get('/',zValidator('query',pagingSchema) ,async(c)=>{
    const limit=c.req.valid('query').limit
    const offset =c.req.valid('query').offset

    const authors = await prisma.author.findMany({skip:offset, take:limit});
    if (!authors) {
        return c.json({ error: 'not found' }, 404)
    }
    const authorsCount = await prisma.author.count()

    const response = {
        data: authors,
        paging: {
            limit,
            offset,
            count: authorsCount
        }
    }

    return c.json(response)

})

app.get('/:id',zValidator('query',pagingSchema) ,async(c)=>{
    const limit=c.req.valid('query').limit
    const offset =c.req.valid('query').offset

    const id = c.req.param('id')
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
    });

    const authorCount = await prisma.author.count()

    if(!author){
        return c.json({error: 'Not found'}, 404)

    }
        const response = {
        data: author,
        paging: {
            limit,
            offset,
            count: authorCount
        }
    }

    return c.json(response)

})

app.post('/',zValidator('query',authorSchema) ,async(c)=>{
    const limit=c.req.valid('query').limit
    const offset =c.req.valid('query').offset
    const email=c.req.valid('query').email
    const name =c.req.valid('query').name

    const newAuthor = await prisma.author.create({
        data:{
            email:email,
            name:name
        }
    })

    const response = {
        data: newAuthor,
        paging: {
            limit,
            offset,
            count: 1
        }
    }

    return c.json(response)
})

app.put('/:id',zValidator('query',authorSchema) ,async(c)=>{
    const limit=c.req.valid('query').limit
    const offset =c.req.valid('query').offset
    const id = c.req.param('id')
    const email=c.req.valid('query').email
    const name =c.req.valid('query').name

    const updatedAuthor=await prisma.author.update({
        where: {id:Number(id),},
        data:{email:email, name:name},});


    const response = {
        data: updatedAuthor,
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
    const id = c.req.param('id')

    const deletedAuthor=await prisma.author.delete({
    where: {
        id:Number(id),},});

    const response = {
        data: deletedAuthor,
        paging: {
            limit,
            offset,
            count: 1
        }
    }

    return c.json(response)

})


