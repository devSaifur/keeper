import type { Context } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { sign, verify } from 'hono/jwt'

const secret = process.env.JWT_SECRET!

export async function getSession(c: Context) {
  const session = getCookie(c, 'session') ?? null
  if (!session) return null
  return verify(session, secret)
}

export async function login(
  ctx: Context,
  user: { id: string; name: string; email: string }
) {
  try {
    const exp = Infinity // fix this later
    const token = await sign({ ...user, exp }, secret)
    setCookie(ctx, 'session', token, { httpOnly: true })
  } catch (err) {
    console.error(err)
    throw new Error('Something went wrong when setting session.')
  }
}

export function logout(ctx: Context) {
  setCookie(ctx, 'session', '')
}
