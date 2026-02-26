import { z } from 'zod'

export const pagingSchema=z.object({
    limit:z.coerce.number().min(1).max(100).optional().default(10),
    offset: z.coerce.number().min(0).max(100).optional().default(0)
})

export const authorSchema = z.object({
    email: z.email().max(255, {
      message: 'Email is required and should be between 3 and 255 characters',
    }),
    name: z.coerce.string().min(1).max(255)
})

export const newsSchema = z.object({
    author:z.coerce.string(),
    content:z.coerce.string(),
    excerpt:z.coerce.string(),
    published:z.coerce.boolean(),
    title:z.coerce.string()

})


