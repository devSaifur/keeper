import { createLazyFileRoute } from '@tanstack/react-router'

import AddNoteEditor from '@/components/add-note-editor'
import Notes from '@/components/notes'

export const Route = createLazyFileRoute('/_authenticated/')({
  component: HomeComponent
})

function HomeComponent() {
  return (
    <div className="p-2">
      <AddNoteEditor />
      <Notes />
    </div>
  )
}
