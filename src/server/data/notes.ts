import { db } from '@/server/db'
import { notes } from '@/server/db/schema'
import { and, eq, inArray } from 'drizzle-orm'

export async function getNotesByUserId(userId: string) {
  return await db
    .select({
      id: notes.id,
      content: notes.content,
      cratedAt: notes.createdAt
    })
    .from(notes)
    .where(eq(notes.userId, userId))
}

export async function deleteNotesById(noteId: string[]) {
  await db.delete(notes).where(inArray(notes.id, noteId))
}

export async function addNote(userId: string, newNote: { content: string }) {
  const [insertedNote] = await db
    .insert(notes)
    .values({
      content: newNote.content,
      userId
    })
    .returning()

  return insertedNote
}

export async function updateNote(
  note: { content: string; serverId: string },
  userId: string
) {
  await db
    .update(notes)
    .set({
      content: note.content
    })
    .where(and(eq(notes.id, note.serverId), eq(notes.userId, userId)))
}
