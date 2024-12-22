import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

import { createUser, getUserByEmail } from '../data/user'
import { login } from '../lib/jwt'
import { signInSchema, signUpSchema } from '../lib/validators'
import { getUser } from '../middleware'

export const authRoutes = new Hono()
  .post('/sign-up', zValidator('json', signUpSchema), async (c) => {
    const { email, name, password } = c.req.valid('json')

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return c.json({ error: 'Invalid credentials' }, 400)
    }

    const hashedPassword = await Bun.password.hash(password)

    await createUser({ email, name, password: hashedPassword })

    return c.json({ message: 'Success' }, 201)
  })
  .post('/sign-in', zValidator('json', signInSchema), async (c) => {
    const { email, password } = c.req.valid('json')

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
      return c.json({ error: 'Invalid credentials' }, 400)
    }

    const passwordMatch = await Bun.password.verify(
      password,
      existingUser.password
    )

    if (!passwordMatch) {
      return c.json({ error: 'Password do not match!' }, 402)
    }

    await login(c, { name: existingUser.name, email: existingUser.email })

    return c.json({ message: 'Success' }, 200)
  })
  .get('/me', getUser, (c) => {
    const user = c.var.user
    return c.json(user, 200)
  })
