import { Hono } from 'hono'
import { csrf } from 'hono/csrf'
import { logger } from 'hono/logger'

import { authMiddleware } from './middleware'
import { authRoutes } from './routes/auth-routes'
import { hello } from './routes/hello'
import { notesRoutes } from './routes/notes-routes'

const api = new Hono()
  .basePath('/api')
  .route('/auth/**', authRoutes)
  .route('/hello', hello)
  .route('/notes', notesRoutes)

api.use(logger())

api.use(csrf())

api.use(authMiddleware)

api.onError((err, c) => {
  console.dir(`Error: ${err.message}`, { colors: true })
  return c.json({ error: 'Something went wrong' }, 500)
})

export default api

export type ApiType = typeof api
