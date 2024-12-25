import db from './db'
import type { Note } from './db'

export async function saveToDB(note: Note) {
  await db.notes.add(note)
}

export async function deleteFromDB(id: string) {
  await db.notes.delete(id)
}

export async function editToDB(id: string, title: string, content: string) {
  await db.notes.where('id').equals(id).modify({
    title,
    content
  })
}
