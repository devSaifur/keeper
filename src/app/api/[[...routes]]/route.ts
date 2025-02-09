import { authMiddleware } from '@/server/middleware'
import { authRoutes } from '@/server/routes/auth-routes'
import { notesRoutes } from '@/server/routes/notes-routes'
import { Hono } from 'hono'
import { csrf } from 'hono/csrf'
import { logger } from 'hono/logger'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono()
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

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type ApiType = typeof app
