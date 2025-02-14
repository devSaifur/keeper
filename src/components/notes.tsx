import db from '@/local/db'
import { useLiveQuery } from 'dexie-react-hooks'

import { Note } from '@/components/note'

export default function Notes() {
  const notes = useLiveQuery(() =>
    db.notes.orderBy('lastModified').reverse().toArray()
  )

  if (!notes || notes.length === 0) {
    return null
  }

  return (
    <div className="grid auto-rows-max grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 md:px-10 lg:grid-cols-4">
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  )
}
