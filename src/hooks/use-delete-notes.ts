import db, { type DeletedNote } from '@/local/db'
import { deleteFromDB } from '@/local/sync'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteNotes = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (noteId: string) => {
      try {
        // Get the note before deletions to store its info
        const note = await db.notes.get(noteId)
        await deleteFromDB(noteId)
        if (!note) throw new Error('Note not found')

        // store deletions info in a separate table for syncing
        const deletedNote: DeletedNote = {
          id: note.id,
          deletedAt: Date.now(),
          syncStatus: 'pending'
        }

        // delete from notes table
        await db.notes.delete(noteId)
        // store the deletions table
        await db.deletedNotes.add(deletedNote)

        // refresh local notes
        const notes = await db.notes.toArray()
        queryClient.setQueryData(['local-notes'], notes)
        return { success: true }
      } catch (err) {
        console.error(`Error deleting note: ${err}`)
        throw err
      }
    },
    onError: (err) => {
      console.error(`Error deleting note: ${err}`)
    }
  })
}
