import { eq, inArray } from 'drizzle-orm'

import { db } from '../db'
import { notes } from '../db/schema'

export async function getNotesByUserId(userId: string) {
  return db
    .select({
      id: notes.id,
      title: notes.title,
      content: notes.content
    })
    .from(notes)
    .where(eq(notes.userId, userId))
}

export async function deleteNotesById(noteId: string[]) {
  await db.delete(notes).where(inArray(notes.id, noteId))
}

export async function addNote(
  userId: string,
  newNote: { title: string; content: string }
) {
  const [insertedNote] = await db
    .insert(notes)
    .values({
      title: newNote.title,
      content: newNote.content,
      userId
    })
    .returning()

  return insertedNote
}
