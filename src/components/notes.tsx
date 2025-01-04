import { useEffect } from 'react'
import { useNoteStore } from '@/local/store'

import { useSyncNotes } from '@/hooks/use-sync-notes'
import { Note } from '@/components/note'

export default function Notes() {
  const { notes, syncNotes } = useNoteStore()
  const { mutate, isPending } = useSyncNotes()

  useEffect(() => {
    console.log('First render...')
    syncNotes()
  }, [syncNotes])

  useEffect(() => {
    const syncInterval = setInterval(() => {
      mutate(notes)
    }, 10000)

    return () => clearInterval(syncInterval)
  }, [mutate, notes])

  console.log(isPending ? 'Syncing notes...' : 'Notes synced!')

  const sortedNotes = notes.sort(
    (a, b) =>
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  )

  console.log(sortedNotes)

  return (
    <div className="grid auto-rows-max grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {sortedNotes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  )
}
