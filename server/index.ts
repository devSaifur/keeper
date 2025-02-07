import { Hono } from 'hono'
import { csrf } from 'hono/csrf'
import { logger } from 'hono/logger'
import { handle } from 'hono/vercel'

import { authMiddleware } from './middleware'
import { authRoutes } from './routes/auth-routes'
import { notesRoutes } from './routes/notes-routes'

export const runtime = 'edge'

const app = new Hono()

const apiRoutes = app
  .basePath('/api')
  .route('/auth/**', authRoutes)
  .route('/notes', notesRoutes)

app.use(logger())

app.use(csrf())

app.use(authMiddleware)

app.onError((err, c) => {
  console.dir(`Error: ${err.message}`, { colors: true })
  return c.json({ error: 'Something went wrong' }, 500)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

export const GET = handle(app)
export const POST = handle(app)

export type ApiType = typeof apiRoutes
