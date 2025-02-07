import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import z from 'zod';
import { addNote, deleteNotesById, getNotesByUserId, updateNote } from '../data/notes';
import { getUser } from '../middleware';
export const notesRoutes = new Hono()
    .get('/', getUser, async (c) => {
    const userId = c.get('user')?.id;
    const notes = await getNotesByUserId(userId);
    return c.json(notes, 200);
})
    .post('/', zValidator('json', z.array(z.object({
    id: z.string().uuid(),
    content: z.string()
}))), getUser, async (c) => {
    const userId = c.get('user')?.id;
    const notesToSync = c.req.valid('json');
    const results = await Promise.all(notesToSync.map(async (note) => {
        try {
            const addedNote = await addNote(userId, { content: note.content });
            return { noteId: note.id, success: true, serverId: addedNote.id };
        }
        catch (err) {
            console.error(`Error adding note: ${err}`);
            return { noteId: note.id, success: false, serverId: null };
        }
    }));
    return c.json(results, 201);
})
    .put('/', zValidator('json', z.array(z.object({
    id: z.string().uuid(),
    content: z.string(),
    serverId: z.string().nanoid()
}))), getUser, async (c) => {
    const userId = c.get('user')?.id;
    const notesToSync = c.req.valid('json');
    const results = await Promise.all(notesToSync.map(async (note) => {
        try {
            for (const note of notesToSync) {
                await updateNote({ content: note.content, serverId: note.serverId }, userId);
            }
            return { noteId: note.id, serverId: note.serverId, success: true };
        }
        catch (err) {
            console.error(`Error adding note: ${err}`);
            return { noteId: note.id, serverId: note.serverId, success: false };
        }
    }));
    return c.json(results, 200);
})
    .delete('/', zValidator('json', z.array(z.string().nanoid())), getUser, async (c) => {
    const noteIds = c.req.valid('json');
    await deleteNotesById(noteIds);
    return c.json({ message: 'Success' }, 200);
});
