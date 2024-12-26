import { useEffect } from 'react'
import db from '@/local/db'
import { useNoteStore } from '@/local/store'

import { Note } from '@/components/note'

export default function Notes() {
  const { notes, syncNotes } = useNoteStore()

  useEffect(() => {
    syncNotes(db)
  }, [syncNotes])

  return (
    <div className="grid auto-rows-max grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  )
}
