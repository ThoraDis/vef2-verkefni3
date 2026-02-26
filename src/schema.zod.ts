import { z } from 'zod'

export const pagingSchema=z.object({
    limit:z.coerce.number().min(1).max(100).optional().default(10),
    offset: z.coerce.number().min(0).max(100).optional().default(0)
})

export const authorSchema = z.object({
    email: z.email().max(255),
    name: z.coerce.string().min(1).max(255)
})

export const newsSchema = z.object({
    author:z.coerce.string().min(1).max(255),
    content:z.coerce.string().min(1),
    excerpt:z.coerce.string().min(1).max(255),
    published:z.coerce.boolean().default(false),
    title:z.coerce.string().min(1).max(255)

})


