import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import z from 'zod'

import { addNote, deleteNoteById, getNotesByUserId } from '../data/notes'
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
            await addNote(userId, note)
            return { noteId: note.id, success: true }
          } catch (err) {
            console.error(`Error adding note: ${err}`)
            return { noteId: note.id, success: false }
          }
        })
      )
      return c.json({ message: 'Success', results }, 201)
    }
  )
  .delete(
    '/:id',
    zValidator('param', z.string().uuid()),
    getUser,
    async (c) => {
      const noteId = c.req.valid('param')

      await deleteNoteById(noteId)

      return c.json({ message: 'Success' }, 200)
    }
  )
