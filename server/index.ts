import { Hono } from 'hono'
import { csrf } from 'hono/csrf'
import { logger } from 'hono/logger'

import { authMiddleware } from './middleware'
import { authRoutes } from './routes/authRoutes'
import { hello } from './routes/hello'

const api = new Hono()
  .basePath('/api')
  .route('/hello', hello)
  .route('/auth', authRoutes)

api.use(logger())

api.use(csrf())

api.use(authMiddleware)

api.onError((err, c) => {
  console.log(`Error: ${err.message}`)
  return c.json({ error: 'Something went wrong' }, 500)
})

export default api

export type ApiType = typeof api
