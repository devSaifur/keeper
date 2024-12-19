import { db } from '@/db'

import { noteTable, userTable } from './schema'

async function main() {
  performance.mark('start')

  for (let i = 0; i < 10; i++) {
    const [newUser] = await db
      .insert(userTable)
      .values({
        name: `User ${i}`,
        email: `user${i}@example.com`
      })
      .returning()

    for (let j = 0; j < 10; j++) {
      await db.insert(noteTable).values({
        userId: newUser.id,
        title: `Note ${j}`,
        content: `Content ${j}\n  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit sit placeat, a delectus dicta doloremque tempore nulla eaque, cumque repellat hic porro beatae dignissimos? Quaerat autem magni dolore iure cum.`
      })
    }
  }

  performance.mark('end')
  performance.measure('Seed', 'start', 'end')
  console.log(
    `Took ${performance.getEntriesByName('Seed')[0].duration / 1000}s`
  )
  performance.clearMarks()
}

main().catch(console.error)
