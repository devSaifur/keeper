import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { csrf } from 'hono/csrf'
import { logger } from 'hono/logger'

import { authMiddleware } from './middleware'
import { authRoutes } from './routes/auth-routes'
import { notesRoutes } from './routes/notes-routes'

const app = new Hono()

const apiRoutes = app
  .basePath('/api')
  .route('/auth/**', authRoutes)
  .route('/notes', notesRoutes)

app.use(logger())

app.use(csrf())

app.use(authMiddleware)

app.use('*', serveStatic({ root: './dist' }))

app.onError((err, c) => {
  console.dir(`Error: ${err.message}`, { colors: true })
  return c.json({ error: 'Something went wrong' }, 500)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

export type ApiType = typeof apiRoutes
