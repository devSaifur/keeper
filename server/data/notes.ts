import { eq } from 'drizzle-orm'

import { db } from '../db'
import { noteTable } from '../db/schema'

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

export async function addNote(
  userId: string,
  note: { title: string; content: string }
) {
  await db.insert(noteTable).values({
    title: note.title,
    content: note.content,
    userId
  })
}
