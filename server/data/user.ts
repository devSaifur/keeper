import { db } from '@server/db'
import { userTable } from '@server/db/schema'
import { eq } from 'drizzle-orm'

import { TSignUpSchema } from '../lib/validators'

export async function createUser(user: TSignUpSchema) {
  try {
    await db.insert(userTable).values(user)
  } catch (err) {
    console.error(err)
  }
}

export async function getUserByEmail(email: string) {
  return db.query.userTable.findFirst({
    where: eq(userTable.email, email)
  })
}
