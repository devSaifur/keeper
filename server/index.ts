import { Hono } from 'hono'
import {logger} from 'hono/logger'

const app = new Hono()

app.use(logger())

app.get('/', (c) => c.text('Hello Bun!'))

export default app