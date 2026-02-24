import { Hono } from "hono";
import type { Auth } from "hono/utils/basic-auth";
import { prisma } from '../prisma.js'

export const app = new Hono();

type Author = {
    id:string,
    name:string
}
const tempAuthors: Array<Author> = [
    {id: '1' , name: 'temp author 1'},
    {id: '2' ,name: 'temp author 2'},
    {id: '3' ,name: 'temp author 3'},
    {id: '4' ,name: 'temp author 4'},
]

app.get('/', async(c)=>{

    const authors = await prisma.author.findMany();
    return c.json(authors)

})

app.get('/:id',(c)=>{
    const id = c.req.param('id')

    const author = tempAuthors.find(i=>i.id===id)

    if(!author){
        return c.json({error: 'Not found'}, 404)

    }
    return c.json(author)

})


app.delete('/:id',(c)=>{

    const id = c.req.param('id')

    const author = tempAuthors.find(i=>i.id===id)

    if(!author){
        return c.json({error: 'Not found'}, 404)

    }
    return c.json(null,200)

})


app.post('/',(c)=>{


})
