import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
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
  .get('/hello', (c) => c.json({ message: 'Hello' }))

app.use(logger())

app.use(csrf())

app.use(authMiddleware)

app.use('*', serveStatic({ root: './dist' }))

app.onError((err, c) => {
  console.dir(`Error: ${err.message}`, { colors: true })
  return c.json({ error: 'Something went wrong' }, 500)
})

export default app

export type ApiType = typeof apiRoutes
