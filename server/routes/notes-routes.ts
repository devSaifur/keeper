import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import z from 'zod'

import { addNote, deleteNotesById, getNotesByUserId } from '../data/notes'
import { getUser } from '../middleware'

export const notesRoutes = new Hono()
  .get('/', getUser, async (c) => {
    const { id: userId } = c.get('user')

    const notes = await getNotesByUserId(userId)

    return c.json(notes, 200)
  })
  .post(
    '/',
    zValidator(
      'json',
      z.array(
        z.object({
          id: z.string().uuid(),
          title: z.string(),
          content: z.string()
        })
      )
    ),
    getUser,
    async (c) => {
      const { id: userId } = c.get('user')
      const notesToSync = c.req.valid('json')

      const results = await Promise.all(
        notesToSync.map(async (note) => {
          try {
            const addedNote = await addNote(userId, note)
            return { noteId: note.id, success: true, serverId: addedNote.id }
          } catch (err) {
            console.error(`Error adding note: ${err}`)
            return { noteId: note.id, success: false, serverId: null }
          }
        })
      )

      return c.json({ message: 'Success', results }, 201)
    }
  )
  .delete(
    '/',
    zValidator('json', z.array(z.string().uuid())),
    getUser,
    async (c) => {
      const noteIds = c.req.valid('json')

      await deleteNotesById(noteIds)

      return c.json({ message: 'Success' }, 200)
    }
  )
