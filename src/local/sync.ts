import db from './db'
import type { Note } from './db'

export async function saveToDB(note: Note) {
  await db.notes.add(note)
}

export async function deleteFromDB(id: string) {
  await db.notes.delete(id)
}
