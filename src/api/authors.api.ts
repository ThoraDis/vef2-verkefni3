import { Hono } from "hono";
import { prisma } from '../prisma.js'
import {zValidator} from '@hono/zod-validator'
import { Prisma } from "../generated/prisma/client.js";
import {authorSchema,pagingSchema} from "../schema.zod.js"
import xss from 'xss';


export const app = new Hono();
app.get('/',zValidator('query',pagingSchema) ,async(c)=>{
    try{
        const limit=c.req.valid('query').limit
        const offset =c.req.valid('query').offset

        const authors = await prisma.author.findMany({skip:offset, take:limit});

        const authorsCount = await prisma.author.count()

        const response = {
            data: authors,
            paging: {
                limit,
                offset,
                count: authorsCount
            }
        }

        return c.json(response,200)
    }catch(error){
        console.error(error)
        return c.json({ error: 'Internal error' }, 500);
    }

})

app.get('/:id',zValidator('query',pagingSchema) ,async(c)=>{

    try{
        const id = c.req.param('id')

        const author = await prisma.author.findUnique({
            where: { id: Number(id) },
        });

        if (!author) {
            return c.json({ error: 'no such author' }, 404);
        }


        const response = {
            data: author
        }

        return c.json(response,200)

    }catch(error){
        console.error(error)
        return c.json({ error: 'Internal error' }, 500);
    }

})

app.post('/',zValidator('query',authorSchema,(result, c) => {
    if (!result.success) {
      return c.json("Bad request",400)}}), async(c)=>{

    try{
        const emailQuery=c.req.valid('query').email
        const nameQuery =c.req.valid('query').name
        const email=xss(emailQuery)
        const name=xss(nameQuery)


        const newAuthor = await prisma.author.create({
            data:{
                email:email,
                name:name,
            }
        })

        const response = {
            data: newAuthor,

        }

        return c.json(response,201)

    }catch(error){
        console.error(error)
        return c.json({ error: 'Internal error' }, 500);
    }
})


app.put('/:id',zValidator('query',authorSchema,(result, c) => {
    if (!result.success) {
      return c.json("Bad request",400)
    }
  }), async(c)=>{

    try{
        const id = c.req.param('id')
        const emailQuery=c.req.valid('query').email
        const nameQuery =c.req.valid('query').name
        const email=xss(emailQuery)
        const name=xss(nameQuery)

        try{
            const updatedAuthor=await prisma.author.update({
                where: {id:Number(id),},
                data:{email:email, name:name},});


            const response = {
                data: updatedAuthor
            }

            return c.json(response,200)
        }catch(e){
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === "P2025") {
                    return c.json({ error: 'No author found' }, 404);
                }
            } throw e;
        }
    }catch(error){
        console.error(error)
        return c.json({ error: 'Internal error' }, 500);
    }
})

app.delete('/:id',zValidator('query',pagingSchema) ,async(c)=>{
    try{
        const id = c.req.param('id')

        try{
            await prisma.author.delete({
            where: {
                id:Number(id),},});

            return c.json(204)
            
        }catch(e){
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === "P2025") {
                    return c.json({ error: 'No author found' }, 404);
                }
            } throw e;
        }
        

    
    }catch(error){
        console.error(error)
        return c.json({ error: 'Internal error' }, 500);
    }

})




