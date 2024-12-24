// import { lazy, Suspense } from 'react'
import { useEffect } from 'react'
import db from '@/local/db'
import { useNoteStore } from '@/local/store'
import { createFileRoute } from '@tanstack/react-router'

import Editor from '@/components/editor'
import { Note } from '@/components/note'

// const Editor = lazy(() => import('@/components/editor'))

export const Route = createFileRoute('/_authenticated/')({
  component: HomeComponent
})

function HomeComponent() {
  const { notes, syncNotes } = useNoteStore()
  console.log({ notes })

  useEffect(() => {
    syncNotes(db)
  }, [syncNotes])

  return (
    <div className="p-2">
      {/* <Suspense fallback="loading editor..."> */}

      <Editor />

      {/* </Suspense> */}

      <div className="grid auto-rows-max grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}
