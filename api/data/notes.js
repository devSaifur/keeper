import { and, eq, inArray } from 'drizzle-orm';
import { db } from '../db';
import { notes } from '../db/schema';
export async function getNotesByUserId(userId) {
    return await db
        .select({
        id: notes.id,
        content: notes.content,
        cratedAt: notes.createdAt
    })
        .from(notes)
        .where(eq(notes.userId, userId));
}
export async function deleteNotesById(noteId) {
    await db.delete(notes).where(inArray(notes.id, noteId));
}
export async function addNote(userId, newNote) {
    const [insertedNote] = await db
        .insert(notes)
        .values({
        content: newNote.content,
        userId
    })
        .returning();
    return insertedNote;
}
export async function updateNote(note, userId) {
    await db
        .update(notes)
        .set({
        content: note.content
    })
        .where(and(eq(notes.id, note.serverId), eq(notes.userId, userId)));
}
