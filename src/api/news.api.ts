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