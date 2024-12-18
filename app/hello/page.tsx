import { db } from '@/db'
import { userTable } from '@/db/schema'

export default async function Hello() {
  const users = await db.select().from(userTable)

  return (
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  )
}
