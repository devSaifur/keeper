import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import z from 'zod'

import { addNotes, deleteNoteById, getNotesByUserId } from '../data/notes'
import { addNotesSchema } from '../lib/validators'
import { getUser } from '../middleware'

export const notesRoutes = new Hono()
  .get('/', getUser, async (c) => {
    const { id: userId } = c.get('user')

    const notes = await getNotesByUserId(userId)

    return c.json(notes, 200)
  })
  .post('/', zValidator('json', addNotesSchema), getUser, async (c) => {
    const { id: userId } = c.get('user')
    const notes = c.req.valid('json')

    await addNotes(userId, notes)
    return c.json({ message: 'Success' }, 201)
  })
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
