import { eq } from 'drizzle-orm'

import { db } from '../db'
import { noteTable } from '../db/schema'
import type { AddNoteSchema } from '../lib/validators'

export async function getNotesByUserId(userId: string) {
  return db
    .select({
      id: noteTable.id,
      title: noteTable.title,
      content: noteTable.content
    })
    .from(noteTable)
    .where(eq(noteTable.userId, userId))
}

export async function deleteNoteById(noteId: string) {
  await db.delete(noteTable).where(eq(noteTable.id, noteId))
}

export async function addNotes(userId: string, notes: AddNoteSchema) {
  const notesToAdd = notes.map((note) => ({
    title: note.title,
    content: note.content,
    userId
  }))

  await db.insert(noteTable).values(notesToAdd)
}
