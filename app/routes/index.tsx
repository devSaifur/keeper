import * as fs from 'node:fs/promises'
import { setTimeout as delay } from 'node:timers/promises'
import { db } from '@/db'
import { noteTable } from '@/db/schema'
import { Await, createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { eq } from 'drizzle-orm'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(await fs.readFile(filePath, 'utf-8').catch(() => '0'))
}

const getNotes = createServerFn({
  method: 'GET'
}).handler(async () => {
  await delay(1000)
  return db.select().from(noteTable).where(eq(noteTable.userId, 5))
})

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.writeFile(filePath, `${count + data}`)
  })

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => {
    const notesPromise = getNotes()
    return { notesPromise }
  }
})

function Home() {
  const router = useRouter()
  const { notesPromise } = Route.useLoaderData()

  return (
    <>
      <button
        type="button"
        onClick={() => {
          updateCount({ data: 1 }).then(() => {
            router.invalidate()
          })
        }}
      >
        Add 1 to count
      </button>
      <Await promise={notesPromise} fallback={<div>Loading...</div>}>
        {(notes) => notes.map((note) => <div key={note.id}>{note.title}</div>)}
      </Await>
    </>
  )
}
