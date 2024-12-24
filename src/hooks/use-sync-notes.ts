import db, { Note } from '@/local/db'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export const useSyncNotes = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (notes: Note[]) => {
      const notesToSync = notes.filter((note) => note.syncStatus === 'pending')

      if (notesToSync.length === 0) {
        return
      }

      // prepare notes to sync by only including necessary fields
      const pendingNotes = notesToSync.map((note) => ({
        id: note.id,
        title: note.title,
        content: note.content
      }))

      try {
        const res = await api.notes.$post({
          json: pendingNotes
        })

        const { results } = await res.json()

        if (results.length > 0) {
          // update local notes sync status and server id
          await Promise.all(
            results.map(async (noteInfo, idx) => {
              if (noteInfo.success) {
                const localNote = notesToSync[idx]

                await db.notes.where('title').equals(localNote.title).modify({
                  syncStatus: 'synced',
                  serverId: noteInfo.noteId,
                  lastModified: Date.now()
                })
              } else {
                const localNote = notesToSync[idx]

                await db.notes.where('title').equals(localNote.title).modify({
                  syncStatus: 'error',
                  lastModified: Date.now()
                })
              }
            })
          )

          // refresh local notes
          const notes = await db.notes.toArray()
          queryClient.setQueryData(['local-notes'], notes)
        }
      } catch {
        throw new Error('Error syncing notes')
      }
    }
  })
}
