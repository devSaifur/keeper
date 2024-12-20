import { Hono } from 'hono'

export const hello = new Hono().get('/', async (c) => {
  return c.json('Hello Bun!')
})
