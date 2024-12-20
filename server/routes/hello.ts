import { Hono } from "hono";

export const hello = new Hono().get('/', (c) => c.json('Hello Bun!'))