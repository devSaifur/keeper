import type { Context, Next } from 'hono'
import { createMiddleware } from 'hono/factory'

import { auth } from './lib/auth'
import type { ENV } from './types'

export async function authMiddleware(c: Context, next: Next) {
  try {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })

    if (!session) {
      c.set('user', null)
      c.set('session', null)
      return next()
    }

    c.set('user', session.user)
    c.set('session', session.session)
    return next()
  } catch (err) {
    console.log(err)
    c.set('user', null)
    c.set('session', null)
    return next()
  }
}

export const getUser = createMiddleware<ENV>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    c.set('user', null)
    c.set('session', null)
    return c.json({ error: 'Unauthorized' }, 401)
  }

  c.set('user', session.user)
  c.set('session', session.session)

  return next()
})
