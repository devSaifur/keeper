import db from '@/local/db'
import { useLiveQuery } from 'dexie-react-hooks'

import { Note } from '@/components/note'

export default function Notes() {
  const notes = useLiveQuery(() => db.notes.toArray())

  if (!notes) {
    return null
  }

  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified)

  return (
    <div className="grid auto-rows-max grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {sortedNotes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  )
}
