import type { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import { decode } from 'hono/jwt'

import { getSession } from './lib/jwt'
import type { ENV } from './types'

export async function authMiddleware(c: Context, next: Next) {
  try {
    const token = getCookie(c, 'session') ?? null

    if (!token) {
      c.set('user', null)
      return next()
    }

    const { payload } = decode(token)

    if (!payload) {
      c.set('user', null)
      return next()
    }

    const user = {
      name: payload.name as string,
      email: payload.email as string
    }

    c.set('user', user)
    return next()
  } catch (err) {
    console.log(err)
    c.set('user', null)
    return next()
  }
}

export const getUser = createMiddleware<ENV>(async (c, next) => {
  const payload = await getSession(c)

  if (!payload) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const user = {
    name: payload.name as string,
    email: payload.email as string
  }

  c.set('user', user)
  return next()
})
