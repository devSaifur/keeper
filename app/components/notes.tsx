'use client'

import { use } from 'react'
import type { Note } from '@/db/schema'

type NotesProps = {
  notesPromise: Promise<Note[]>
}

export const Notes = ({ notesPromise }: NotesProps) => {
  const notes = use(notesPromise)

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          {note.title}
          <br />
          {note.content}
        </div>
      ))}
    </div>
  )
}
